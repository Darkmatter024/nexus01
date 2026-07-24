# OWNER RULINGS — John, in chat

Rulings issued by John directly in chat. **These outrank any web-Claude `.md`.**
If an incoming spec contradicts a ruling here, the ruling wins and the conflict gets
reported before anything ships.

Kept separate from the spec files on purpose: a corrected spec drop overwrites the
spec, and a ruling recorded inside it would be silently lost.

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
