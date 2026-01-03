---
name: Performance Optimization and Hero Section Upgrade
overview: Eliminate site lag by removing expensive animations and effects, then upgrade the hero section with a premium construction-themed design that matches the business's high-end aesthetic.
todos:
  - id: remove-infinite-animations
    content: Remove or disable infinite CSS animations (dividerShine, glowPulse, float, steelShimmer) in globals.css
    status: completed
  - id: remove-remaining-blur
    content: Change remaining blur-3xl to blur-lg or remove in page.tsx sections (lines 124, 227)
    status: completed
  - id: optimize-framer-motion
    content: Reduce and optimize Framer Motion animations in page.tsx, simplify whileInView triggers
    status: completed
  - id: simplify-textures
    content: Simplify texture-concrete and texture-blueprint effects in globals.css to reduce GPU load
    status: completed
  - id: optimize-card-effects
    content: Simplify card-premium hover effects and reduce box-shadows in globals.css
    status: completed
  - id: upgrade-hero-background
    content: Design and implement premium construction-themed background for hero section in page.tsx
    status: completed
    dependencies:
      - remove-infinite-animations
      - remove-remaining-blur
  - id: enhance-hero-visuals
    content: Add premium visual elements, typography improvements, and construction-themed details to hero section
    status: completed
    dependencies:
      - upgrade-hero-background
---

# Perfo

rmance Optimization and Hero Section Upgrade

## Overview

This plan addresses severe performance lag by removing expensive CSS animations and effects, then upgrades the hero section with a premium construction-themed design that elevates the site's professional appearance.

## Part 1: Performance Optimization

### Issues Identified

1. **Infinite CSS animations** running continuously (dividerShine, glowPulse, float, steelShimmer)
2. **Multiple blur-3xl** effects still present in sections (not just hero)
3. **Excessive Framer Motion animations** with `whileInView` triggering on scroll
4. **Heavy texture effects** with repeating gradients
5. **Multiple backdrop-blur** effects
6. **Complex layered backgrounds** with multiple gradients

### Performance Fixes

#### Remove Infinite Animations

- **File**: `app/globals.css`
- Remove or disable infinite animations:
- `dividerShine` - Change to static or remove animation
- `glowPulse` - Remove infinite animation, use hover-only
- `float` - Remove or make static
- `steelShimmer` - Remove or simplify
- Replace with static effects or hover-only animations

#### Remove Remaining blur-3xl

- **File**: `app/page.tsx`
- Change `blur-3xl` to `blur-lg` or remove on lines 124 and 227
- Reduce blur intensity across all sections

#### Optimize Framer Motion

- **File**: `app/page.tsx`
- Reduce `whileInView` animations - use `viewport={{ once: true }}` more strategically
- Simplify animation properties (remove complex transforms)
- Consider removing some motion components where static is acceptable

#### Simplify Texture Effects

- **File**: `app/globals.css`
- Simplify `.texture-concrete` - reduce gradient complexity
- Simplify `.texture-blueprint` - reduce opacity or remove if not essential
- Consider using simpler background patterns

#### Reduce Backdrop Blur

- **File**: `components/Header.tsx`
- Keep `backdrop-blur-sm` but ensure it's only where necessary
- Remove duplicate backdrop-blur in mobile menu if possible

#### Optimize Card Effects

- **File**: `app/globals.css`
- Simplify `.card-premium` hover effects
- Reduce number of box-shadows
- Simplify gradient overlays

## Part 2: Hero Section Premium Upgrade

### Design Goals

- 100X more premium appearance
- Construction business-appropriate aesthetic
- Professional, high-end feel
- Better visual hierarchy
- Sophisticated background design

### Hero Section Enhancements

#### Background Design

- **File**: `app/page.tsx`
- Replace current background with premium construction-themed design:
- Subtle architectural grid pattern (blueprint-inspired but refined)
- Elegant gold accent lines (not overwhelming)
- Sophisticated depth with layered gradients
- Professional geometric patterns
- Remove excessive blur effects
- Add subtle construction-themed elements (measurement lines, precision indicators)

#### Visual Elements

- Add premium gold accent borders/frames
- Implement sophisticated typography hierarchy
- Add subtle construction industry visual cues (blueprint elements, precision lines)
- Create elegant depth with shadows and layering
- Use premium color palette with refined gold accents

#### Content Presentation

- Enhance typography with better spacing and hierarchy
- Improve button styling for premium feel
- Add subtle premium visual elements (badges, accents)
- Better use of white space

## Implementation Strategy

### Performance First

1. Remove all infinite animations
2. Reduce blur effects
3. Simplify textures
4. Optimize Framer Motion usage
5. Test performance improvements

### Then Upgrade Hero

1. Design new premium background
2. Implement refined visual elements
3. Enhance typography and spacing
4. Add premium construction-themed details
5. Ensure performance remains optimal

## Files to Modify

1. `app/globals.css` - Remove animations, optimize effects, simplify textures
2. `app/page.tsx` - Remove blur-3xl, optimize Framer Motion, upgrade hero section
3. `components/Header.tsx` - Optimize backdrop-blur usage

## Testing

- Verify lag is eliminated
- Check page load performance