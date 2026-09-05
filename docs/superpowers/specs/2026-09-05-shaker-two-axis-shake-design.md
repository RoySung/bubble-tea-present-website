# Shaker Two-Axis Shake Design

## Goal

Make the step-04 shaker motion read as a physical shake in both axes while preserving the existing scroll-scrubbed choreography.

## Motion

- Keep the existing four alternating horizontal sweeps and matching alternating rotation.
- At each sweep endpoint, apply an opposing vertical offset so the shaker alternates above and below its resting position.
- Use a diminishing vertical amplitude: 22px, 19px, 16px, then 13px. The existing horizontal and rotational amplitudes continue to diminish on the final two sweeps.
- At the end of the shake beat, restore `x: 0`, `y: 0`, and `rotation: 0` before the pour beat begins.

## Constraints

- Animate both shaker layers together, so the open-mouth back layer and the closed shaker stay aligned.
- Leave the lid seating choreography, responsive horizontal shake distances, pour target coordinates, background timing, and reduced-motion fallback unchanged.
- The added vertical movement must resolve before the step-05 pour begins, preserving the serving-stream alignment.

## Validation

- During step 04, the shaker visibly moves left/right and up/down with a gradually settling motion.
- At the step-04/05 boundary, both shaker layers are centered vertically with no residual rotation.
- Forward and reverse scroll yield the same deterministic positions.
- Type-checking and the production build pass.
