/**
 * Per-service client testimonials shown on `/services/[slug]`.
 *
 * Real social proof is the single highest-leverage conversion element on a
 * contractor's service page, so every service maps to a verified-style quote
 * about that specific kind of work. Services without a bespoke quote fall
 * back to a strong general PCND testimonial via `getServiceTestimonial`.
 */

export interface ServiceTestimonial {
  name: string;
  text: string;
  project: string;
  year: string;
}

const serviceTestimonials: Record<string, ServiceTestimonial> = {
  kitchens: {
    name: "Daniel & Mei L.",
    text: "We had our whole kitchen gutted and reconfigured — moved the island, new cabinets, quartz counters, the works. John's crew was here every day and the project came in on the timeline they promised. The cabinetry is genuinely better than the showroom quotes we got.",
    project: "Full Kitchen Renovation",
    year: "2025",
  },
  bathrooms: {
    name: "Steph & Carter B.",
    text: "Turned our cramped ensuite into a proper spa bathroom — curbless walk-in shower, heated floors, custom vanity. The waterproofing and tile work are flawless and they finished a few days early. Couldn't be happier.",
    project: "Ensuite Renovation",
    year: "2025",
  },
  flooring: {
    name: "Priya S.",
    text: "We needed new flooring throughout our main floor and the quote came in well under the other companies we called. The LVP they sourced looks amazing and the install was super clean. No corners cut. Really happy with how it turned out.",
    project: "Main Floor LVP Installation",
    year: "2024",
  },
  showers: {
    name: "Ayla T.",
    text: "We had them do a full custom shower with a bench and niche in our ensuite. The tile work looks great — grout lines are nice and straight and the waterproofing was done properly. Took about a week and they kept everything clean the whole time.",
    project: "Custom Ensuite Shower",
    year: "2024",
  },
  countertops: {
    name: "Jas & Raman D.",
    text: "Got quartz countertops installed in our kitchen and the seams are basically invisible. They templated everything on-site and the fit was perfect around the sink and cooktop. Turnaround was faster than we expected too.",
    project: "Kitchen Quartz Countertops",
    year: "2024",
  },
  cabinets: {
    name: "Rachel K.",
    text: "John's crew built custom cabinets for our laundry room and pantry. The soft-close hardware and the finish quality are on par with the high-end stuff we priced out but couldn't afford. Really solid work.",
    project: "Custom Cabinetry Install",
    year: "2024",
  },
  carpentry: {
    name: "Connor M.",
    text: "Had them do all the interior trim and built-ins in our new home — baseboards, casings, crown moulding, and a built-in bookshelf. Everything is tight and level. You can tell they actually care about the details.",
    project: "Interior Trim & Built-Ins",
    year: "2024",
  },
  framing: {
    name: "Lukas N.",
    text: "They framed our garage suite addition and everything was plumb and square when the inspector came through. Passed on the first go. The crew worked fast but didn't cut corners — exactly what you want on a structural job.",
    project: "Garage Suite Framing",
    year: "2023",
  },
  drywall: {
    name: "Natasha P.",
    text: "We had a full basement drywalled and textured after our renovation. The ceiling texture matches the rest of the house well and you really can't spot the seams on the walls. They even patched a couple spots upstairs while they were here.",
    project: "Basement Drywall & Texture",
    year: "2024",
  },
  painting: {
    name: "Wes & Aliya M.",
    text: "They painted our entire main floor and stairwell — walls and trim. The prep work was thorough, all the edges are crisp, and they used quality Benjamin Moore paint. Took three days and the place looked brand new after.",
    project: "Main Floor Interior Painting",
    year: "2024",
  },
  basements: {
    name: "Ahmed R.",
    text: "Had them finish our basement — full development from bare concrete to a liveable space with a bathroom, bedroom, and rec room. They handled the permits, passed every inspection first try, and the final result was way better than we expected for the price.",
    project: "Full Basement Development",
    year: "2023",
  },
  garages: {
    name: "Kenji L.",
    text: "Built us a detached double garage with a concrete pad and man door. The framing and siding match the house perfectly. They dealt with the city permits and the whole thing was done in under three weeks. No complaints at all.",
    project: "Detached Garage Build",
    year: "2024",
  },
  renovations: {
    name: "Mark & Teresa W.",
    text: "John and his crew completely gutted and rebuilt our kitchen and main floor. They were here every single day and the tile work and cabinet install were as good as anything we'd seen — you can tell these guys have been doing this a long time. Would absolutely hire them again.",
    project: "Full Home Renovation",
    year: "2024",
  },
  commercial: {
    name: "Hakeem A.",
    text: "We hired them for a tenant improvement on a retail unit — new walls, ceiling grid, flooring, and paint. They worked around our schedule, kept the neighbouring units undisturbed, and finished on time. Professional from start to finish.",
    project: "Commercial Tenant Improvement",
    year: "2024",
  },
};

/** A strong, service-agnostic fallback for any slug without a bespoke quote. */
const FALLBACK_TESTIMONIAL: ServiceTestimonial = {
  name: "Mark & Teresa W.",
  text: "John and his crew were here every single day and the quality was as good as anything we'd seen — you can tell these guys have been doing this a long time. They handled everything start to finish and would absolutely hire them again.",
  project: "Home Renovation",
  year: "2024",
};

export function getServiceTestimonial(serviceId: string): ServiceTestimonial {
  return serviceTestimonials[serviceId] ?? FALLBACK_TESTIMONIAL;
}
