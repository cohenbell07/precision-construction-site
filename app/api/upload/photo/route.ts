/**
 * Quote-form photo upload endpoint.
 *
 * Posted to from the PhotoUpload component on the /get-quote form. Files
 * land in a public-read Supabase Storage bucket; the public URLs are
 * returned to the client, then appended to the quote submission so John's
 * admin email links straight to the project photos.
 *
 * ── ONE-TIME SETUP REQUIRED ──────────────────────────────────────────────
 * In the Supabase dashboard, create a Storage bucket named `quote-photos`
 * with public read access enabled. No RLS policy needed because uploads
 * here use the service-role key (bypasses RLS). If the bucket doesn't
 * exist, this endpoint fails gracefully and the quote form submits
 * without photos.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per photo
const MAX_FILES = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const BUCKET = "quote-photos";

export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Photo upload isn't configured for this site yet." },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    return NextResponse.json({ error: "Couldn't read upload." }, { status: 400 });
  }

  const files = formData.getAll("photo").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No photos in upload." }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Too many photos — max ${MAX_FILES} per upload.` },
      { status: 400 },
    );
  }

  const urls: string[] = [];
  const errors: string[] = [];

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`${file.name}: too large (max 5 MB).`);
      continue;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      errors.push(`${file.name}: only JPEG / PNG / WEBP / HEIC supported.`);
      continue;
    }

    const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    /* crypto.randomUUID is available in all modern runtimes (Node 19+, edge,
       and the browser); the Next.js Vercel runtime ships it. */
    const objectKey = `${crypto.randomUUID()}.${ext || "jpg"}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(objectKey, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Photo upload error:", uploadError);
      errors.push(`${file.name}: upload failed.`);
      continue;
    }

    const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(objectKey);
    if (publicUrlData?.publicUrl) {
      urls.push(publicUrlData.publicUrl);
    }
  }

  if (urls.length === 0) {
    return NextResponse.json(
      { error: errors.length ? errors.join(" ") : "Upload failed." },
      { status: 400 },
    );
  }

  return NextResponse.json({ urls, errors: errors.length ? errors : undefined });
}
