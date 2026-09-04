# Flavor Pagination Hint Layout Design

## Goal

Make the flavor carousel pagination easier to scan by separating its pagination control from the interaction guidance.

## Layout

- The flavor controls remain horizontally centered at the bottom of the final carousel scene.
- A dark, rounded pagination surface contains only the three flavor dots.
- The interaction hint is a separate, centered line immediately below that surface, displayed directly on the carousel background rather than inside the dark surface.
- The vertical gap between the dots surface and the hint remains compact so they continue to read as one control group.

## Responsive behavior

- Desktop continues to show `Drag straw to stir · Tap cup to drink`.
- At the existing mobile breakpoint, `Drag straw to stir` and its separator remain hidden; `Tap cup to drink` stays visible below the dots.
- Existing safe-area bottom positioning is retained.

## Scope and verification

- Only the final flavor carousel's control markup and styles change.
- Flavor selection, previous/next arrows, transition locking, and keyboard accessibility remain unchanged.
- Verify the desktop and mobile layouts visually: the dark surface encloses dots only, the hint is outside it, and no control overlaps the viewport edge or safe area.
