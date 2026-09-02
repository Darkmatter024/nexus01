# SHIP-HANDOFF-PUNCHLIST-0901.md
**Owner walk-through of the live app, 2026-09-01 evening, v1.14.565. Ten items. Evidence-first, one visible change per ship, door ledger on every ship.**

- **Status:** APPROVED as a punch list. Each item becomes its own ship (or folds into the named spec). Owner sequences; no self-scheduling.
- **Governing rule (from SHIP-HANDOFF-IA-SHIFTNAV v2 §0):** the rack is the unit of work. Load Master → pick rack → work the rack. A ship that opens a door closes at least one. Two paths to the same fact is a defect. **Read v2 §0 before touching any item below.**
- **Baseline:** current stamped release. `/graphify . --update` first. All anchors from verified source.
- **Session opener requirement:** Phase 0 on each item is read-only and reports file:line before any patch. Stop and report after Phase 0 of each item. Do not batch patches across items.

---

## P-1 · DCT ASSISTANT — "Could not reach assistant: API 400"  *(sandbox blocker — AI surface is dead on the phone)*

**Evidence (owner-verified from release source):** `phantomAPI()` in dct-ios.html sends header `x-phantom-key: <48-char shared secret>` to `https://phantom-api.wfj6t2fk7w.workers.dev/v1/messages`, with a comment calling it "S-1 shared secret — must match Worker PHANTOM_KEY." The Worker (verified by owner from live worker.js) **does not check any client token** — its comments say origin enforcement *replaced* token auth — and its CORS allows request header `Content-Type` **only**. A non-listed header fails Safari preflight.

**Phase 0:**
- Quote `phantomAPI()`: the header, the S-1 comment, the error handling that renders "API 400", and every caller.
- Which ship added S-1, under which spec? Quote the ship note. If no spec authorized it, say so plainly.
- Confirm the contract mismatch (client sends a header the Worker neither accepts in CORS nor reads).
- Determine which symptom is live: owner checks Cloudflare → phantom-api → Observability → Logs. A logged POST with status 400 = request arrived and Anthropic rejected the body (then quote the body the client sends). No logged request = Safari blocked on preflight.

**Ruling (owner):** remove `x-phantom-key` and `PHANTOM_PROXY_KEY` from the client. The Worker is origin-locked and rate-capped; that is the contract. No shared secret in a public source file pretending to be a lock.

**Ship:** delete the header and constant; surface the real response body in the assistant error card instead of "API 400" (data honesty — S-5 of the forge cutover applies here too). Grep gate: `x-phantom-key` = 0, `PHANTOM_PROXY_KEY` = 0.

**Verify (owner, iPhone):** ask the assistant one question → answer streams. Worker log shows the request with 200.

---

## P-2 · "typical: 60 min" PHASE BASELINE — invented benchmark shown as data

**Evidence:** `PHASE_BASELINE_MINS = { mechanical: 90, power: 60, network: 120, compute: 45, validation: 60 }`, comment "conservative estimates for first builds." The nudge renders "404 min on POWER (typical: 60 min). Unlogged blocker?" — the 404 is measured, the 60 is made up.

**Phase 0:** quote the table, the nudge renderer, and whether any real phase-duration history exists in the Master/log that could replace it.

**Ruling:** no invented number shown as a benchmark. Two acceptable outcomes: (a) label honestly — "404 min on POWER · no baseline yet" until measured history exists; or (b) compute from logged phase completions and label "your avg: N min (from K racks)." Recommendation: (a) now, (b) as a later ship once ≥5 completions exist.

**Ship:** one visible change per the ruling.

---

## P-3 · S-14 ZERO-REFERENCE GATE — needs owner amendment

Claude Code reported the renderer cannot reach zero references cleanly. **Phase 0:** name the surviving reference(s), file:line, and why each can't go. Propose the smallest honest amendment. Owner rules. (Likely folds into P-10's Phase 0 — same renderer family.)

---

## P-4 · .566 ABOVE-THE-FOLD FIX — owner says go

Cut it as specced: mount re-positioned inside `#bw-shell` mirroring .561, probe before/after, ship note carries measured `mountTop`/visible numbers, `30-rack-above-the-fold:79` green. Then Ship 2b (four orphaned functions, `.rack-hybrid*` CSS, five null `#reh3dCanvasHost` guards).

---

## P-5 · CLAUDE CODE RESTART — pending update

After .566 stamps: park state to `PHANTOM_CURRENT_STATE.md`, `/exit`, relaunch `claude --continue`. Then import `SHIP-HANDOFF-IA-SHIFTNAV-v2.md` and this file before any Phase 1 work.

---

## P-6 · MASTER MANAGEMENT IS BURIED — needs one door under SYS

**Owner statement:** locating where the Master lives to delete it requires digging. Delete is PIN-gated (correct) but *finding it* should not be.

**Phase 0:** quote every current path to load / view / delete the Master, and the PIN gate.

**Ruling:** one door. **SYS (top-right, exists) → menu → MASTER** → shows loaded Master filename + saved date + source (uploaded / restored from cache) → actions: **Load / Replace** and **Delete (PIN)**. All other paths to these actions close.

**Ship:** SYS menu gains MASTER entry; the old paths are removed, not hidden. Door ledger: +1 (SYS→MASTER), −N (every old path; list them).

**Verify:** cold launch → SYS → MASTER → see name/date → Delete prompts PIN → wrong PIN refuses → correct PIN deletes → app returns to honest no-Master state with no fake CTAs.

---

## P-7 · CAGE NUT & RU MAP (Build → Reference) — close it

**Evidence:** a generic, empty 24U cage-nut diagram with its own "scan or type a rack ID to load a live elevation." Fourth rack picture; second path into rack detail.

**Phase 0:** quote the screen, its renderer, its entry points, and whether any device record carries cage-nut position data.

**Ruling:** delete the screen, its entry path, and its renderer. If cage-nut positions are real data, they become a line on the device row inside rack detail — not a screen.

**Door ledger:** −1 screen, −1 path, +0.

---

## P-8 · RACK PREVIEW CARD (BOM path) — close it

**Evidence:** pressing BOM shows a ~600px empty "RACK PREVIEW" card with an OPEN AISLE button and an OPS drop-down, then NEXT ACTION. Owner recalls the preview card was deleted in Ship A.

**Phase 0:** is this the Ship A preview card surviving on a second entry path, or a separate component? Quote it. Quote the OPS drop-down — is it the same ten-tool row rendered again?

**Ruling:** delete the card and every path that renders it. OPEN AISLE already exists on rack detail. The OPS drop-down is governed by IA-SHIFTNAV (the ten tools become rack-scoped actions or close) — do not re-home it here.

**Door ledger:** −1 card, −1 duplicate OPEN AISLE, −1 OPS drop-down.

---

## P-9 · BUILD TAB CONSOLIDATION — pattern, not one bug

BOM, Reference, Preview: three sub-screens under Build that are all "look at the rack" in different costumes. Under the rack model Build is **rack picker → rack detail**, nothing else. This is IA-SHIFTNAV v2 Phase 1's job; record it there as a hard requirement. P-7 and P-8 are the first two doors it closes.

---

## P-10 · 3D AISLE RACK FOCUS = FULL RACK STATE  *(the one place you look)*

**Owner statement:** click a rack in Forge · 3D Aisle and see everything about that rack — what's racked vs. not (with U positions), phase status (MECH/PWR/NET/COMP/VAL), blockers, assignee, last activity. Same rack object PHANTOM rack detail uses. Any U-position / cage-nut reference lives on the device here, not on a poster. One tap → work the rack in PHANTOM; one tap back (per RACK-ELEVATION-DEMOTE Addendum A).

**Phase 0:** how Forge's focused-rack panel reads data today; whether it shares the Master with dct-ios.html (Addendum A E-6); what rack-level state it lacks.

**Ruling:** one rack object, two lenses. Forge = look, PHANTOM rack detail = work. Neither shows a partial view.

**Ship slicing:** proposal after Phase 0. This is the spec that lets P-7, P-8, and the remaining elevation renderers close for good.

---

## SUGGESTED ORDER (owner may re-sequence)

1. **P-4** — .566, already specced, one command away
2. **P-5** — restart, import v2 + this file
3. **P-1** — assistant is dead; sandbox blocker; small ship
4. **P-2(a)** — honest label; tiny ship; data honesty
5. **P-6** — Master under SYS; small ship, big daily relief
6. **P-8 → P-7** — close two doors, cheap
7. **P-3** — amendment ruling once P-10 Phase 0 shows the renderer family
8. **P-10 → P-9** — IA-SHIFTNAV v2 Phase 1, with the comprehension gate (§6) first

---

## DOOR LEDGER — WHOLE LIST

| Item | Opens | Closes |
|---|---|---|
| P-1 | 0 | 1 (client-side fake lock) |
| P-2 | 0 | 0 (honesty fix) |
| P-6 | 1 (SYS→MASTER) | N (every scattered Master path) |
| P-7 | 0 | 2 (screen + path) |
| P-8 | 0 | 3 (card, dup OPEN AISLE, OPS drop-down) |
| P-10 | 0 net (Addendum A doors already counted) | remaining "look at rack" surfaces |

Net for the list: strongly negative. That is the point.

---

*Standing doctrine: graphify before work · evidence before patches · one visible change per ship · surgical edits against verified anchors · three-stamp lockstep · owner promotes · iPhone verify gates every stamp · no self-scheduling · a gauge that lies is worse than no gauge · a ship that opens a door closes at least one.*
