# PHANTOM — SESSION HANDOFF

**One session's worth of continuation. Overwrite this file each session; do not append a log.**
Durable facts belong in `PHANTOM_CURRENT_STATE.md`; durable lessons belong in memory.

---

## Last session — 2026-08-13

**Ended:** clean, four ships pushed. **Live: `v1.14.457`** (`847b0f5`).
**CALL 0 cap: 1 of 6.** Verify debt: `.457` only — block at the TOP of `BATCH-VERIFY.md`.

⚠ **This file was STALE when the session opened.** It claimed the previous session ended clean at
`.453` with nothing in flight; the tree actually held an unstamped, untested, uncommitted `.454`
plus a spec that had never been executed. **If `git status` disagrees with this document, `git
status` is the truth.**

---

## What shipped

| | |
|---|---|
| `.454` | Forge rack-centric; WALK AISLE an explicit mode |
| `.455` | **The locked pose became a real front elevation** — `.454` had locked a crooked one |
| `.456` | HANDOFF card art stops fabricating status |
| `.457` | **The context engine** (369 V3, rescoped by owner ruling) |

✅ **`.454`–`.456` cleared on hardware**, all six checks. `.457` is the only open debt.

---

## ⛔ THE TWO LESSONS WORTH MORE THAN THE SHIPS

**1 · A green suite proves nothing when the assertions test the wrong property.**
`.454` locked the camera to the angles `setFocus` had always targeted and called them canonical —
5.7° of yaw, 4.6° of pitch. It passed everything and still failed the owner's eye, because **every
assertion tested that the camera did not MOVE, never that it was SQUARE.** A frozen crooked pose
satisfied all of them. ⭐ *"These are the values the product already used"* is not evidence the
values are right; it felt like the conservative choice and it was the defect. Spec 37 now owns the
front-elevation contract with bounds that exclude the old constants.

**2 · A frozen spec can describe building what already exists.**
369 V3's §1 specified a SiteProfile module on key `phantom_site_profile_v1` — **live at :24091
since the SITE-PROFILE workstream, on a V2 schema**, so implementing it literally would have built
a duplicate store AND regressed the schema. §6 asked for AI call sites to be wired to a choke point
that had been there all along with seven sites already on it. ⭐ **Read the code before executing
the spec, and report the contradiction instead of resolving it silently** — the owner rescoped it
in one exchange. This is the `.431` lesson (searching for a spec's NAME instead of its concept)
arriving from the opposite direction.

---

## ⚠ FIVE TRAPS, all hit this session

1. **An early-return guard whose guarded path was the COMMON one.** `setWalkMode` wrote the rack
   label into the pill that owns `n/m RACKED` on the branch where `setFocus` bails — and "already
   focused" is exactly what look-around-and-come-back lands in.
2. **One convergence test across several axes.** The pose ease snapped on total 3-D distance; the
   large x delta held it above threshold so camera height crept across a walk. ⭐ **The axis with
   the largest delta decides for all of them — snap per axis.**
3. **Fixed wall-clock waits against frame-based easing.** ⚠ **This harness renders at ~2.7 fps**
   (measured) against 60 on device. ⭐ **Poll for the condition; a 90-second probe that MEASURES
   the curve turns "is this a real defect?" into a fact.**
4. ⛔ **NEVER ROUND-TRIP `dct-ios.html` OR `sw.js` THROUGH A SHELL READ/WRITE.**
   `(Get-Content -Raw) … | Set-Content -Encoding utf8` **mojibaked 4,622 lines** for a one-token
   stamp bump — PS 5.1 reads as ANSI. ⛔ **`phantom-guard` does NOT catch it** (it checks line
   endings, not encoding) and returned **exit 0 on the corrupted file**. Use Edit. Recovery is
   `git checkout --`. Detect with `Select-String -Pattern 'â€|â”|â­|âœ|âš'` → must be 0.
5. **Static source greps cannot see runtime composition.** Twice a verification grep reported a
   false MISS: once on a constant reassigned after construction, once on a string built by
   concatenation. ⭐ **The runtime is the authority — a spec assertion sees what a grep cannot.**

📌 **And two of my own test assertions were wrong before they were right** (a blank-stub regex that
flagged a section header; a bypass count that forgot the function declaration matches a call
pattern). **Before believing a red test, ask what it asserts against KNOWN-GOOD code.**

---

## Useful capability discovered

⭐ **Raster conversion works on this box with no install.** There is no `cwebp`, `sharp` or
ImageMagick, but **Playwright's Chromium** does it: load the PNG, draw to a canvas at target size,
`canvas.toDataURL('image/webp', q)`. Used for `.456` — 1468 KB PNG → 44 KB WebP at 1170×403.
⛔ There is **no image GENERATION** here — no `GEMINI_API_KEY`, and the `design` skill emits SVG.

---

## ⛔ Open — owner decisions, none started

1. **The `.457` device pass** — four checks, top of `BATCH-VERIFY.md`. Check 2 is the whole ship.
2. **The locked drag says nothing** (`.454`) · **the FOV literal** (`.455`, pure refactor) · **the
   HANDOFF gesture** (`.456`, aesthetic). All disclosed, none urgent.
3. **369 follow-ons** the spec named as non-goals: the auto-detecting paste parser is its own
   strongest NEXT candidate; the EVIDENCE UI card waits for response formats. ⛔ Next-best-action,
   readiness scores, Rack Intelligence and auto-handoff each need data-reality scoping first —
   **the `.457` field inventory is the model for how to do that** (3 already emitted, 4 added,
   1 degraded, 3 excluded for having no source).
4. **R1-D remainder** · **WALK SHIFT and SITE/SYSTEM** (owner-queued 2026-08-11) · **PHASE-ENGINE
   step text** · **M3 data sources**. ⛔ D-1 is the LAST domino.

---

## Machine note

WebGL context exhaustion means the box cannot produce a trustworthy multi-spec run — a six-spec run
once took **18.0 hours** and all six then passed alone in three minutes. ⭐ **Run renderer/Forge
specs ONE AT A TIME.** Redirect to a file rather than piping (`| tail -N` prints nothing until the
end and reads like a hang), and print every pass/fail line — `tail -1` hides the failure line.
⚠ GitHub threw **four consecutive 500s** on pushes and Pages served stale bytes for minutes after.
Both are the documented transient: retry, then verify the SERVED bytes.
