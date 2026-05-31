# AGENTS.md for /Users/massif/unscaled

## Working Style

- Use multi-agent work when it materially helps, especially for parallel read-only review, browser QA, or independent verification. Keep delegated tasks bounded and avoid having multiple agents edit the same file.
- Do not treat `gh auth status` as proof that the GitHub CLI token works or fails. Verify GitHub access through real operations such as `gh api`, `git push`, `gh pr create`, and `gh pr view`.
- When writing code, avoid excessive fallback paths, broad defensive wrappers, and abstractions that do not remove real complexity.
- Default to carrying implementation work through to a verifiable endpoint: code change, local checks, local run, browser confirmation, commit, push, and PR when requested.
- If the user asks to create a PR, complete the full branch, commit, push, draft PR, and live PR verification flow unless they explicitly narrow the scope.

## Visual Direction

- Preserve the current Unscaled identity: restrained editorial feel, light background, Montserrat typography, petrol / instrument green signal color, and low-saturation gray particle network.
- Do not turn the site into a generic SaaS, AI startup, or marketing landing page. Avoid purple or blue-purple gradients, decorative blobs, oversized hero cards, and unrelated ornamental effects.
- When changing brand color or the signal field visual system, check both:
  - `client/src/index.css`
  - `client/src/components/SignalField.tsx`
- Canvas constants in `SignalField.tsx` can drift from CSS tokens in `index.css`; update both when the visual system requires it.
- If the homepage style changes, proactively check secondary pages for consistency instead of stopping at the homepage.

## SignalField Rules

- The named signal nodes are the primary interaction layer. Preserve hover, tooltip, ripple, drag, click navigation, and touch behavior.
- Background particles may respond physically, but they should not compete visually with the named nodes.
- Prefer reusing the existing canvas particle physics (`dispX`, `dispY`, `velX`, `velY`, spring return) over introducing DOM elements or a second animation system.
- Keep background-particle interaction linear in the number of background particles. Do not add all-pairs background physics beyond the existing line-rendering pass.
- Touch handling should be conservative. Do not add effects that make mobile tapping or dragging harder to control.
- After particle physics changes, verify that:
  - mouse movement produces a visible but restrained response;
  - particles return to their anchors instead of drifting permanently;
  - named-node hover, click, and drag still work;
  - there is no obvious frame-rate regression.

## Local Validation

- Use the project package manager through Corepack:
  - `corepack pnpm run check`
  - `corepack pnpm run test`
  - `corepack pnpm run build`
  - `corepack pnpm run dev`
- Local dev server URL is usually `http://localhost:3000/`.
- If dependencies are missing, install them before concluding that checks fail.
- The dev server may need to run outside the sandbox if `tsx` fails to create its IPC pipe or otherwise hits a sandbox permission error.
- After frontend validation, stop the local dev server and confirm port `3000` is no longer listening.
- Existing analytics placeholder warnings can appear during build or dev startup. Unless the task is about analytics, treat them as unrelated existing configuration noise.

## Browser QA

- Frontend visual and interaction changes require rendered verification. Do not rely only on typecheck or build.
- Prefer the in-app Browser plugin when available. If the Browser automation interface is unavailable, state the failure and use the next best practical verification path.
- For visual or interaction changes, confirm at minimum:
  - the intended URL and title load;
  - the page is not blank;
  - there is no framework error overlay;
  - console output has no new relevant errors;
  - the target interaction works in the rendered page.
- User visual feedback is authoritative. If the user says an effect is too subtle or too strong after trying it, tune for the actual viewport experience.

## Git And PR Flow

- Use the `massif/` branch prefix by default.
- If currently on `main` or on a previous feature branch, create a fresh branch from the latest `origin/main` for new work unless the user asks otherwise.
- Stage only files that belong to the current task. Do not use broad staging when the working tree is mixed.
- Before committing or pushing, inspect:
  - `git status --short --branch`
  - `git diff --stat`
  - `git diff --check`
  - the relevant full diff
- PRs should be draft by default unless the user explicitly asks for a ready-for-review PR.
- PR bodies should cover what changed, why it changed, user impact, validation, and known residual risk or unrelated existing warnings.
- After PR creation, verify live PR state with `gh pr view`, including URL, `OPEN`, `isDraft`, base branch, head branch, and commit.

## Favicon And Asset Cache

- If the browser still shows old favicon or asset state, do not assume the source edit failed.
- First inspect the served file and asset URLs. Browser favicon cache can be stale even when files are correct.
- For favicon cache issues, version the icon hrefs in `client/index.html` with a query string.

## Communication

- Use Chinese when the user asks in Chinese.
- Keep progress updates short and concrete.
- Final reports should include changed files, validation commands, PR URL or local URL, and any known warnings or limits.
