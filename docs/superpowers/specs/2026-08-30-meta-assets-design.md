# Meta Assets Design

## Feature summary

Add share-card and browser-icon assets that represent the first slide of the Interactive Boba experience. The assets make external links and browser tabs immediately recognisable while leaving the interactive carousel unchanged.

## Approved visual direction

- **Open Graph image:** a 1200 × 630 static card with the existing saturated blue upper field and yellow lower field. “Classic Milk Tea” sits in the top safe area; the cup, straw, and shadow sit below it with no overlap.
- **Favicon:** a square-specific redraw on the same blue field. It shows the complete cup, white straw, milk-tea liquid, and five boba pearls with enough padding to remain recognisable at 16px.
- The existing cup is the source of truth for materials and colours; the metadata assets are static SVG artwork, not a screenshot or animated component.

## Technical scope

- Add a project-local SVG Open Graph asset and a raster PNG rendition for platforms that require raster social previews.
- Add a project-local SVG favicon and PNG fallback(s), then link them from `index.html`.
- Add absolute Open Graph image and Twitter image tags, retaining the current title and description unless a deployment base URL is already defined in the project.
- Do not modify carousel behaviour, its animations, or its visual layout.

## Verification

- Type-check and production-build the Vite app.
- Inspect the built `dist/index.html` to ensure the new icon and social-image tags are emitted.
- Confirm each generated SVG has the expected square or 1.91:1 dimensions and that all referenced assets are present in `dist`.
