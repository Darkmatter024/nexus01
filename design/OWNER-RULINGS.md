# OWNER RULINGS — John, in chat

Rulings issued by John directly in chat. **These outrank any web-Claude `.md`.**
If an incoming spec contradicts a ruling here, the ruling wins and the conflict gets
reported before anything ships.

Kept separate from the spec files on purpose: a corrected spec drop overwrites the
spec, and a ruling recorded inside it would be silently lost.

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
