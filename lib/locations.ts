/**
 * Service-area locations — powers the programmatic local-SEO layer:
 *   /areas-we-serve            (hub listing every community)
 *   /areas/[slug]              (per-community landing page)
 *
 * Calgary contracting is hyper-local-intent ("basement development Airdrie",
 * "renovation contractor SW Calgary", "construction company near me"). Each
 * page targets those queries with unique, genuinely-local copy — never
 * boilerplate that could apply to any city. No fabricated statistics.
 *
 * `intro` is HTML (<p> paragraphs) rendered into the cream article canvas.
 */

export interface Location {
  slug: string;
  /** Display name, e.g. "Airdrie" or "Northwest Calgary". */
  name: string;
  /** Grouping for the hub page. */
  region: "Calgary" | "Surrounding Area";
  /** Page H1. */
  headline: string;
  /** <160 char meta description. */
  metaDescription: string;
  /** One-line summary shown on the hub card. */
  blurb: string;
  /** 2–3 paragraphs of genuinely-local copy, as HTML. */
  intro: string;
  /** Real neighbourhoods/communities within this area. */
  neighbourhoods: string[];
}

export const locations: Location[] = [
  {
    slug: "calgary",
    name: "Calgary",
    region: "Calgary",
    headline: "Construction & Renovation in Calgary",
    metaDescription:
      "Calgary construction & renovation contractor since 1968. Basements, kitchens, bathrooms, additions & full renos across all four quadrants. Free quotes.",
    blurb: "Our home base — full-service construction and renovation across every Calgary quadrant.",
    intro: `
<p>Calgary has been our home base for three generations. From the century-old character homes of the inner city to the brand-new builds spreading out along the edges of the four quadrants, we've worked on just about every kind of house this city has — and learned what each one needs. A 1950s bungalow in the southwest has very different bones than a 2020 two-storey in the northeast, and a renovation plan that ignores that is a renovation plan that runs into surprises.</p>
<p>Calgary's climate shapes how we build, too. Long, dry winters and a hard freeze-thaw cycle are tough on foundations, basements, and exterior finishes, and our clay-heavy soil moves with the seasons. We plan for moisture control, proper insulation, and materials that hold up to Calgary conditions rather than fighting them. We also pull every permit the City of Calgary requires and coordinate inspections, so your project is done to code and protected at resale.</p>
<p>Whether you're finishing a basement, gutting a kitchen, adding a second storey, or planning a full renovation, we serve every corner of Calgary with free, fixed-scope quotes and a 5% price-beat guarantee. Family-owned since 1968 — we treat your home like our own.</p>
    `,
    neighbourhoods: [
      "Inner-city character homes",
      "Northwest Calgary",
      "Northeast Calgary",
      "Southwest Calgary",
      "Southeast Calgary",
      "Established suburbs & new communities",
    ],
  },
  {
    slug: "nw-calgary",
    name: "Northwest Calgary",
    region: "Calgary",
    headline: "Construction & Renovation in Northwest Calgary",
    metaDescription:
      "NW Calgary renovation & construction contractor — Tuscany, Arbour Lake, Edgemont, Varsity, Bowness & more. Basements, kitchens, baths, additions. Free quotes.",
    blurb: "Tuscany, Arbour Lake, Edgemont, Varsity, Brentwood, Bowness and the rest of the northwest.",
    intro: `
<p>Northwest Calgary is a mix we know well: established communities like Varsity, Brentwood, and Ranchlands sitting alongside newer hillside neighbourhoods like Tuscany, Arbour Lake, and Edgemont, plus the older riverside character of Bowness and Montgomery. The housing stock runs the full range — mid-century bungalows ready for a modern open-concept renovation, '80s and '90s two-storeys due for kitchen and bathroom updates, and newer homes where the basement is still bare and waiting to be developed.</p>
<p>A lot of our northwest work is basement development and main-floor renovations in the more established communities, where homeowners are choosing to invest in the house they love rather than move. Proximity to the University of Calgary also means steady demand for legal secondary suites — and those have specific egress, ceiling-height, and permit requirements we handle start to finish.</p>
<p>We serve every NW community with free quotes and our 5% price-beat guarantee. Family-owned since 1968.</p>
    `,
    neighbourhoods: ["Tuscany", "Arbour Lake", "Edgemont", "Varsity", "Brentwood", "Ranchlands", "Bowness", "Montgomery"],
  },
  {
    slug: "ne-calgary",
    name: "Northeast Calgary",
    region: "Calgary",
    headline: "Construction & Renovation in Northeast Calgary",
    metaDescription:
      "NE Calgary construction & renovation contractor — Saddle Ridge, Martindale, Taradale, Skyview, Redstone, Cornerstone. Basements, suites, renos. Free quotes.",
    blurb: "Saddle Ridge, Martindale, Taradale, Skyview, Redstone, Cornerstone and the growing northeast.",
    intro: `
<p>Northeast Calgary is one of the fastest-growing parts of the city, and it shows in the housing: communities like Saddle Ridge, Martindale, Taradale, Skyview, Redstone, and Cornerstone are full of newer family homes, many bought with the basement left unfinished. That makes basement development our most-requested job in the northeast — turning that empty downstairs into a rec room, extra bedrooms, or a legal secondary suite for rental income or multi-generational living.</p>
<p>Legal suites are a big part of the conversation here, and they come with real rules: separate egress, minimum ceiling heights, fire separation, and City of Calgary permits and inspections. We handle all of it properly, so the suite is safe, insurable, and adds value instead of becoming a problem at resale. We also do kitchen and bathroom renovations, flooring, and full home updates throughout the northeast.</p>
<p>Free quotes and a 5% price-beat guarantee across every NE community. Family-owned since 1968.</p>
    `,
    neighbourhoods: ["Saddle Ridge", "Martindale", "Taradale", "Skyview", "Redstone", "Cornerstone", "Marlborough", "Falconridge"],
  },
  {
    slug: "sw-calgary",
    name: "Southwest Calgary",
    region: "Calgary",
    headline: "Construction & Renovation in Southwest Calgary",
    metaDescription:
      "SW Calgary renovation contractor — Aspen Woods, Signal Hill, Altadore, Marda Loop, Lakeview, Killarney. Kitchens, baths, basements, infills. Free quotes.",
    blurb: "Aspen Woods, Signal Hill, Springbank Hill, Altadore, Marda Loop, Lakeview, Killarney.",
    intro: `
<p>Southwest Calgary covers some of the city's most established and sought-after communities — the inner-city infill streets of Altadore, Marda Loop, and Killarney, the mature tree-lined homes of Lakeview and Glenbrook, and the higher-end hillside communities of Aspen Woods, Springbank Hill, and Signal Hill. The renovation work here tends to match: thoughtful kitchen and bathroom upgrades, main-floor reconfigurations, custom millwork, and high-end finishes in homes where quality matters more than the lowest bid.</p>
<p>In the older inner-city neighbourhoods, we often work in character homes that need careful, code-compliant updates — knocking down walls for open-concept living, modernizing kitchens and bathrooms, and finishing basements without compromising the home's bones. We pull the permits and respect the home's structure at every step.</p>
<p>We serve the entire southwest with free quotes and a 5% price-beat guarantee. Family-owned, three generations deep, since 1968.</p>
    `,
    neighbourhoods: ["Aspen Woods", "Springbank Hill", "Signal Hill", "Altadore", "Marda Loop", "Lakeview", "Killarney", "Glenbrook"],
  },
  {
    slug: "se-calgary",
    name: "Southeast Calgary",
    region: "Calgary",
    headline: "Construction & Renovation in Southeast Calgary",
    metaDescription:
      "SE Calgary construction & renovation contractor — Auburn Bay, Mahogany, Cranston, McKenzie Towne, Seton, Copperfield. Basements, kitchens, baths. Free quotes.",
    blurb: "Auburn Bay, Mahogany, Cranston, McKenzie Towne, Seton, Copperfield, Douglasdale.",
    intro: `
<p>Southeast Calgary is defined by its lake communities and newer suburbs — Auburn Bay, Mahogany, Cranston, McKenzie Towne, Seton, and Copperfield are full of family homes built in the last fifteen to twenty years. As with the northeast, that means basement development is the most common project we take on here: families who bought with an unfinished basement and are now ready to add living space, a home theatre, a gym, a guest suite, or extra bedrooms as the household grows.</p>
<p>We also see plenty of kitchen and bathroom renovations as these communities mature and original builder-grade finishes start to date. Whether it's upgrading to quartz countertops and a proper kitchen layout, or converting a tub to a walk-in shower, we handle the full job — design, materials, trades, permits, and inspections — with one accountable crew.</p>
<p>Free quotes and a 5% price-beat guarantee across the southeast. Family-owned since 1968.</p>
    `,
    neighbourhoods: ["Auburn Bay", "Mahogany", "Cranston", "McKenzie Towne", "Seton", "Copperfield", "Douglasdale", "New Brighton"],
  },
  {
    slug: "airdrie",
    name: "Airdrie",
    region: "Surrounding Area",
    headline: "Construction & Renovation in Airdrie",
    metaDescription:
      "Airdrie renovation & construction contractor — Bayside, Kings Heights, Cooper's Crossing, Windsong, Ravenswood. Basements, kitchens, baths, additions. Free quotes.",
    blurb: "Airdrie's growing communities — Bayside, Kings Heights, Cooper's Crossing, Windsong.",
    intro: `
<p>Airdrie has grown quickly into one of the most popular places to live just north of Calgary, and its communities — Bayside, Kings Heights, Cooper's Crossing, Windsong, and Ravenswood among them — are full of newer homes owned by young families. That demographic and that newer housing stock add up to one thing above all: basement development. The single most common reason Airdrie homeowners call us is to finish that empty basement and reclaim a third of their house.</p>
<p>Beyond basements, we do kitchen and bathroom renovations, flooring, and home additions throughout Airdrie. Because Airdrie has its own permitting and inspection process separate from the City of Calgary, working with a contractor who knows how to navigate it locally matters — and we do.</p>
<p>We've been serving Airdrie homeowners as part of our greater-Calgary service area for years, with free quotes and a 5% price-beat guarantee. Family-owned since 1968.</p>
    `,
    neighbourhoods: ["Bayside", "Kings Heights", "Cooper's Crossing", "Windsong", "Ravenswood", "Hillcrest", "Sagewood"],
  },
  {
    slug: "cochrane",
    name: "Cochrane",
    region: "Surrounding Area",
    headline: "Construction & Renovation in Cochrane",
    metaDescription:
      "Cochrane renovation & construction contractor — Sunset Ridge, Heritage Hills, Fireside, GlenEagles. Basements, kitchens, baths, acreage projects. Free quotes.",
    blurb: "Cochrane and the foothills — Sunset Ridge, Heritage Hills, Fireside, GlenEagles.",
    intro: `
<p>Cochrane sits in the foothills west of Calgary, and the homes here reflect that setting — hillside communities like Sunset Ridge, Heritage Hills, and GlenEagles with mountain views, the newer family neighbourhood of Fireside, and a number of acreage properties on the outskirts of town. It's a mix of newer builds wanting basement development and finishing, and established and rural homes needing renovations, additions, and custom work.</p>
<p>Acreage and foothills properties come with their own considerations — different soil, drainage, and sometimes well and septic factors — and we plan for them rather than treating every job like a standard city lot. For in-town homes, we handle the full renovation: kitchens, bathrooms, basements, flooring, and additions, with permits and inspections managed start to finish.</p>
<p>We serve Cochrane with free quotes and a 5% price-beat guarantee. Family-owned, since 1968.</p>
    `,
    neighbourhoods: ["Sunset Ridge", "Heritage Hills", "Fireside", "GlenEagles", "Riversong", "Bow Ridge"],
  },
  {
    slug: "okotoks",
    name: "Okotoks",
    region: "Surrounding Area",
    headline: "Construction & Renovation in Okotoks",
    metaDescription:
      "Okotoks renovation & construction contractor — Drake Landing, Cimarron, Air Ranch, Sheep River. Basements, kitchens, baths, additions. Free quotes.",
    blurb: "Okotoks family communities — Drake Landing, Cimarron, Air Ranch, Sheep River.",
    intro: `
<p>Okotoks, just south of Calgary along the Sheep River, has kept its small-town feel while steadily adding family communities like Drake Landing, Cimarron, and Air Ranch. The housing is a blend of established homes in the older parts of town and newer two-storeys in the growing communities — which means we see both renovation work in mature homes and basement development and finishing in the newer ones.</p>
<p>For Okotoks families, the most common projects are finishing basements to add bedrooms and living space, updating kitchens and bathrooms, and the occasional addition when a growing household needs more room but loves the town too much to leave. We manage the local permits and inspections and bring one accountable crew to the whole job.</p>
<p>Free quotes and a 5% price-beat guarantee throughout Okotoks. Family-owned since 1968.</p>
    `,
    neighbourhoods: ["Drake Landing", "Cimarron", "Air Ranch", "Sheep River", "Crystal Shores", "Mountainview"],
  },
  {
    slug: "chestermere",
    name: "Chestermere",
    region: "Surrounding Area",
    headline: "Construction & Renovation in Chestermere",
    metaDescription:
      "Chestermere renovation & construction contractor — Westmere, Rainbow Falls, Kinniburgh, Lakeside. Basements, kitchens, baths, additions. Free quotes.",
    blurb: "Lakeside Chestermere — Westmere, Rainbow Falls, Kinniburgh and the waterfront communities.",
    intro: `
<p>Chestermere, built around its namesake lake just east of Calgary, has grown fast into a lake-lifestyle city with communities like Westmere, Rainbow Falls, Kinniburgh, and the established Lakeside neighbourhood. Much of the housing is newer, and waterfront and near-water homes here tend to be finished to a higher standard — so the renovation and finishing work we do in Chestermere often leans toward quality basement developments, custom kitchens, spa-style bathrooms, and the kind of finishes that match a lakeside home.</p>
<p>As with the other communities around Calgary, Chestermere handles its own permitting, and we manage that process for you. Whether you're finishing a new build's basement, upgrading a kitchen, or planning an addition to make the most of the lake setting, we bring one accountable crew and a fixed-scope quote.</p>
<p>We serve Chestermere with free quotes and a 5% price-beat guarantee. Family-owned since 1968.</p>
    `,
    neighbourhoods: ["Westmere", "Rainbow Falls", "Kinniburgh", "Lakeside", "The Cove", "Dawson's Landing"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
