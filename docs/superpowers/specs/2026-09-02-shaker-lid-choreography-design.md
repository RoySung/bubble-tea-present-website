# Shaker Lid Choreography Design

## Goal

Correct the shaker's physical state across the ingredient and shake beats. Steps 02 and 03 show an open shaker while tea and milk are added. Step 04 attaches the lid before the shaker moves, and the lid stays attached through step 05.

## Visual States

- **Step 02 — Tea:** show the metal shaker body with a visible open mouth and no upper lid assembly.
- **Step 03 — Milk:** preserve the same open shaker while milk is added.
- **Step 04 — Shake:** bring the upper lid assembly into place at the start of the beat, finish the attachment before the first horizontal shake, and then move the complete shaker as one object.
- **Step 05 — Pour:** keep the upper lid assembly attached while the shaker moves and tilts toward the serving cup.

## Implementation

Split the shaker illustration into a persistent body and an independently targetable upper-lid SVG group. Preserve the existing outer `data-shaker` element so GSAP continues to own whole-object position, rotation, opacity, and scale. Add a dedicated selector for the lid group and let the master timeline control only its visibility and local vertical offset.

The initial timeline state hides and slightly raises the lid. At the beginning of step 04, the lid descends into its seated position. The first shake begins only after the lid has seated. The lid receives no separate transform after attachment, so it follows the outer shaker through the shake and pour beats. Reverse scrolling uses the same scrubbed timeline and therefore detaches the lid when returning from step 04 to step 03 without a state reset or duplicate object.

The existing responsive shaker positions, step-05 stream alignment, serving-cup choreography, colors, and reduced-motion fallback remain unchanged.

## Validation

- At desktop, mobile, and landscape breakpoints, steps 02 and 03 show a clearly open shaker with no lid assembly.
- At the start of step 04, the lid seats before the first shake movement begins.
- During steps 04 and 05, the lid remains aligned with the shaker body without lag, clipping, or a duplicate silhouette.
- Forward and reverse scrolling preserve the correct open and closed states at the step boundaries.
- The tea and milk streams still meet the open shaker mouth.
- The step-05 serving stream remains connected between the shaker and serving cup.
- Type-checking and the production build pass.

## Out of Scope

- Removing the lid in step 05.
- Changing the shaker's metal styling, dimensions, or wordmark.
- Changing the serving cup lid or sealing choreography in steps 06–08.
