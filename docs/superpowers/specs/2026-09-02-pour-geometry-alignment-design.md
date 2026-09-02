# Pour Geometry Alignment Design

## Goal

In step 05, make the milk-tea stream connect continuously from the shaker's outlet to the serving cup opening.

## Scope

- Update only the animated `pour` choreography.
- Preserve the existing shaker illustration, colors, timing windows, and all non-pour steps.
- Keep the relationship stable on desktop, mobile, and landscape layouts.

## Design

The pour scene uses two spatial anchors: the shaker outlet is the stream origin and the serving cup opening is the stream destination. The choreography positions the shaker and stream as one connected action instead of positioning each independently from the viewport centre.

The stream's position, length, and rotation will be derived from those anchors for each responsive layout. The shaker's step-05 translation will be adjusted so its illustrated outlet meets the stream origin. The stream will terminate at the cup opening's centre line.

## Validation

- At desktop, mobile, and landscape breakpoints, the stream begins at the shaker outlet and reaches the cup opening without a visible gap.
- Type checking and the production build complete successfully.
