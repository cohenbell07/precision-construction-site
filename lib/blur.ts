/**
 * Shared blur placeholders for next/image.
 *
 * Tiny inline SVGs (no network fetch) tinted to each canvas so images fade in
 * from the surface they sit on instead of popping in over a hard background.
 * Use with `placeholder="blur" blurDataURL={DARK_BLUR}`.
 */

const svg = (fill: string) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5"><rect width="8" height="5" fill="${fill}"/></svg>`
  ).toString("base64")}`;

/** Showroom (dark) canvas — near-black steel. */
export const DARK_BLUR = svg("#101214");

/** Studio (cream) canvas — bone grey. */
export const CREAM_BLUR = svg("#E4E7EA");
