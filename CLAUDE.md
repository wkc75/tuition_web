# CLAUDE.md

## What this repo is
Marketing site + (later) student/parent/teacher portal for a Singapore
tuition centre. Spec: docs/tuition-website-plan.md. Build plan:
docs/build-and-learn-plan.md. Task tracker: docs/build-checklist.md —
the next unticked box is always the current task.

## Owner's working mode — IMPORTANT
The owner is building this to LEARN. Default behaviour:
- EXPLAIN and SUGGEST, don't auto-implement. Only write code directly when
  the prompt starts with "implement:" — otherwise give guidance, hints, and
  reviews.
- When asked to implement, keep diffs minimal and explain each change.
- Never install a new dependency without stating why and getting a yes.
- Never touch files outside the current step's scope.

## Stack (do not deviate without discussion)
- Next.js 16 App Router, TypeScript strict, Tailwind v4, shadcn/ui
  (spec says 15; scaffold came out on 16 — do not downgrade)
- Content lives in src/config/site.config.ts — no CMS
- Phase 2 only: Prisma + Supabase Postgres, Auth.js v5, FastAPI service in /ai
- Package manager: pnpm

## Conventions
- Components: src/components/, PascalCase files
- Pages: App Router file conventions, one route group (marketing) for Phase 1
- No `any`. No client components unless interactivity requires it.
- Commits: conventional (feat:, fix:, chore:), one step per PR/commit batch

## Commands
- pnpm dev / pnpm build / pnpm lint / pnpm typecheck

## Current status
Update this line as you go → CURRENT STEP: 2