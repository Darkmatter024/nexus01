# OWNER RULINGS — John, in chat

Rulings issued by John directly in chat. **These outrank any web-Claude `.md`.**
If an incoming spec contradicts a ruling here, the ruling wins and the conflict gets
reported before anything ships.

Kept separate from the spec files on purpose: a corrected spec drop overwrites the
spec, and a ruling recorded inside it would be silently lost.

---

## 2026-07-30 — BANNER ART §5.5: baked text is a SIZE rule, measured in the ship cut
**Ruling (John):** confirmed §5.5 of `BANNER-RENDER-DIRECTIVE.md` as his, in chat. It is the gate.

- **Screen content is ALLOWED and wanted.** A NOC or datacenter photograph with blank monitors
  reads as fake. The prohibition is on *legible fabricated values*, not on text as such.
- **The bar: no text taller than 10px in the 1170x403 phone cut.** Measured in the SHIP CUT, not
  the master. Masters differ in height (DEPLOY 736, HANDOFF 611), so a percent-of-master threshold
  gates identical art differently depending on how it was rendered — it measures the wrong frame.
  The cut is fixed at 403px tall for every row, so it is the only stable gate.
- **Test:** downscale master to exactly 1170x403 → measure tallest glyph, over 10px fails →
  confirm at 390px wide that nothing resolves as a readable value.
- **Passes:** dense small screen content, log lines, row labels, chart axis ticks, hardware
  faceplate markings — the texture that makes a photograph read as real.
- **Fails:** anything legible asserting a state or value. Large display numerals. Status words
  like "Complete"/"Ready" sized to be read. Button labels sized for reading.
- **In-scene marks are NOT composited logos.** A PHANTOM wordmark embroidered on a glove cuff or
  printed on a chassis is set dressing, allowed. The absolute prohibition covers marks laid *over*
  the frame in post: title cards, captions, watermarks, corner logos.

**Known gap in the test as written:** step 1 says "downscale the master to 1170x403". A letterboxed
master must be DE-LETTERBOXED first or the measurement runs against a frame padded with dead black
(the MASTER row's master carries 22 dead bottom rows). Not owner-ruled; flagged for whoever
formalises the gate.

**State:** applied 2026-07-30. DEPLOY measured 6.6px largest text in the cut, nothing resolving at
390px — CLEARS, shipped in `.357`. OPS (shipped `.356`) is retroactively clean under this rule —
its monitor wall is exactly the "dense small screen content / chart axis ticks" the ruling passes.

---

## 2026-07-30 — B5: GB300 NVL72 on the DEPLOY banner STAYS
**Ruling (John):** "GB300 stays, it's aspiration not a defect."

The DEPLOY banner art carries legible `GB300 NVL72` on rack faceplates. AUS-01 runs H100/H200 and
there is no Blackwell on the floor, and the app ships site-agnostic (Design Law 6) — so this was
raised as a factual-accuracy defect. Owner ruled it is intentional aspiration. **Question CLOSED.**
Do not re-flag it on future ships.

**Corrects forward:** the shipped `.356` commit message and `version.json` notes state DEPLOY was
held partly because "the fleet runs H100/H200". That reasoning is SUPERSEDED by this ruling.
History not rewritten — corrected here and in the `.357` notes.

---

## 2026-07-30 — HANDOFF banner: scoped text overrule (NOT a change to §5.5)
**Ruling (John):** the `Complete` sublines and the `READY FOR HANDOFF` CTA are overruled — ship
despite §5.5's fail-list naming status words and button labels.

**This is a scoped exception to §5.5 for ONE asset, not an amendment.** §5.5 stands unchanged for
every future render; do not cite this as precedent.

**State — the overrule never had to fire.** Measured in the ship cut: `Complete` = 4.0px and gone
entirely at 390px; CTA label = 5.9px and does not resolve. Both clear §5.5 unaided. The only item
in question is the **tablet screen title "HANDOFF"** — 9.2-11.2px in the cut (median 9.9 against a
10px bar, a coin flip on size) and the one item that DOES resolve as a readable word at 390px.
It is a screen title: it asserts no state, no value, no measurement, so it is not obviously in
§5.5's fail-list either. **OPEN — awaiting a ruling on the title specifically.** HANDOFF is NOT
shipped as of `.357`.

---

## 2026-07-25 — FIX-DESKTOP-NAV-CARDS §3: the "DEVICES" card is COMPONENTS (:35331)
**Ruling (John):** the spec's "DEVICES section surface" was a **stale name**. The real card is
**COMPONENTS at `dct-ios.html:~35331`**, which carries an inline `background:var(--surf-1)`.
Question CLOSED.

**State:** §3 (card-surface unification) shipped PARTIAL in `.352` — the hero card was unified,
this COMPONENTS card was held back pending the ID. The ID is now known, so the §3 finish is
**unblocked but not yet shipped**: swap the COMPONENTS card's inline `--surf-1` → `--rd-cardfill`
(the one Home/Command card surface — real source is the SURFACE-GLOW `!important` block + GLASS-
SKIN, per [[feedback_grep_cascade_before_background]]). Small ship, not started; no owner action
pending. The broader 22-site inline `--surf-1` sweep stays parked (edits JS-generated HTML).

---

## 2026-07-24 — SHIP B: FLAT dies, 3D IS the view, one door out
**B4.2 RULING (supersedes the spec's a/b/c menu):** option (a), and deeper than the spec asked.

- With FLAT gone, **3D is not a door — it is THE view.** Always mounted. **No mode control at
  all.** The `.reh-3d-toggle` pill dies **entirely** (FLAT + 3D + AISLE buttons).
- **One control remains on this page: `OPEN AISLE`**, styled as what it is — a door to another
  surface, not a segment in a toggle.
- `forge3d_close` returns to the rack-detail **3D view**, which is now the only defined state.
  That makes the contract honest instead of implicit.

**B4.4 RULING:** keep the **NEXT ACTION chip**, drop the standalone **PHASE RUNNING LONG** card
(`dct-ios.html:35613`). One fact, one surface, and it lives in the actionable card.

**Sequencing:** Ship B takes its **own batch slot** — not stacked. Agreed because of the two
Step 0 findings below.

### Step 0 findings this ruling must respect (from live recon, 2026-07-24)
1. **This is an inversion, not a deletion.** `.reh-flat-wrap` is visible by default (`:10548`)
   and `.reh-3d-mount` is `display:none` until `.is-3d` lands on the host (`:10549`/`:10551`).
   3D becoming the always-on view inverts both the CSS gate and the `reh3d_setMode` contract.
2. ⚠️ **`display:contents` trap.** `.reh-flat-wrap` is `display:contents` (`:10548`). Do NOT
   leave the 3D mount under a `display:contents` ancestor — that is the `.337`→`.338` bug
   (a JS-measured WebGL mount goes invisible on iOS). See [[feedback_display_contents_breaks_webgl_mount]].
3. **`forge3d_close` hard-depends on `'flat'`** (`:18607`, `reh3d_setMode('flat')` reset) —
   must be rewired, or closing AISLE lands on a mode that no longer exists.
4. **Persisted state retires with the mode:** `reh3d_prefOn()` / `REH3D_PREF_KEY`
   (`:33429`, consumed `:33442`) exists only to choose between flat and 3D.
5. **The minimap survives** — `.rack-hybrid-minimap` is a sibling of `.rack-hybrid-canvas`
   (`:35423`), not a child of `#rehFlatWrap`.
6. **A third composition exists** — `:35421`, a non-3D branch with no flat wrap and no 3D host.
   Needs its own answer.

**Ship note must state:** no RACK SCENE LOCK value is touched — lights, exposure, fog, tone
mapping and type colours are untouched; this ship changes the **mount reveal path only.**

---

## 2026-07-24 — SHIP A (deployment page clearance) is CLOSED, not shipped
**Ruling:** John chose option 1 — close Ship A, go straight to Ship B.

**Why:** Step 0 proved A1's bug was already fixed by `v1.14.351` (`dct-ios.html:1100`,
`body.rd.ops-detail.ph-dock-on .page`). The spec is based on v345 and is stale by two ships.
It also misnames the surface: PHASE RUNNING LONG renders at `:35613`, inside **rack detail**,
and `ph-dock-on` is added only by `phdock_render` (`:35150`) and removed by `phdock_leave`
(`:35198`) which `deploy_showDetail` calls (`:32252`) — so the phase strip never renders on
the deployment detail page at all.

**Also rejected:** A3's grep gate (one `padding-bottom` formula file-wide). Three of the eight
sites are bottom sheets with an action stripe, one is the legacy nav itself, one is
legacy-shared (`.sop-detail` reads `--tabnav-h`). The gate cannot pass without breaking
`?legacy=1` byte-identity. The `!important` at `:11512` is not stale — it prevents the `.212`
tap-eating regression.

**Left on the table (not actioned):** narrowing clearance unification to the three rd page
scroll containers (`:1088`, `:1100`, `:11512`). Available as a CLEAN item if ever wanted.

**Open:** John to reconfirm on device that rack detail is clear on `.352`.

---

## 2026-07-24 — `racks_door` closed-deployment behavior
**Context:** Step 0 recon on `SHIP-RACKS-IS-THE-DOOR.md` found that `deploy_showDetail`
routes a **closed** deployment to `deploy_showTombstone` (`dct-ios.html:32256`). The spec's
§2 router would therefore land RACKS on a tombstone whenever the active context pointed at
a closed deployment — the spec never considered this case, and its verify step 7 only
covers "no deployment at all."

**Ruling:**
- Closed deployment → **dashboard, never the tombstone.**
- `racks_door` checks `ctx.deployment.status !== 'closed'`.
- Closed **or** missing → `deploy_goToDashboard(null)`.
- **Drop the spec's redundant bad-id fallback** — the `:32250` guard
  (`phantomToast('Deployment not found','error')` + `deploy_showList()`) already owns that
  path, loudly and correctly.

**Order also ratified:** SHIP-DEPLOY-PAGE-CLEARANCE-AND-FLAT (Ship A) first, then RACKS.

**Open when this ships:** the corrected `SHIP-RACKS-IS-THE-DOOR.md` is incoming and must be
pulled before `racks_door` is written. Verify the corrected spec actually encodes this
ruling; if it doesn't, this ruling still governs — report the mismatch, don't silently
follow the spec.
