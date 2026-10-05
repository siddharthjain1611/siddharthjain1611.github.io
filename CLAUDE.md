# siddharthjain1611.github.io (Product Portfolio) — context (imported from Codex, 2026-09-18)

Personal product portfolio site, redesigned with Codex toward an AI PM / big-tech PM positioning. **This is a git repo — all redesign work below is local-only, nothing has been committed or pushed.**

Full prior chat transcript: [codex-chats/Product_Portfolio.md](codex-chats/Product_Portfolio.md)

## Why the redesign happened

Initial review flagged real credibility problems in the old site:
- Case studies blurred shipped work, prototypes, and pure proposals (e.g. cards said "Abstracted Case" while claiming precise outcomes like "18% reduction in zero-dispatch rate").
- The AI-evaluation case had an architectural hole: it claimed the generator and evaluator run independently with "no data dependency," which makes it impossible for the evaluator to check the generated answer for policy violations.
- Arithmetic/metric-definition inconsistencies (e.g. 50 projects/month × ₹7.5L AOV ≈ ₹3.75Cr, but revenue was stated as ₹37.5L with no explanation).
- Homepage had a fake "Live" dashboard (hardcoded values, randomly incrementing order counter with a rendering bug showing "18,18,252") and auto-scroll-to-terminal on load.

## What changed (local only, dev server at `http://127.0.0.1:4173/`)

- Repositioned around: **logistics products + applied AI** (dropped competing marketplace/fintech/ad-tech framing).
- Removed the simulated live dashboard and the terminal-first landing experience.
- Rebuilt around two flagship cases per the user's explicit direction:
  1. **AI Growth KAM** — used as both the "shipped work" case and the "AI demo with defensible evaluations" case. Includes an interactive **KAM decision lab**: change an account's context (supply incident / existing KAM owner / already reordered / missing permission) and see the routing decision change live. Demo runs **real policy rules against synthetic accounts — it does not call a live AI model.** 28 synthetic scenarios + 6 broader edge-case checks, all passing (34 total), with downloadable results.
  2. **Hyperlocal research → MVP launch** — used as the failure-analysis/leadership case. Built around LCV-purchase market sizing, competitor revenue, and per-vehicle economics research, leading to an MVP launch. User explicitly said to **assume some things** here since full source material wasn't provided — treat hyperlocal specifics as working assumptions pending real detail.
- Restored two scope claims from the resume with attribution (not presented as independently verified): **200+ research sessions**, **six-month MVP launch timeline**.
- Added a documented Growth KAM correction story (returner-only analysis distorted call timing) pulled from the real Growth Agent working docs.
- New interactive resume at `resume.html` — four expandable decision cards (Hyperlocal MVP, Enterprise B2B, Growth KAM, UrbanInteriors), each revealing contribution/decision/evidence on expand. Keyboard-accessible, mobile-responsive, print-to-PDF friendly.
- Explored and rejected: full horizontal-scroll layout (kept vertical; only a short horizontal career-stage strip — Urban Ladder → Delhivery → Applied AI — was considered acceptable).
- Explored and reworked: a background mascot animation. Went through several iterations — parcel-carrying robot → floating scroll-follow widget (rejected, "doesn't make sense") → **final: large, faint, non-logistics robot(s) in the page background, moving subtly with scroll, no buttons/labels/reserved sidebar**, full content width preserved. Reduced-motion support included throughout.
- Considered but only partially built: a "Decision Console" UI (developer-tool-styled panel showing product reasoning/decision logs) as a more distinctive alternative to the earlier Claude-Code-IDE-styled homepage element — check current homepage for whether this was actually implemented.

## Review notes / evidence gaps

See `PORTFOLIO_REVIEW.md` in this folder for the full list of unresolved evidence gaps the redesign explicitly labeled (working assumptions, unverified production KAM results, hyperlocal specifics still reconstructed rather than sourced).

## Open / unresolved

- **Nothing has been committed or pushed to git** — review the working tree before doing so.
- Hyperlocal case still needs the user's actual market-sizing conclusion, MVP scope decision, a real stakeholder-tension anecdote, and a real launch-learning moment — currently reconstructed/assumed.
- Growth KAM case still lacks real deployment/adoption/production-result evidence — currently a design case, not a proven shipped case.
- Confirm whether the "Decision Console" homepage element was actually built or only proposed.
