# PHANTOM — BOARD & NEXT OPS (v2)
**Consolidated state as of 2026-09-01. Release at v1.14.562. Owner copy. Supersedes v1.**

---

## DONE — VERIFIED (no action)

- **LEGACY-RETIRE:** complete (stages 0–4, 6, 7; Stage 5 folded into IA-SHIFTNAV; Stage 8 permanently deferred).
- **FORGE-WORKER-CUTOVER:** complete; independently verified from release — 0 `sk-ant`, 0 direct `api.anthropic.com`, 4 call sites on the Worker. Old key revoked; new key lives only as the Worker secret.
- **Rack-detail render bug:** fixed (.557) — OPEN AISLE from Home no longer wipes the elevation.
- **Multi-tab data-loss toast:** shipped, mutation-tested.
- **BOOT-TAPGATE:** shipped — `tap to enter` is in the live source.
- **IA-SHIFTNAV base spec + Phase 0 nav census:** done. Premise corrected: Deploy Optics is *buried* (~3 screens, ten-tool group), not stranded. Phase 1 parked on owner rulings.

---

## OPEN — OWNER ACTIONS

- **O-1 · Log in and run the session opener.** Nothing has executed today; `/login` first. Opener includes graphify-first, the spec import, and the rulings below.
- **O-2 · Rulings for IA-SHIFTNAV Ship 1:** (a) `ops_init` stays disabled or comes back; (b) aisle word for the OPS tool group; (c) **amended by review item 6:** ISOLATE gets its own door, separate from the tool group — the dangerous tool doesn't live in a laundry row with Blast.
- **O-3 · Worker streaming check (2 min, phone).** Forge AI text progressive = done. One lump = paste the pass-through fix in Cloudflare (v1 board has the code).
- **O-4 · Header hit-path repro (phone, 390px).** Reviewer's browser agent reported a Build tap landing on `header.app-header`. Unverifiable from source (`.app-header {display:none}` in one rule). Reproduce with a thumb. If real → P1, own ship.
- **O-5 · Grok-icon provenance ruling.**
- **O-6 · Boot ceremony ruling (optional).** Reviewer called boot "three curtains." You chose the tap gate deliberately; it stays. Only decide whether globe + nameplate should collapse into the single held screen. Owner taste, not a defect.

---

## QUEUE — SHIPS

### Q-1 · DATA-HONESTY-COMMAND — *new; suggested next after the opener*
Source-supported findings from the live review, one spec, two or three small ships:
- `set up profile` appears 7× in source, 3× visible on first-run Command → one affordance, in one place.
- `continue deployment` / Timeline / Open AI render on an empty job (no Master) → CTAs conditional on a Master existing; honest zeros keep honest verbs.
- Shift Readiness renders 25% for an unset profile → **gate or number, never a score for nothing.** Either hide until a site exists or replace with a plain gate state.
- Local System State card duplicates the same UNSET facts already shown above it → collapse.
Doctrine: no removal of real state; only removal of repeated or decorative state. Phase 0 evidence quotes each element's file:line first.

### Q-2 · IA-SHIFTNAV Phase 1 — *inputs updated by the review*
Hard requirements now on record for the proposal:
- **Scan gets a dock slot.** The all-day action is currently a card + a substab + a desktop rail item. Homeless on the phone.
- **Exit-hold loses its dock slot.** A power gesture is not a place; it doesn't own a quarter of the rail.
- **ISOLATE gets its own door** (per O-2c).
- **Identity moves to ARRIVE.** Nameplate off the first screen; racks/blockers above the fold on Command.
- **Phone is the product.** Desktop rail has `deploy / optics / audits / sops / power` tabs the phone dock lacks. Phase 1 reconciles: anything a tech needs on the floor exists on the phone dock or one tap from it. Confirm Phase 0's census covered the desktop rail; if not, extend it before design.
- Standing guards: tap-count table before/after; ISOLATE and rack detail may not get worse; stranger test in every mode-nav verify gate.

### Q-3 · IA-SHIFTNAV Ship 1 (re-scoped) — *after O-2 rulings*
Findability of the ten-tool group (option 1), 1→2 tap trade accepted, plus the ISOLATE door.

### Q-4 · Forge Ship 2 confirm — *likely already done*
Verify `#api-key-input` and `cw_api_key` plumbing are absent. Report only.

---

## SANDBOX GATE

| # | Gate | Status |
|---|------|--------|
| 1 | Exposed API key | **CLOSED** |
| 2 | Rack-detail visual renders | **CLOSED** (.557) |
| 3 | Churn settled | **CLOSED** |
| 4 | First screen is honest (Q-1) | OPEN |
| 5 | Scan + ISOLATE reachable in ≤1 tap from dock (Q-2/Q-3) | OPEN |
| 6 | Header hit-path clean (O-4) | OPEN — phone check |
| 7 | Streaming UX confirmed (O-3) | OPEN — phone check |

Two phone checks and two ships between now and handing PHANTOM to 2–3 trusted techs at AUS-01.

---

## REVIEW LEDGER (what the live-app critique got right, wrong, and unproven)

Supported by source: status museum, triple profile CTA, scan homeless, exit-hold on dock, Isolate buried, empty CTAs, readiness score, phone/desktop divergence.
Conflicts with owner ruling: boot ceremony (tap gate stays).
Unproven: header hit-path (O-4).
Rejected on principle: any "tear down and rebuild." Everything above is punch-list ships against verified anchors.

---

*Standing doctrine unchanged: graphify before work · evidence before patches · one visible change per ship · surgical edits against verified anchors · three-stamp lockstep · owner promotes · iPhone verify gates every stamp · no self-scheduling · a gauge that lies is worse than no gauge.*
