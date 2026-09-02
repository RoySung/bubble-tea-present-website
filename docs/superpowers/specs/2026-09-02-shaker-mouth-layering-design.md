# Shaker Mouth Layering Design

## Goal

Make the tea and milk columns read as entering the open shaker rather than touching or ending at its rim. Build the effect from real foreground and background layers instead of adding a duplicate internal column, decorative ripple, or mask illusion.

## Layer Model

Steps 02 and 03 use three composited layers in this order:

1. **Shaker back layer:** the rear metal rim and dark interior of the open mouth.
2. **Ingredient layer:** the existing tea or milk vessel and its single continuous stream.
3. **Shaker front layer:** the front rim, opaque body, highlights, wordmark, and lid assembly.

The stream continues past the back edge of the opening. The front rim and opaque body then cover its terminal segment. This real back–middle–front ordering creates the visual evidence that the liquid has crossed into the vessel.

## Structure and Motion Ownership

Render the shaker as two same-sized sibling story objects rather than one transformed stacking context. The back layer retains the open-mouth geometry anchor used to calculate ingredient-stream height. The front layer owns the body, shadow, wordmark, upper lid assembly, and the step-05 pour anchor.

GSAP treats both shaker layers as one synchronized target group for every whole-object operation: initial entry, horizontal shake, rotation, step-05 travel and tilt, opacity, scale, and exit. The lid remains independently targetable inside the front layer so step 04 can attach it before the synchronized shake begins.

The ingredient layers sit between the two shaker layers in the story-world stacking order. The dynamic stream-height calculation remains authoritative and continues to target 10px inside the open mouth. No second stream or contact animation is introduced.

## Visual Geometry

- The back layer draws the complete rear rim and dark interior.
- The front layer draws an explicit front-rim arc plus the body beginning at the mouth centerline.
- The stream remains visible over the dark interior between the rear and front edges.
- The front rim hides the stream at the centerline so no rounded stream endpoint is visible.
- When the lid attaches, the front-layer lid covers the open-mouth composition without exposing duplicate rim geometry.

## Scope

- Preserve the existing shaker proportions, metal gradients, highlights, shadow, and `SHAKE` wordmark.
- Preserve tea and milk vessel artwork, timing, colors, and stream widths.
- Preserve dynamic ingredient-stream alignment across viewport sizes.
- Preserve step-04 lid timing and step-05 serving-stream alignment.
- Do not add ripples, splashes, a second internal stream, visible liquid levels, or shaker transparency.

## Validation

- At 2260 × 1584, 1130 × 792, mobile portrait, and short landscape viewports, the tea and milk streams visibly pass over the dark mouth interior and disappear behind the front rim.
- No rounded stream endpoint remains visible at the cup opening while a stream is at full scale.
- The two shaker layers remain pixel-aligned during entry, shake, step-05 tilt, exit, viewport refresh, and reverse scrolling.
- Step 04 attaches the lid before either shaker layer begins horizontal movement.
- Step 05 keeps the lid attached and the serving stream connected to the pour anchor.
- The page reports no console errors; type-checking, production build, and diff whitespace checks pass.
