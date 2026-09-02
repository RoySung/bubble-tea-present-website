# Ingredient Stream Anchor Design

## Goal

Make the tea and milk columns visibly enter the open shaker in steps 02 and 03 at every supported viewport size. Remove the gap that appears on large displays when stream height and shaker size resolve from different CSS sizing rules.

## Root Cause

The ingredient streams use viewport-relative percentage heights while the shaker width is capped at 300px. The stream endpoint and shaker opening therefore drift apart as viewport height and aspect ratio change. At 2260 × 1584, the milk column stops about 86px above the opening even though the same CSS nearly touches at 1130 × 792.

## Geometry

Add a stable SVG geometry anchor at the open shaker mouth. During steps 02 and 03, derive each ingredient stream's height from its rendered top edge to a destination 10px inside that mouth. The stream remains behind the shaker in the existing stacking order, so the front metal edge hides its terminal segment and makes the liquid read as entering the vessel.

The alignment function runs while the shaker is entering and while either ingredient beat is active. It also runs after ScrollTrigger refresh so viewport resizing, orientation changes, and reverse scrolling use current rendered geometry. The existing stream reveal and retract animations continue to own `scaleY` and opacity; alignment only owns the base height.

## Scope

- Preserve the tea and milk vessel artwork, timing, color, width, and rotation.
- Preserve the open-shaker state in steps 02 and 03.
- Preserve the lid attachment and shake choreography beginning in step 04.
- Keep the step-05 serving-stream alignment independent.
- Remove fixed breakpoint-specific ingredient-stream heights once the runtime geometry is authoritative.

## Validation

- At 2260 × 1584, 1130 × 792, a mobile portrait viewport, and a short landscape viewport, both ingredient columns extend 10px inside the open shaker mouth at full scale.
- At the start and end of each pour, the existing `scaleY` animation reveals and retracts the aligned stream without snapping.
- Forward and reverse scrolling maintain alignment while the shaker enters or leaves the ingredient sequence.
- Resizing or rotating the viewport realigns the streams after ScrollTrigger refresh.
- Step 04 still attaches the lid before shaking, and step 05 keeps its existing serving-stream geometry.
- Type-checking, the production build, and diff whitespace checks pass.
