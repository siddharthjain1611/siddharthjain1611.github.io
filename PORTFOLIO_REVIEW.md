# Local portfolio review

## What changed

- Rebuilt the homepage around Growth KAM, the hyperlocal MVP, and evidence-linked product principles.
- Replaced simulated live metrics and terminal navigation with a readable, responsive editorial layout.
- Added the Growth KAM design case and a browser-based policy prototype using synthetic accounts.
- Added a hyperlocal research-to-MVP retrospective, with reconstructed sections labeled explicitly.
- Rewrote the four legacy case URLs as archived independent explorations; removed their unsupported outcomes and corrected their central reasoning issues.
- Added a printable experience summary that omits unreconciled performance figures. Original resume files are preserved and are no longer the primary portfolio download.
- No company systems are connected. No customer data, credentials, or internal source documents are copied into this project.

## Evidence and assumptions to reconcile before publication

| Area | Current treatment | Needed to strengthen the final narrative |
|---|---|---|
| Growth KAM | Product design and interactive prototype; no production claim | Deployment stage, actual users, individual ownership, and measured outcomes |
| Growth KAM decisions | Grounded in working product documents and onboarding iterations | Confirm which decisions were adopted and which remain proposals |
| Hyperlocal market research | User-confirmed use of LCV purchases, competitor revenue, and vehicle earnings | Dated sources, resulting estimate and ranges, exact serviceable-market definition |
| Hyperlocal MVP | User-confirmed launch | Geography, scope, dates, responsibilities, and launch evidence |
| Hyperlocal leadership | Explicitly marked working reconstruction | Specific disagreement, people’s roles, decision, and consequence |
| Hyperlocal failure | Explicit analytical failure mode, not a claimed historical event | What actually went wrong, what changed, and the result |
| Role/title | Conservative Product Management wording | Exact current title, promotion date, and scope |
| Prior numerical claims | Removed from the active site | Numerators, denominators, periods, baselines, causal attribution, revenue definitions |
| Existing resume artifacts | Preserved, not linked as the main download | Reconcile before reintroducing as public hiring material |

The user permitted working assumptions for the local draft. These are labeled; they are not represented as validated employment or performance facts.

## Prototype scope

The lab executes a deterministic policy and prepares a template-based conversation brief. It does not use an LLM, make calls, or execute account actions. A model-backed calling demo would need its own inference integration, evaluated conversations, and suitable credentials/runtime; it is not silently simulated here.

The policy uses an illustrative cadence threshold: twice the account’s usual order interval, with a seven-day floor. This is not a calibrated production rule. Contact state, incident state, replay status, and experiment assignment are supplied synthetic inputs. There is no durable queue or production state implementation.

## Validation

- `node --test tests/kam-policy.test.mjs`: 28 fixed scenarios and six invariant/behavior tests.
- Scenario report: `assets/kam-evaluation-report.json`.
- In-browser checks run the same explicit scenario labels against the current policy.
- Local HTML asset and fragment references checked across all nine pages.
- CSS includes mobile layouts, visible keyboard focus, reduced-motion behavior, print styles, and semantic form controls.
- No browser interaction or screenshot QA was performed in this implementation turn.

## Review locally

Serve the repository over HTTP (ES modules need HTTP):

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`. No deployment, Git commit, or push is needed.

## Second pass: career specificity

- Restored the **resume-reported** 200+ research sessions and six-month hyperlocal MVP timeline. The homepage, case, and experience summary identify their provenance and pending reconciliation. They are not independently verified metrics or causal impact estimates.
- Restored the separate enterprise B2B workstream's resume-reported squad size of 12 in the experience summary; it is not attributed to the hyperlocal launch.
- Added one-minute case summaries distinguishing ownership, delivered artifacts, and outcomes.
- Added the documented Growth KAM timing-analysis corrections and the user's concrete onboarding reconfirmation feedback. The dialogue comparison is illustrative, not a real transcript.
- Added a reconstructed market-model worksheet and MVP boundary. No historical market-size estimate, stakeholder conflict, or business result was invented.
- Restored the UrbanInteriors manual-matching detail from the original portfolio.

These changes strengthen the career narrative but do not resolve missing primary evidence for production Growth KAM adoption or hyperlocal commercial outcomes. A true historical hyperlocal failure/leadership narrative still needs the user's specific account. The existing policy demo remains deterministic; no live inference integration was added.
