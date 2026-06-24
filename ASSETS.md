# Visual Asset System

All real media is **disabled by default**. The site runs entirely on abstract CSS, SVG, and procedural 3D geometry until assets are explicitly enabled via the central config.

---

## Central configuration

`lib/config/assets.ts` — the only place to change asset modes.

| Export | Controls |
|--------|----------|
| `heroBackground` | Hero section background (red-moon shrine atmosphere) |
| `gameBackground` | Game dev section background (shrine distortion) |
| `aiBackground` | AI/media section background (blue energy field) |
| `katanaShowcaseBackground` | Katana Showcase section background |
| `katana` | Katana 3D model config (GLTF vs procedural placeholder) |
| `roninSection` | Secondary cinematic section (future use) |

---

## Asset modes

`VisualAssetConfig.mode` drives `VisualAssetSlot`:

| Mode | Behavior |
|------|----------|
| `"abstract"` | Gradient only — no network requests |
| `"image"` | Loads `poster` or `image` path as background |
| `"video"` | Streams video with `poster` fallback and gradient base |
| `"model"` | Gradient only (model rendered by separate 3D canvas) |

---

## Enabling the hero background (red-moon shrine)

**Target:** Nighttime shrine, red moon, mist, cinematic dusk palette.

1. Place files:
   - `public/videos/hero-red-shrine.webm` — 1920×1080+, H.265/VP9, ≤10 s loop, ≤3 MB
   - `public/videos/hero-red-shrine.mp4`  — H.264 fallback
   - `public/images/hero-red-shrine.webp` — 1920×1080, first-frame poster
2. In `lib/config/assets.ts`, change:
   ```ts
   export const heroBackground: VisualAssetConfig = {
     mode: "video",  // was "abstract"
     ...
   };
   ```

---

## Enabling the game section background (shrine distortion)

**Target:** Crimson-tinted shrine distortion, glitch-pulse, dark Japanese aesthetic.

1. Place files:
   - `public/videos/game-shrine-distortion.webm`
   - `public/videos/game-shrine-distortion.mp4`
   - `public/images/game-shrine-distortion.webp`
2. Wire into `BentoProjects` by using `<VisualAssetSlot config={gameBackground} />`.
3. Change `mode` to `"video"` or `"image"`.

---

## Enabling the AI section background (blue energy)

**Target:** Electric-blue particle field, holographic grid, context-aware atmosphere.

1. Place files:
   - `public/videos/media-assistant-blue-energy.webm`
   - `public/videos/media-assistant-blue-energy.mp4`
   - `public/images/media-assistant-blue-energy.webp`
2. Wire into `FeaturedProject` by using `<VisualAssetSlot config={aiBackground} />`.
3. Change `mode` to `"video"` or `"image"`.

---

## Enabling the Katana Showcase background / model

**SVG-only mode** is always active. Optionally upgrade to video or 3D model:

### Option A — looping background video

1. Place files:
   - `public/videos/katana-loop.webm`  — smooth abstract katana loop, ≤6 s, ≤2 MB
   - `public/videos/katana-loop.mp4`
   - `public/images/katana-distortion.webp` — distorted blade poster
   - `public/images/katana-fallback.webp`   — static fallback
2. In `lib/config/assets.ts`, change `katanaShowcaseBackground.mode` to `"video"`.
3. Wire `<VisualAssetSlot config={katanaShowcaseBackground} />` into `KatanaShowcase`.

### Option B — GLTF 3D katana model (in Hero)

1. Place: `public/models/katana.glb`
2. In `lib/config/assets.ts`, change:
   ```ts
   export const katana: KatanaConfig = {
     enabled: true,  // was false
     ...
   };
   ```
   The `Hero` section passes `katana.enabled` to `KatanaScene → useGltf`.
   The procedural `KatanaPlaceholder` is the automatic fallback on error.

---

## Full asset directory map

```
public/
  models/
    katana.glb                         — GLTF katana, enable via katana.enabled

  videos/
    hero-red-shrine.webm               — Hero section background
    hero-red-shrine.mp4
    game-shrine-distortion.webm        — Game dev section (future)
    game-shrine-distortion.mp4
    media-assistant-blue-energy.webm   — AI section (future)
    media-assistant-blue-energy.mp4
    katana-loop.webm                   — Katana Showcase (future)
    katana-loop.mp4
    ronin-section.webm                 — Secondary cinematic (future)
    ronin-section.mp4

  images/
    hero-red-shrine.webp               — Hero poster (1920×1080)
    game-shrine-distortion.webp        — Game section poster
    media-assistant-blue-energy.webp   — AI section poster
    katana-distortion.webp             — Katana Showcase poster
    katana-fallback.webp               — Katana static fallback
    ronin-section-poster.webp          — Ronin section poster

  textures/
    film-grain.webp
    smoke.webp
    paper-noise.webp
```

> **Copyright notice:** All video and image assets must be original work, purchased stock footage, or permissively licensed (CC0 / royalty-free with commercial rights). Do not use AI-generated video of identifiable people or third-party game footage without a license.

---

## Mobile behavior

- `KatanaScene` (Three.js canvas) is hidden below `md` breakpoint (`hidden md:block`).
- Mouse parallax listeners are NOT installed on touch devices (`hover: none` media query guard).
- `AtmosphericOverlay` mist-layer CSS animations are suppressed by `prefers-reduced-motion`.
- Mobile users see a static vertical-stack fallback in `HorizontalShowcase` (`.lg:hidden`).

---

## Reduced-motion behavior

- `CinematicBackground` skips video playback; shows gradient instead.
- `.mist-layer` animations killed via `globals.css @media (prefers-reduced-motion: reduce)`.
- `KatanaShowcase` SVG draw animation is skipped; final static composition shown immediately.
- `KatanaShowcase` floating animation is not started.
- All GSAP `from()` animations degrade to instant-reveal equivalents.

---

## Component map

| Component | File | Role |
|-----------|------|------|
| `VisualAssetSlot` | `components/background/VisualAssetSlot.tsx` | Reads config, picks background type |
| `CinematicBackground` | `components/background/CinematicBackground.tsx` | Video / poster / gradient renderer |
| `AtmosphericOverlay` | `components/background/AtmosphericOverlay.tsx` | Animated mist layers |
| `ParallaxLayer` | `components/background/ParallaxLayer.tsx` | Mon circles + hairlines, GSAP parallax |
| `KatanaScene` | `components/three/KatanaScene.tsx` | Canvas wrapper with `useGltf` gate |
| `KatanaPlaceholder` | `components/three/KatanaPlaceholder.tsx` | Procedural geometry, no assets needed |
| `KatanaModel` | `components/three/KatanaModel.tsx` | GLTF loader, only rendered when `useGltf=true` |
| `KatanaShowcase` | `components/sections/KatanaShowcase.tsx` | Abstract SVG blade + GSAP ScrollTrigger reveal |
