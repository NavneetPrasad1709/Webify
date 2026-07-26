# GEMINI.md

Read and follow all instructions in `./AGENTS.md` — that is the single source of truth for this project (tech stack, commands, and the full audit checklist).

Antigravity-specific notes:
- Use the browser sub-agent to actually load webify.org.in (or the local dev server) and visually verify Core Web Vitals, mobile layout, and broken links/CTAs rather than only reading code.
- If quota runs low on Claude models mid-task, switch to Gemini for the audit/report pass (read-only) and reserve Claude for the fix-implementation pass, or continue in Claude Code where the Max plan applies.
- Keep this file thin — do not add project rules here. Add them to `AGENTS.md` so Claude Code and any other tool stay in sync.
