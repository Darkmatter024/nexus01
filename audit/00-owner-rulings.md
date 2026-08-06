# PHANTOM — Owner Rulings (this reconstruction)

Rulings made by John during the v1.14.394 architectural audit. These are **binding** and are not to be re-litigated or "improved" in implementation. Anything not listed here was decided by the Principal Integration Owner under the 2026-08-05 delegation directive.

---

## R-01 — Desktop composition: PROMOTE `.cshell` above 851px
**Date:** 2026-08-05 · **Owner words:** *"promote cshell above 851px"*

The desktop composition (`body.rd.cshell` — sidebar `:53719`, topbar `:53763`, dashboard grid `:54020`, desktop Build workspace `:53620`/`:53695`, collapsed-rail band `:53996`) currently ships dead: `.cshell` is applied **only** when the URL carries `?cshell=1`/`?shell=1` (`:18772`, `:18807`), so a bare-URL laptop or desktop never sees it.

**RULED: `.cshell` becomes the DEFAULT at ≥851px.**

Implementation constraints that follow from the ruling and from existing doctrine — not new decisions:

1. **851px is the breakpoint**, matching every existing `.cshell` media query (`:53527`, `:53620`, `:53719`, `:53996`). Do not invent a new one.
2. **Keep a rip-cord.** `?cshell=0` must force it off. The comment at `:18768` documents why a *sticky* preview was the `.380` trap — the anti-pattern is persistence, not the flag. The rip-cord must be per-URL and non-persisted, exactly like `?legacy=1` is not.
3. **Phone composition is untouched.** Below 851px nothing changes. This is additive at the top end only.
4. **`?legacy=1` stays byte-identical.** `.cshell` is a `body.rd` concern and must never apply in the legacy house.
5. **The 1500px clip must be fixed as part of this**, not after. `#cs-grid` `:54017` needs 1200px of column and gets 1198px at W=1500 (`1500 − 246 sidebar − 56 padding`), and `#cmd-shell{overflow-x:hidden}` `:53191` **clips** the deficit rather than scrolling it. Promoting `.cshell` to default turns a preview-only cosmetic defect into a shipping Rule-1 violation. Raise the 3-column breakpoint to 1520px or reduce `#cmd-shell` padding in the 1500–1599 band.
6. **Dead scroll runway must go.** Under `.cshell` the bottom nav is `display:none` `:53807`, but `.page` still carries `padding-bottom:calc(var(--rd-navclear)+20px)` `:1088` — 136px of empty runway on every desktop page. Currently invisible to users because desktop never ships; it ships now.
7. **Hard-coded layout literals get tokens.** `246`/`82` (sidebar width) appear at 3 sites each, `76` (topbar height) at 2. These are the same drift class as `--rd-navclear` (see audit 05 §C5). Introduce `--cs-side-w` / `--cs-top-h` and let the clearance terms read them, so the strips cannot go stale.

**Verification:** the owner's device pass must cover 851px, 1024px, 1440px, **1500px and 1501px specifically** (the clip boundary), and 1600px — plus a phone pass to prove nothing below 851px moved.

**Status:** RULED, not yet implemented. Scheduled into the reconstruction plan; will not ship as a standalone patch.
