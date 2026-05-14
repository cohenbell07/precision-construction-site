/**
 * Per-service quote URL (`/get-quote/<service>`) — kept alive as a server-
 * side 307 redirect into the consolidated form. Inbound links from the
 * services index, service detail pages, blog, email, and any historical
 * indexing land on /get-quote?service=<slug> with the service pre-selected
 * and the same enhanced question set that the main form ships.
 *
 * If the slug doesn't match a real service, we fall back to /get-quote so
 * the user lands on the picker instead of a 404.
 *
 * Per-service metadata still lives in layout.tsx — that's what Google's
 * crawler sees when it hits this URL, before following the redirect.
 */

import { redirect } from "next/navigation";
import { getServiceById } from "@/lib/services";

export default function ServiceQuotePage({ params }: { params: { service: string } }) {
  const service = getServiceById(params.service);
  if (!service) {
    redirect("/get-quote");
  }
  redirect(`/get-quote?service=${params.service}`);
}
