# Metal Shaker Design

## Decision

Replace the current beige opaque shaker illustration with a stylized stainless-steel cocktail shaker. The approved direction combines **B · brushed dimensional metal** with **C · a subtle embossed `SHAKE` wordmark**.

## Visual construction

- Keep the existing `320 × 460` SVG coordinate system so every GSAP position and scale remains stable.
- Use the three-part silhouette from the reference: a tapered lower tin, rounded shoulder, and short cap.
- Build the material from reusable SVG gradients: broad cool-gray bands for brushed steel, a narrow white highlight, and a restrained charcoal edge reflection.
- Add seams below the cap and around the shoulder/lower-tin joint so the object reads as assembled metal rather than a silver-colored plastic cup.
- Render `SHAKE` as a same-material emboss on the lower tin. It must be legible at desktop size without becoming a dark sticker or a high-contrast badge.
- Preserve the existing ground shadow so the shaker remains visually anchored during stationary steps.

## Motion and integration

- Preserve the outer `.shaker` element and `data-shaker` hook. GSAP continues to own all movement, rotation, opacity, and scaling.
- Preserve `data-shaker-mouth` on an invisible geometry anchor centered on the top opening. Ingredient streams and the serving pour continue to target this anchor.
- The complete metal illustration rotates as one rigid object during shaking and pouring; internal highlights do not animate independently.
- Do not add raster images, filters, or animated noise. The SVG must stay crisp, lightweight, reversible, and compatible with reduced-motion rendering.

## Responsive behavior

- Preserve the current CSS width rules on desktop, mobile portrait, and mobile landscape.
- Keep the silhouette within the current SVG bounds so it does not collide with story labels or clip during rotation.
- Ensure the embossed wordmark remains visible but secondary at the smallest supported shaker width.

## Verification

- Visually inspect the opaque shaker in steps 2 and 3, the shake motion in step 4, and the tilted pour in step 5.
- Confirm the tea and milk streams still land at the top-center anchor.
- Confirm the serving stream still begins at the shaker mouth and reaches the centered serving cup.
- Check desktop, mobile portrait, and mobile landscape viewports.
- Run TypeScript lint, production build, design detector, and whitespace checks.
