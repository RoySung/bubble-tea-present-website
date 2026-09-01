# Pour Choreography Correction Design

## Purpose

Correct the physical continuity of beats 02–05 without changing the eight-beat structure, final carousel, visual language, or single ScrollTrigger architecture.

## Approved Container Continuity

Beats 02–04 use one persistent opaque shaker. Its body does not reveal an internal liquid level and contains no pearls. Beat 05 introduces a separate transparent serving cup with pearls already resting at the bottom. Milk tea then pours from the shaker into that serving cup. The same serving cup continues through sealing, straw insertion, and the final flavor carousel.

The resulting sequence is:

`opaque empty shaker → add tea → add milk → shake → transparent pearl cup enters → shaker pours into serving cup`

## Beat Corrections

### Beat 02 — Pure Tea

- Raise the opaque shaker into the center of the stage.
- Place the tea vessel above and to the right so its left-facing spout points inward.
- Align the tea stream to the horizontal center of the shaker opening.
- Keep the shaker body opaque and show no pearls or internal fill level.

### Beat 03 — Add Milk

- Keep the same opaque shaker in place.
- Place the milk vessel above and to the left so its right-facing spout points inward.
- Reuse the exact shaker-mouth target used by the tea stream.
- Keep the shaker free of visible pearls and internal liquid.

### Beat 04 — Shake

- Shake the same opaque shaker using the existing reversible horizontal sweep and rotation.
- Do not introduce pearls, a transparent window, or an internal liquid layer.
- Retain background counter-motion as the secondary parallax response.

### Beat 05 — Pour

- Bring in the separate transparent serving cup with pearls already visible at its base.
- Move the shaker above and to the right, then tilt its opening toward the serving cup.
- Align the milk-tea stream from the shaker opening to the serving-cup opening.
- Animate the serving-cup liquid level upward while its pearls remain at the bottom.
- Remove the shaker after the pour; the transparent serving cup persists into beats 06–08.

## Geometry and Responsive Rules

- Tea and milk share one centered shaker-mouth destination instead of separate fixed left/right destinations.
- Vessel position and transform origin are derived from their spout side: tea pivots around its left spout; milk pivots around its right spout.
- Desktop and mobile use the same geometry model with smaller horizontal entry offsets on mobile.
- All motion continues to use transforms and SVG attributes; no layout property is animated.
- The master GSAP timeline, labels, progress ranges, pinning, and final 94% interaction boundary remain unchanged.

## SVG Ownership

- `Shaker` owns the opaque shaker shell and rim only. It no longer renders shaker pearls or an internal liquid layer.
- `TeaPour` and `MilkPour` retain independent vessel and stream targets.
- `SVGCup` remains the single transparent serving-cup source of truth, including its pearls and liquid clip.
- GSAP continues to animate the outer story cup shell while Motion owns only the nested final interactions.

## Verification

- At the midpoint of beat 02, the tea stream must meet the shaker opening on desktop and mobile.
- At the midpoint of beat 03, the milk stream must meet the same opening on desktop and mobile.
- Beats 02–04 must show an opaque shaker with zero visible pearls.
- At the start of beat 05, the transparent serving cup must enter with pearls visible before its liquid level rises.
- During beat 05, the shaker stream must visually connect to the serving-cup opening.
- Forward and reverse scrolling must preserve these states without duplicated cups or pearls.
- Existing sealing, straw, final carousel, reduced-motion fallback, lint, and production build behavior must remain intact.

## Out of Scope

- Adding pearls to the shaker.
- Showing a cutaway or transparent window in the shaker.
- Changing the eight-beat order or timing windows.
- Replacing the vector artwork with generated raster imagery.
