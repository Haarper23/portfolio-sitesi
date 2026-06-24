# Visual Asset System

All real media is **disabled by default**. The site runs entirely on abstract CSS, SVG, and procedural 3D geometry until assets are explicitly enabled.

## Central configuration

`lib/config/assets.ts` — the only place to change asset modes.

| Export | Controls |
|--------|----------|
| `heroBackground` | Hero section background (video / image / abstract) |
| `katana` | Katana 3D model (GLTF vs procedural placeholder) |
| `roninSection` | Secondary cinematic section (future use) |

## Asset modes

`VisualAssetConfig.mode` drives `VisualAssetSlot`:

| Mode | Behavior |
|------|----------|
| `"abstract"` | Gradient only — no network requests |
| `"image"` | Loads `poster` or `image` path as background |
| `"video"` | Streams video with `poster` fallback and gradient base |
| `"model"` | Gradient only (model rendered separately by 3D canvas) |

## Enabling the hero background video

1. Place the files:
   - `public/videos/samurai-hero.webm`
   - `public/videos/samurai-hero.mp4`
   - `public/images/samurai-hero-poster.webp`
2. In `lib/config/assets.ts`, change:
   ```ts
   export const heroBackground: VisualAssetConfig = {
     mode: "video",   // was "abstract"
     ...
   };
   ```

## Enabling the katana 3D model

1. Place: `public/models/katana.glb`
2. In `lib/config/assets.ts`, change:
   ```ts
   export const katana: KatanaConfig = {
     enabled: true,   // was false
     ...
   };
   ```
The scene falls back to the procedural placeholder automatically if the file fails to load.

## Future asset directories

```
public/
  models/
    katana.glb

  videos/
    samurai-hero.webm
    samurai-hero.mp4
    ronin-section.webm
    ronin-section.mp4

  images/
    samurai-hero-poster.webp
    ronin-section-poster.webp
    katana-fallback.webp
    cyber-city-background.webp
    red-moon-background.webp

  textures/
    film-grain.webp
    smoke.webp
    paper-noise.webp
```

## Mobile behavior

- KatanaScene is hidden on viewports below `md` (`hidden md:block`).
- Mouse parallax listener is not installed on touch devices (`hover: none` media query).
- `AtmosphericOverlay` CSS animations are suppressed by `prefers-reduced-motion`.

## Reduced-motion behavior

- `CinematicBackground` reads `prefers-reduced-motion`: video is not played; gradient shows instead.
- `.mist-layer` animations are killed via `globals.css` `@media (prefers-reduced-motion: reduce)`.
- GSAP entrance animations respect the same media query via the GSAP `matchMedia` defaults.

## Component map

| Component | File | Role |
|-----------|------|------|
| `VisualAssetSlot` | `components/background/VisualAssetSlot.tsx` | Reads config, picks background type |
| `CinematicBackground` | `components/background/CinematicBackground.tsx` | Video / poster / gradient renderer |
| `AtmosphericOverlay` | `components/background/AtmosphericOverlay.tsx` | Animated mist layers |
| `ParallaxLayer` | `components/background/ParallaxLayer.tsx` | Mon circles + hairlines, GSAP parallax |
| `KatanaScene` | `components/three/KatanaScene.tsx` | Canvas wrapper with `useGltf` gate |
| `KatanaPlaceholder` | (internal) | Procedural geometry, no assets needed |
| `KatanaModel` | (internal) | GLTF loader, only rendered when `useGltf=true` |
