# Bubble Tea Scroll Story Design

## Summary

Expand the current full-screen bubble-tea flavor carousel into an eight-beat, scroll-controlled story showing how bubble tea is made. The first seven beats form one continuous production sequence. The eighth beat resolves into the existing finished cup on its blue-and-yellow table and enables the current flavor carousel, straw drag, mouse parallax, and sip interactions.

This document specifies the approved design only. It does not authorize implementation, dependency installation, generated assets, or changes to the current website behavior.

## Confirmed Direction

- Purpose: immersive portfolio-style interactive showcase.
- Visual language: Graphic Pop, extending the existing saturated split backgrounds and flat SVG cup.
- Interaction: fully continuous scroll scrubbing with no snapping or autoplay.
- Devices: full experience on desktop and modern mobile; older devices degrade safely.
- Animation technology: GSAP Timeline and ScrollTrigger for the production story.
- Existing interaction technology: retain Motion for the final carousel and cup interactions.
- Assets: layered SVG first; image-model output only for optional raster texture or decoration.

## Existing Experience

The current React 19 and Vite application is one viewport tall and hides overflow. `App.tsx` owns a three-flavor carousel, animated split background, flavor title, navigation arrows, and pagination. `SVGCup.tsx` renders the cup as SVG and uses Motion for mouse parallax, straw dragging, pearl movement, and drinking. `flavors.ts` supplies the three flavor palettes.

The scroll story must preserve these behaviors as its final state while replacing the page-level `h-screen overflow-hidden` presentation with a progressively enhanced scroll surface.

## Experience Structure

The page contains one pinned, viewport-sized stage driven by native vertical scrolling. One master GSAP timeline maps the scroll range to eight labeled beats. The same rendered props persist across beats, so the shaker, streams, cup, seal, and straw travel between states rather than being removed and recreated. Scrolling upward reverses every operation.

The target active scroll distance is approximately eight viewport heights. The implementation may tune individual beat weights after browser testing, but their relative allocation and order are fixed.

| Progress | Label | Beat | Choreography |
| --- | --- | --- | --- |
| 0–10% | `intro` | Bubble Tea | Blue and yellow fields move in from opposite vertical directions. The title enters with the same opposing motion and establishes the visual world. |
| 10–22% | `tea` | Pure tea enters shaker | The shaker rises from below while a dark tea stream descends. The composition pans downward with the stream. |
| 22–34% | `milk` | Milk is added | A milk vessel crosses from the right. The stream changes material and the liquid inside the persistent shaker mixes toward the existing classic milk-tea color. |
| 34–49% | `shake` | Shake | The shaker sweeps left and right with restrained rotation. Background planes counter-move at a smaller distance to create the strongest parallax moment. Pearls or liquid lag behind the shaker shell. |
| 49–62% | `pour` | Pour into serving cup | The shaker travels to the upper right and tilts. The serving cup enters from the lower left. Its liquid level rises with scroll progress. |
| 62–73% | `seal` | Seal the cup | A white sealing film moves horizontally across the cup and continues across the viewport as a wipe that removes the shaker and resets the composition. |
| 73–84% | `straw` | Insert straw | The straw descends diagonally into the same cup. Contact produces a short cup displacement and pearl response tied to scroll, not a time-based bounce. |
| 84–100% | `serve` | Finished drink on table | The cup settles onto the existing blue-and-yellow scene. The flavor title, arrows, and dots appear, and the existing interactions become available. |

Primary object movement must carry transitions. Opacity may support object removal or focus but must not become the repeated transition pattern.

## Visual System

Retain the current committed palette as the source of truth. The classic blue and yellow establish the opening and final state. Existing matcha and chocolate palettes remain available only after the final carousel is active. Intermediate production beats may borrow the existing pink, green, red, brown, and milk-tea colors, but each color change must correspond to an ingredient, tool, or spatial plane.

Use crisp, flat vector geometry with restrained transparency for plastic and liquid. Avoid photorealistic drink rendering, glassmorphism, heavy blur, large animated shadows, decorative grain, and cream editorial styling. Typography remains bold and direct. Step names may be short and visible, with numbered markers allowed because the page represents a real ordered process.

## Asset Strategy

Create the shaker, tea stream, milk stream, serving cup, sealing film, straw, and pearls as independently targetable SVG layers. Refactor the existing cup drawing so the story and the final interaction share one visual source of truth.

Use transforms or SVG masks for liquid levels instead of animating layout height. Generated raster assets are optional and may only support effects SVG cannot express efficiently, such as subtle condensation, a small liquid highlight, tabletop texture, or decorative splash. Generated assets must be local, high-resolution PNG or WebP with transparent backgrounds where appropriate. They must not contain text or carry information required to understand the process.

## Component Architecture

### `BubbleTeaExperience`

Owns the complete scroll surface, pinned-stage root ref, final interaction state, and static fallback. It does not contain choreography details.

### `StoryStage`

Renders the persistent full-screen composition: background planes, title and step copy, shaker, ingredient streams, serving cup, seal, and straw. It exposes stable refs or scoped selectors for timeline construction.

### Scene objects

`Shaker`, `PourStream`, `SealFilm`, and `Straw` each render one understandable visual object and accept presentation props. They contain no ScrollTrigger instances.

### `CupAssembly`

Extracts reusable cup artwork and layers from the current `SVGCup`. A GSAP-owned outer shell handles production-story positioning. Motion-owned inner wrappers retain the existing mouse, drag, sip, and flavor behaviors after the final beat. GSAP and Motion must never write transforms to the same DOM node.

### `FlavorCarousel`

Extracts the current flavor state, title, arrows, dots, and background transitions from `App.tsx`. It is rendered in the final stage but remains inert and non-interactive until the `serve` activation threshold.

### `useBubbleTeaTimeline`

Builds and returns the GSAP master timeline inside `useGSAP()`. It owns timeline labels, child tweens, responsive variants, refresh behavior, and cleanup. All selector text is scoped to the experience root.

### Story configuration

A small `storyBeats` module contains label names, ordering, progress weights, and user-facing step names. This prevents choreography timings, progress UI, and accessible text from drifting apart.

## Animation Ownership and Data Flow

Native scroll position drives a single top-level ScrollTrigger. ScrollTrigger sets the progress of the master timeline. The timeline animates only StoryStage descendants. It uses labels and position parameters rather than chained delays.

The top-level configuration uses `pin: true`, `scrub: true`, and a functional `end` based on viewport height. Major scroll-linked movement uses `ease: "none"` so input and output remain directly coupled. Child tweens do not define their own ScrollTriggers.

When progress crosses into or out of the final activation range, a guarded callback updates the React final-state boolean once. The callback must not cause React renders on every scroll update. The boolean controls `inert`, pointer events, focusability, and the final interaction layer. Motion continues to own carousel transitions and cup micro-interactions within nested wrappers.

Register GSAP and ScrollTrigger once. Use `useGSAP()` with a root scope so timelines and ScrollTriggers revert on unmount. Use `gsap.matchMedia()` for desktop, mobile, and reduced-motion branches. Do not nest `gsap.context()` inside matchMedia.

## Responsive Behavior

Desktop and modern mobile share the same eight beats, object continuity, and fully reversible progress. Responsive variants adjust movement vectors, object scale, title position, and safe-area spacing rather than deleting scenes.

Use viewport-relative motion distances with clamped limits so tools stay on screen. Use `svh` or `dvh` for the pinned stage on mobile. Recalculate functional values after orientation or layout changes through ScrollTrigger's normal refresh cycle. Call `ScrollTrigger.refresh()` only after real layout changes such as font or asset loading; never on every scroll frame.

## Accessibility and Static Fallback

Before GSAP initializes, render the eight beats as a readable vertical sequence. Apply the pinned-stage presentation only after successful client initialization. If GSAP fails, visitors still see the complete process and can reach the finished carousel.

Under `prefers-reduced-motion: reduce`, do not run the long pinned parallax timeline. Present the same ordered content as static sections or minimal crossfades, followed by the usable flavor carousel. Preserve keyboard access, visible focus, meaningful headings, and WCAG 2.2 AA text contrast.

Do not use an `aria-live` region to announce scroll progress. The process copy remains in semantic document order. Visual progress indicators are decorative; controls in the final carousel remain real buttons with clear accessible names.

## Performance Constraints

- Prefer `x`, `y`, `scale`, `rotation`, and `autoAlpha`; do not animate `top`, `left`, width, height, margin, or padding for movement.
- Limit `will-change` to large elements actively participating in animation.
- Keep one master ScrollTrigger instead of creating one per beat.
- Avoid ScrollSmoother or third-party scroll proxies; native scrolling provides the requested direct response.
- Avoid large animated blur, filters, and shadows. Bound any SVG mask or filter to the smallest practical region.
- Predefine shaker and pearl offsets so reverse playback is deterministic.
- Do not create timelines inside scroll callbacks or per frame.
- Preserve smooth interaction on current iOS Safari and Android Chrome, with graceful static fallback on weaker devices.

## Error and Edge Cases

- Deep reload: initialize the timeline at the browser's restored scroll position without flashing the intro state.
- Rapid reversal: every beat must be safe when direction changes mid-transition.
- Resize and orientation: functional values and pin distance refresh without resetting the user's logical progress.
- Final-state boundary: carousel focus and pointer access toggle once in each direction and never become available underneath an earlier scene.
- Optional raster asset failure: SVG composition remains complete and understandable.
- JavaScript or GSAP failure: semantic static sequence remains visible and usable.

## Verification

### Automated

- Run TypeScript checking through the existing lint command.
- Run a production Vite build.
- Verify the static fallback is present before the GSAP-ready class is applied.
- Keep story labels and accessible step content derived from the same configuration.

### Interaction

- Inspect each timeline label while scrolling forward and backward.
- Test rapid wheel, trackpad, touch, scrollbar dragging, and direction reversal.
- Confirm deep-page reload, browser back/forward restoration, resize, and orientation changes.
- Confirm the current flavor arrows, dots, straw drag, pointer parallax, and sip interaction still work after `serve` activates.
- Confirm these controls cannot receive pointer or keyboard focus before activation.

### Accessibility and responsive

- Verify the reduced-motion experience contains all eight steps and the final carousel.
- Verify keyboard order, focus visibility, button labels, and contrast.
- Test representative desktop, narrow mobile portrait, and mobile landscape viewports.
- Inspect iOS Safari dynamic-toolbar behavior and Android Chrome touch scrolling.

### Performance

- Profile the shake and sealing-film beats, which carry the highest simultaneous motion.
- Check for layout thrashing, long tasks, oversized composited layers, and unnecessary paints.
- Target visually smooth 60 fps on current desktop and modern mobile hardware without making correctness depend on that target.

## Implementation Sequence

1. Add GSAP and `@gsap/react` dependencies and register required plugins once.
2. Extract the current carousel and cup presentation without changing behavior.
3. Create persistent layered SVG scene objects and the static eight-step fallback.
4. Build the scoped master timeline and wire the first four labels.
5. Complete pour, seal, straw, and serve transitions.
6. Activate and deactivate the existing final interactions at the guarded boundary.
7. Add desktop, mobile, and reduced-motion matchMedia variants.
8. Add optional image-generated decorative assets only if SVG browser review reveals a concrete visual gap.
9. Run automated, interaction, accessibility, responsive, and performance verification.

## Out of Scope

- Audio, narration, sound effects, WebGL, or video.
- Smooth-scroll libraries or scroll snapping.
- Backend services, analytics, checkout, or ordering.
- New flavors or changes to the existing flavor data.
- Automatic playback independent of user scroll.
