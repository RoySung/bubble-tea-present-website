# Liquid Morph Carousel Design

## Intent

The final flavor carousel keeps one cup fixed at the center of the composition. A flavor change reads as the drink being remixed inside that cup, not as one product card leaving and another arriving.

## Choreography

1. The current title is collected upward while the cup settles a few pixels and its shadow tightens.
2. The current drink drains behind an irregular liquid edge. Pearls remain visible and roll subtly at the bottom.
3. The cup holds briefly as a transparent cup with its straw and pearls.
4. The next flavor environment rises from the bottom behind a broad wave edge.
5. The new liquid grows upward from the base with alternating wave crests throughout the rise, slightly overshoots its resting level, and settles into a small ripple.
6. A few pearls lift with the returning liquid and fall back independently. The straw sways once and comes to rest.
7. The next title enters from below after the drink is legible.

The cup shell, arrows, dots, and control position never change during the sequence.

## Interaction and State

- The selected flavor becomes the target as soon as navigation is requested.
- Carousel controls remain visible but are temporarily disabled until the approximately 1.8 second morph completes, preventing overlapping state changes.
- Temporarily disabling interactions does not reset consumption state. A partially consumed drink begins draining from its current liquid level and only restores a full serving after the cup is empty and the next flavor starts filling.
- Selecting the current flavor is a no-op.
- Changing flavor restores a full drink and all pearls after any prior sipping interaction.
- Keyboard focus, labels, and the existing cup interactions remain available outside the short transition.

## Visual Implementation

- The existing illustrated SVG cup remains the shared object.
- A dedicated animated SVG clipping path creates the draining and filling liquid edge.
- The sip-level clipping path uses the same wave geometry, so partially consumed drinks retain a visible meniscus instead of ending at a flat horizontal edge.
- Each sip animates liquid height and wave phase independently: the level eases continuously toward its next amount while one ripple cycle travels across the surface. Interrupted or rapid taps continue from the current rendered values rather than restarting from a discrete keyframe.
- Flavor changes use the same continuous height-and-phase model. Drain duration scales with the amount remaining, filling rises at a controlled continuous rate, and only the final overshoot and settle are separated into a short finishing motion.
- Background flavor layers overlap during changes; the incoming layer is revealed upward with an irregular polygon edge rather than a flat color crossfade.
- Transform and opacity animation are used for the cup, straw, pearls, title, and shadow. No layout-changing carousel motion is introduced.

## Accessibility and Resilience

- `prefers-reduced-motion` replaces the choreography with an immediate flavor update.
- Disabled controls expose their state natively during a morph.
- The flavor title remains the accessible live value represented by the existing heading and dot state.
- The transition is self-contained in the final carousel and does not alter the scroll-controlled recipe timeline.

## Verification

- Type-check and production-build the site.
- Verify forward, backward, wraparound, and direct-dot flavor changes.
- Verify that the cup remains centered while the liquid drains and refills.
- Verify normal and reduced-motion behavior at desktop and mobile viewport sizes.
