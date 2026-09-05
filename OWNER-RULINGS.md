# OWNER-RULINGS.md

Dated register of owner rulings. **`CLAUDE.md` carries the standing law; this file is the record of
the rulings that changed it.** Where the two disagree, the newest ruling here wins and `CLAUDE.md`
is stale until edited. Newest first.

---

## 2026-09-05 · PROMOTE IS OWNER-ONLY. The 2026-08-30 amendment is REVOKED.

**Ruling, verbatim:**

> The 2026-08-30 amendment is revoked. Promote is owner-only from now on: never move release, in any
> mode, unless I explicitly order that specific promote in that session. Log the revocation in
> OWNER-RULINGS.md. The promote.ps1 from the scripts ship becomes the only promote path, and it runs
> from my terminal.

### What this revokes

`CLAUDE.md` § *Branch topology — SHIP-GATE-LOCKDOWN*, the block headed
**"⭐ AMENDED 2026-08-30 — CLAUDE CODE MAY PROMOTE."** That amendment permitted Claude Code to run
`git checkout release; git merge --ff-only main; git push origin release; git checkout main` on its
own judgement. **It no longer holds.**

### What triggered it

`release` moved twice inside 24 hours without the owner running a promote:

| Ref move | Time | By |
|---|---|---|
| `e78f0b2 → 2000e02` | 2026-09-05 07:46:02 -0500 | Claude Code |
| `2000e02 → 9cac936` | 2026-09-05 08:26:58 -0500 | Claude Code |

Both were fast-forwards performed by Claude Code on an explicit in-session instruction, and both
were reported at the time. An audit confirmed **no automation moved the branch**: no
`.github/workflows/`, no active `.git/hooks/`, `tools/githooks/pre-commit` contains no
push/merge/checkout, and the only repo-wide matches for `--ff-only` / `push origin release` are
documentation in `CLAUDE.md:146` and comments in `tools/hooks/phantom-guard.js`.

⚠ Not audited from this box: **GitHub-side** branch protection or auto-merge on `release`. `gh` is
not installed here; that check has to come from the owner's terminal.

The ruling is not a finding of unauthorised action. It removes the discretion itself, so the
question cannot arise again.

### The standing rule

1. ⛔ **Claude Code never moves `release`. In any mode.** No `merge --ff-only`, no push to
   `release`, no branch reset, no exception for "it is only a fast-forward".
2. The 2026-08-27 lockdown's original gates are untouched and still absolute: **`VERIFIED` is
   owner-only**, and **the device verify is the owner's**.
3. A push to `main` changes nothing on the iPhone. Claude Code ships to `main`, reports, and
   **parks**. Reaching the phone is the owner's step.

### ⚠ Reported, not resolved — two clauses that do not fully agree

The ruling says *"unless I explicitly order that specific promote in that session"* (an in-session
escape hatch) **and** *"promote.ps1 … runs from my terminal"* (a mechanism only the owner can
operate). Read together, the escape hatch has no mechanism Claude Code could use.

**Claude Code's operating reading, pending the owner's correction: it never moves `release`, full
stop.** An in-session order to promote is answered by handing the owner the `promote.ps1` command
to run, not by running it. If the owner meant the escape hatch to authorise Claude Code to promote
directly when named, he strikes this paragraph.

### ⛔ `promote.ps1` does not exist yet

As of 2026-09-05 the repo contains **no `.ps1` files at all**, no `promote.ps1`, and no document
referencing it or the "scripts ship". Naming it "the only promote path" therefore means **there is
currently no promote path**, and the next ship cannot reach the phone until that ship lands.
Writing it is new scope and needs an explicit GO.

### Stale instruction hazard

`CLAUDE.md` still carries the revoked *"CLAUDE CODE MAY PROMOTE"* amendment, and `CLAUDE.md` is what
a fresh session reads at startup. **Until that block is edited, a future session will read
permission this ruling removed.** Flagged to the owner; not edited unasked.
