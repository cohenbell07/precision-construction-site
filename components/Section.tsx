/**
 * <Section variant="dark" | "cream"> — the canonical section wrapper for the
 * Showroom + Studio design direction. See memory file
 * `project_showroom_studio_design.md` for the why.
 *
 * Cream sections automatically render:
 *  - the warm paper-grain background (.cream-canvas)
 *  - a top architectural hairline (sandstone → transparent)
 *  - heading silver-gradient is auto-reverted to ink (handled in globals.css)
 *
 * Dark sections default to bg-black; override with `bg` prop for #0A0A0A etc.
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type Variant = "dark" | "cream";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  /** Bypass the default background so callers can use bg-[#0A0A0A], bg-black, etc. Dark only. */
  bg?: string;
  /** Wrap children in `container mx-auto px-6 max-w-7xl`. Default true. */
  withContainer?: boolean;
  /** Override the container class entirely when you need a different max-width. */
  containerClassName?: string;
  /** Vertical padding rhythm. Default "lg" matches the homepage spacing. */
  padding?: "none" | "sm" | "md" | "lg";
  /** Show the top hairline rule (cream only). Default true for cream, ignored for dark. */
  topRule?: boolean;
  children: ReactNode;
}

const PADDING = {
  none: "",
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 md:py-20",
  lg: "py-14 sm:py-20 md:py-28 lg:py-36",
} as const;

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    variant = "dark",
    bg,
    withContainer = true,
    containerClassName = "container mx-auto px-6 max-w-7xl",
    padding = "lg",
    topRule,
    className = "",
    children,
    ...rest
  },
  ref
) {
  const isCream = variant === "cream";
  const showTopRule = isCream && topRule !== false;

  const variantBg = isCream ? "cream-canvas" : bg ?? "bg-black";
  const positioning = showTopRule ? "relative" : "";

  return (
    <section
      ref={ref}
      className={`${positioning} ${variantBg} ${PADDING[padding]} ${className}`.trim()}
      {...rest}
    >
      {showTopRule && <div className="cream-divider-top absolute top-0 left-0 right-0" aria-hidden />}
      {withContainer ? <div className={containerClassName}>{children}</div> : children}
    </section>
  );
});
