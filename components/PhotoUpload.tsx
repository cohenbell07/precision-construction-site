"use client";

/**
 * Quote-form photo upload — drag-and-drop area + click-to-pick, with live
 * preview thumbnails and per-photo remove. Optional field on the /get-quote
 * form; we explicitly tell the user it's optional but increases quote
 * accuracy.
 *
 * Uploads happen as soon as the user picks files (not at form submit) so
 * the final submit doesn't have a slow multipart upload blocking it.
 * Failed uploads surface as inline toasts and the form is still submittable
 * without photos.
 */

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  /** Array of public URLs of already-uploaded photos. */
  urls: string[];
  onChange: (next: string[]) => void;
  /** Max photos allowed. Default 3. */
  max?: number;
}

export function PhotoUpload({ urls, onChange, max = 3 }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const { toast } = useToast();

  const remainingSlots = Math.max(0, max - urls.length);

  const upload = async (files: FileList | File[]) => {
    const arr = Array.from(files);
    if (arr.length === 0) return;
    const slice = arr.slice(0, remainingSlots);
    if (arr.length > remainingSlots) {
      toast({
        title: `Only ${remainingSlots} more photo${remainingSlots === 1 ? "" : "s"} allowed`,
        description: `Limit is ${max} photos total.`,
      });
    }

    setUploading(true);
    try {
      const fd = new FormData();
      for (const f of slice) fd.append("photo", f);
      const res = await fetch("/api/upload/photo", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && Array.isArray(data.urls)) {
        onChange([...urls, ...data.urls]);
        if (data.errors) {
          toast({
            title: "Some photos didn't upload",
            description: data.errors,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Photo upload failed",
          description: data.error || "Please try again or submit without photos.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Photo upload error:", err);
      toast({
        title: "Photo upload failed",
        description: "Please try again or submit without photos.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeAt = (i: number) => onChange(urls.filter((_, j) => j !== i));

  return (
    <div>
      <label htmlFor="photo-upload" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
        Photos <span className="text-ink-muted/70 font-normal normal-case tracking-normal text-[11px]">(optional)</span>
      </label>
      <p className="text-[11px] text-ink-muted mb-3 leading-relaxed">
        A few phone photos of the space help us put a real number together — faster than a site visit and more accurate than a guess.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {urls.map((u, i) => (
          <div
            key={u}
            className="relative aspect-square rounded-md border border-bone-hairline overflow-hidden bg-bone-soft group"
          >
            {/* Use plain <img> here — the URLs are arbitrary Supabase
                Storage URLs; next/image would require domain config in
                next.config.js and these are previews, not perf-critical. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={u}
              alt={`Project photo ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              aria-label={`Remove photo ${i + 1}`}
              className="absolute top-1.5 right-1.5 w-7 h-7 bg-ink/85 text-bone rounded-full flex items-center justify-center hover:bg-ink transition-colors shadow-md"
            >
              <X aria-hidden="true" className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {remainingSlots > 0 && (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              if (e.dataTransfer.files?.length) upload(e.dataTransfer.files);
            }}
            disabled={uploading}
            aria-label={`Add photo (${urls.length} of ${max} used)`}
            className={`aspect-square rounded-md border-2 border-dashed transition-colors flex flex-col items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
              dragging
                ? "border-sandstone-dark bg-bone-soft text-ink"
                : "border-bone-hairline hover:border-sandstone-dark hover:bg-bone-soft text-ink-muted hover:text-ink"
            }`}
          >
            {uploading ? (
              <>
                <Loader2 aria-hidden="true" className="w-5 h-5 animate-spin" />
                <span className="sr-only">Uploading</span>
              </>
            ) : (
              <>
                {urls.length === 0 ? (
                  <Camera aria-hidden="true" className="w-5 h-5" />
                ) : (
                  <Upload aria-hidden="true" className="w-4 h-4" />
                )}
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium leading-none">
                  {urls.length === 0 ? "Add photos" : "Add"}
                </span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        id="photo-upload"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic"
        multiple
        capture="environment"
        className="hidden"
        onChange={(e) => e.target.files && upload(e.target.files)}
      />
    </div>
  );
}
