# R1 — RACK RENDERER BASELINE

**Directive:** `PHANTOM_RACK_RENDERER_UPGRADE.md` (Downloads, 2026-08-11), stage R1 — recon and
baseline, **no visual change**. Nothing in this stage edits a pixel.

**Measured against** `v1.14.441` (`ad21c0f`), phone-webkit at 390×844, real app, real renderer.
Screenshots in `_r1/` are app captures, not recreations.

---

## 1 · The canonical render path, as it actually is

| Concern | Live implementation |
|---|---|
| Attachment registry / single-context law | `RackEngine` — `dct-ios.html:37433` |
| Reclaim barrier (I6) | `RackEngine._armBarrier` / `acquireOrDefer` — `:37510`, `:37535` |
| Data contract (I8/I9) | `RackEngine._resolve` — `:37779` |
| **Rack renderer** | **`rackElevation_render3D` — `:38015`** |
| Lazy-load + flat fallback | `rackElevation_ensure3D` `:37988` · `reh3d_fail` `:38003` |
| Flat elevation (no-WebGL fallback) | `rackElevation_buildHtml` — `:39338` |
| **Aisle renderer** | **`forge3d_render` — `:19836`** |
| Build preview host | `bw_mount3D` → `#bw-mount` — `:21585` |
| Rack detail host | `reh3d_activate3D` → `#reh3dMount` — `:37967` |

### ⛔ Finding R1-A — there are TWO WebGLRenderers today, not one

The directive's §2 and §31 assume one canonical engine. That is the **target**, not the baseline:

- `dct-ios.html:19866` — `new THREE.WebGLRenderer(...)` inside `forge3d_render`
- `dct-ios.html:38125` — `new THREE.WebGLRenderer(...)` inside `rackElevation_render3D`

They are separate scenes with separate rigs. The aisle runs `FogExp2(0x04060a, 0.045)`, exposure
0.6, a SpotLight and baked face textures. The rack runs `FogExp2(0x030508, 0.008)`, exposure 1.1,
and the §A JOHN-LOCKED four-light rig. **Nothing shared but three.js itself.**

⚠ Unifying them is **M2-b Stage 3 §8** — "deleting `forge3d_render` as a separate renderer, the
single largest blast radius left in the file" — and renderer consolidation is **STOPPED by owner
directive**. The directive's §52 also says *do not continue renderer consolidation deletions as a
side effect*. So §31 ("Forge uses the same upgraded visual system") **cannot be delivered without
restarting the stopped consolidation.** This is reported, not resolved.

---

## 2 · Baseline metrics

Scene totals are cumulative across every scene the renderer has drawn this session, which is why
they grow as surfaces open. `renderersLive` is the number holding an unlost context.

| | Build preview | Rack detail (ISO) | Forge aisle |
|---|---|---|---|
| Renderers created (cumulative) | 3 | 4 | 5 |
| **Renderers live** | **1** | **1** | **1** |
| Scene objects | 1,095 | 1,460 | 1,588 |
| Meshes | 990 | 1,320 | 1,425 |
| Geometries | 927 | 1,236 | 1,322 |
| **Materials** | **333** | **444** | **494** |
| Textures | 27 | 36 | 58 |
| Triangles (traversed) | 22,676 | 30,235 | 31,035 |
| Draw calls (last frame) | 276 | 276 | 73 |
| Device DPR | 3 | 3 | 3 |
| **Renderer pixel ratio** | **2** | **2** | **2** |
| Canvases in DOM | 5 | 5 | 5 |

**Console:** no renderer errors. The only errors are the Cloudflare Worker CORS rejections, which
are a harness artifact of running from `127.0.0.1`, not app code.

### Finding R1-B — material and geometry reuse is the performance headroom

333–494 **unique** materials, and geometries almost 1:1 with meshes (927 geometries / 990 meshes).
There is essentially **no sharing** today. §17 of the directive names this exactly: *"Do not
instantiate dozens of unique materials per device. Material reuse matters on mobile."* This is the
single biggest measurable win available and it costs nothing visually.

### Finding R1-C — DPR policy already exists and is already tuned

Both renderers cap at `Math.min(window.devicePixelRatio, 2)` (`:19867`, `:38126`). Device DPR is 3;
render happens at 2. §24 says *"use the existing renderer policy if already tuned"* — it is. **No
change wanted here**, and the directive's own instruction is not to hardcode a new cap.

---

## 3 · ⛔ Finding R1-D — the Build rack preview is entirely below the fold

Measured on 390×844 with the bottom nav in place:

```
viewport height          844
bottom nav top           733
#bw-mount top            857     <- starts 124px BELOW the nav
#bw-mount bottom        1177
#bw-mount height         320
VISIBLE PIXELS             0
```

`#bw-shell` layout budget above the mount:

```
bw-hd        82 -> 128   h46
bw-state    143 -> 185   h42
bw-hero     200 -> 485   h285    <- the largest single consumer
bw-card     500 -> 587   h87     (NEXT ACTION)
bw-prev     602 -> 1195  h593    <- only its 131px header is above the fold
```

**The rack renders correctly and the technician cannot see one pixel of it without scrolling.**
That is almost certainly the "rack preview not working" report: `.441` proved the mount holds a
live 652×640 canvas, and this proves none of it is on screen.

Directive §30 requires *"~270–320px minimum visible rack scene height"* and *"no tiny thumbnail."*
Current visible height is **0**. ⚠ Closing this is a Build **composition** change, and §52 says
*do not redesign Build workflow* — so the fix has to come out of the space above the mount (the
285px hero is the obvious candidate), not out of a re-layout. **Wants an owner decision before R2.**

---

## 4 · Data honesty baseline

S4:099 through the app, rendered: **19 slots, 19 unique**, CDU present, 8 power shelves, 9 GPUs —
matching §6 exactly.

⚠ **Stated plainly: that was a SYNTHETIC fixture** built from the directive's own §6 list, so it
proves the renderer consumes an inventory faithfully — it does **not** prove the parser. The real
Master gate is the existing `test/e2e/15-dual-source-master.spec.js`, which runs the production
parser against rows lifted from the real workbook, and it stays the authority for §47.

**Forge zero-state, from the capture:** with no Master loaded the aisle draws generic branded racks
with dense blue-lit faces (`F-13`/`F-14`/`F-15`). It is **disclosed** — the header reads NO MASTER
LOADED and a banner repeats it — so it is honest scenery under §33, not fabricated inventory. Worth
knowing before R6 that those faces are baked textures, not Master-driven devices.

---

## 5 · Current visual read (what the directive is reacting to)

From the captures: the aisle is dark cabinets with vertical cyan strips and dense blue LED faces —
the directive's *"stack of dark rectangles with glowing strips"* is a fair description. Aisle camera
framing also clips the outer racks at both viewport edges and leaves a large empty black band above
the racks, which §27/§28/§45 would address.

---

## 6 · Blockers before R2

1. ⛔ **RACK SCENE LOCK.** `PHANTOM_CURRENT_STATE.md` §5 locks materials, the JOHN-LOCKED light
   rig, fog, tone mapping, tray geometry/internals, type colours, bezel strips, floor and
   reflection; only `camera` is open. **The floor is UNLIT BY RULING and any sheen/gloss ask is
   named a P0 revert.** The directive asks for materials (§17–18), lighting (§20), floor contact
   and reflection (§26), geometry (§7/§10) and colour (§34). **A new owner ruling is required to
   supersede the lock, and §26 needs to be called out by name.**
2. ⛔ **§31 Forge parity requires restarting the STOPPED renderer consolidation.** See R1-A.
3. ⚠ **The reference visual does not exist.** `PHANTOM_RACK_RENDERER_SELF_CONTAINED_MOCKUP.html`
   is not in `Downloads`. 30 other mockups are; none by that name. Nearest relatives are
   `MOCKUP-INSPECT3D-STUDIO-*.html` and `MOCKUP-rack-threejs.html`, which the code at `:38013`
   says the current scene already mirrors. **Without the target, R2–R8 have no acceptance
   reference** and §43's *"looks like a real premium datacenter rack"* is unfalsifiable.
4. ⚠ **R1-D (below-the-fold preview) wants a decision** — see §3.

## 7 · What R1 did NOT do

No visual change. No material, light, geometry, camera or layout edit. No renderer touched. The
only files added are this note and the `_r1/` captures.
