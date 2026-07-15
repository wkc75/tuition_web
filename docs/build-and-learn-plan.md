# Build-and-Learn Plan — Tuition Centre Website
*Companion to `tuition-website-plan.md` (the spec). This doc is HOW you build it while learning.*
*v1.0 · 15 July 2026*

This document has three parts:
- **Part A** — Project Instructions: paste this into your new Claude Project's custom instructions, so every chat in that project knows the workflow.
- **Part B** — `CLAUDE.md`: put this file at the root of your repo, so Claude Code follows the same rules.
- **Part C** — The step-by-step build plan: 18 steps for Phase 1, then Phase 2 units. Each step = goal → what you'll learn → resources → definition of done → what to ask Claude.

---

# PART A — PROJECT INSTRUCTIONS (paste into the Claude Project)

```
PROJECT: Tuition centre website — build-and-learn

CONTEXT
I'm Kin Chong, a CS student at NUS building the website + platform for my tuition
business. The full spec is in this project's knowledge (tuition-website-plan.md).
Phase 1 = static marketing site (Next.js/TS/Tailwind, ship by 27 Jul).
Phase 2 = portal with auth, Postgres, FastAPI AI service (Aug–Dec).

MY GOAL IS TO LEARN, NOT JUST SHIP. I am building everything myself.

HOW YOU (CLAUDE) MUST WORK WITH ME — THE LOOP
For every step, follow this loop and do not skip stages:
1. BRIEF — Tell me which step from build-and-learn-plan.md I'm on, what I'm
   building, and WHY it's designed this way. Keep it under 300 words.
2. LEARN — Point me to the specific docs/tutorial sections I should read
   first (link + which sections). Don't dump code yet.
3. I BUILD — I write the code. You wait.
4. REVIEW — When I share my code, review it like a senior engineer:
   correctness first, then idioms, then style. Ask me questions that make
   me explain my choices ("why did you make this a server component?").
5. UNBLOCK — If I'm stuck >30 min, give a hint first, then a partial
   snippet, then a full solution ONLY if I explicitly say "just show me".

HARD RULES
- Never write a full feature for me unprompted. Hints before answers.
- When you do show code, explain every non-obvious line.
- Always tell me the step's Definition of Done and check my work against it.
- If I try to add features not in the spec, challenge me: "is this in the
  spec? which phase?" Scope creep is my known weakness.
- Track progress: start each session by asking which step I'm on, or check
  the checklist if I've shared it.
- Prefer official docs over random tutorials in your recommendations.
- Correct my misconceptions directly. Don't flatter bad code.

MY BACKGROUND (calibrate to this)
- Comfortable: programming fundamentals, some Python/Java from coursework,
  basic Git, basic React exposure, Node.js docx scripting.
- New to: Next.js App Router, TypeScript in practice, Tailwind, deployment,
  DNS, SEO, Prisma/Postgres, auth, Docker, FastAPI.
```

---

# PART B — CLAUDE.md (put at repo root for Claude Code)

```markdown
# CLAUDE.md

## What this repo is
Marketing site + (later) student/parent/teacher portal for a Singapore
tuition centre. Spec: docs/tuition-website-plan.md. Build plan:
docs/build-and-learn-plan.md.

## Owner's working mode — IMPORTANT
The owner is building this to LEARN. Default behaviour:
- EXPLAIN and SUGGEST, don't auto-implement. Only write code directly when
  the prompt starts with "implement:" — otherwise give guidance, hints, and
  reviews.
- When asked to implement, keep diffs minimal and explain each change.
- Never install a new dependency without stating why and getting a yes.
- Never touch files outside the current step's scope.

## Stack (do not deviate without discussion)
- Next.js 15 App Router, TypeScript strict, Tailwind, shadcn/ui
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
Update this line as you go → CURRENT STEP: 0
```

---

# PART C — STEP-BY-STEP BUILD PLAN

## How to read each step
**Goal** (what exists after) · **Learn** (concepts + resources, read BEFORE coding) · **Build** (the task) · **DoD** (definition of done — how you know you're done) · **Ask Claude** (good prompts for the project chat or Claude Code).

Time estimates assume reading included. Steps 0–13 = Phase 1 (target: 27 Jul). Don't parallelise; each step builds on the last.

---

## PHASE 1 — MARKETING SITE

### Step 0 — Environment & Git hygiene (1 h)
**Goal:** Node 20+ via nvm, pnpm, VS Code (or your editor) with ESLint+Prettier extensions, GitHub repo created, Claude Code installed and pointed at the repo.
**Learn:**
- Git basics refresher only if needed: https://git-scm.com/book (ch. 2)
- Claude Code docs: https://docs.claude.com/en/docs/claude-code
**Build:** empty repo with README, `.gitignore` (Node template), `docs/` folder containing the spec + this plan, CLAUDE.md from Part B.
**DoD:** `git push` works; Claude Code answers a question about the spec from inside the repo.
**Ask Claude:** "Review my CLAUDE.md — anything missing for how I want to work?"

### Step 1 — Next.js fundamentals + scaffold (3–4 h)
**Goal:** running Next.js app, and you understand what App Router actually is.
**Learn (this is the big one — do it properly):**
- Official Next.js Learn course, chapters 1–7 (setup, layouts, pages, navigation, fonts/images): https://nextjs.org/learn
- App Router routing docs: https://nextjs.org/docs/app/building-your-application/routing
- Server vs Client Components (read twice, it's the #1 confusion): https://nextjs.org/docs/app/building-your-application/rendering/server-components
**Build:** `pnpm create next-app` with TS + Tailwind + ESLint. Create empty routes matching the Phase 1 sitemap (`/`, `/about`, `/programmes`, `/fees`, `/resources`, `/results`, `/faq`, `/contact`, `/privacy`, `/terms`). Each just renders its name.
**DoD:** `pnpm dev` shows all routes; you can explain to Claude the difference between `layout.tsx` and `page.tsx`, and why a page is a server component by default.
**Ask Claude:** "Quiz me on server vs client components with 5 scenarios from my own sitemap."

### Step 2 — Deploy on day one (1 h)
**Goal:** the empty shell is live on the internet. Deploy early so deployment is never scary later.
**Learn:**
- Vercel deploy docs: https://vercel.com/docs/deployments
- What DNS actually is (you'll connect the domain here): https://www.cloudflare.com/learning/dns/what-is-dns/
**Build:** connect repo to Vercel; buy domain; point DNS; every push to `main` auto-deploys.
**DoD:** your domain serves the app over HTTPS; a pushed change appears within minutes.
**Ask Claude:** "Explain what just happened between my domain registrar, DNS, and Vercel like I'm going to be asked in an interview."

### Step 3 — TypeScript content model (2–3 h)
**Goal:** `src/config/site.config.ts` with typed `Programme`, `Testimonial`, `FAQ` structures (shapes are in the spec §1.6) and REAL content — this is milestone M1, copy before code.
**Learn:**
- TypeScript handbook: Object Types, Union Types, Literal Types: https://www.typescriptlang.org/docs/handbook/2/objects.html
**Build:** define the types, then fill in actual programme copy, fees, schedule, FAQs, your story outline, testimonials (initials + consent flag). Writing the copy will take longer than the types — that's expected and correct.
**DoD:** `pnpm typecheck` passes; another person could read the config and understand your entire offering; zero placeholder text.
**Ask Claude:** "Critique my programme descriptions as a skeptical Singaporean parent. What's vague? What's missing that the spec's programme-page template needs?"

### Step 4 — Layout shell: header, footer, WhatsApp FAB (3 h)
**Goal:** shared layout with nav, footer, and the sticky WhatsApp button on every page.
**Learn:**
- Tailwind core concepts (utility-first, responsive prefixes, flex/grid): https://tailwindcss.com/docs/styling-with-utility-classes and https://tailwindcss.com/docs/responsive-design
- Next.js layouts: https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates
**Build:** root layout with `<Header/>`, `<Footer/>`, `<WhatsAppFab/>`. The FAB builds a `wa.me` URL whose pre-filled text includes the current page's programme (pass via props) — F1 in the spec.
**DoD:** FAB visible on every route at 375 px width without covering content; tapping it on your actual phone opens WhatsApp with correct pre-filled text.
**Ask Claude:** "Review my FAB — does the wa.me link need to be a client component? Why or why not?"

### Step 5 — Mobile-first home page (4 h)
**Goal:** the real home page per spec: hero, proof strip, programmes grid, story teaser, CTA.
**Learn:**
- Responsive design mental model: https://web.dev/learn/design/
- Next.js `<Image>` (you'll use it everywhere): https://nextjs.org/docs/app/api-reference/components/image
**Build:** build at 375 px first, then adapt up with `md:`/`lg:` prefixes. Content comes from the config, not hard-coded strings.
**DoD:** looks right on your phone and laptop; no horizontal scroll at any width; Lighthouse mobile ≥ 85 already.
**Ask Claude (Claude Code):** "Audit my home page for hard-coded content that should live in site.config.ts."

### Step 6 — Programme page template (4 h)
**Goal:** ONE component that renders all four programme pages from config — the money pages.
**Learn:**
- Dynamic routes + `generateStaticParams`: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- `generateMetadata` for per-page SEO: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
**Build:** `/programmes/[slug]/page.tsx` implementing the 9-section template from spec §1.4, fully driven by the config object. Static params from config slugs.
**DoD:** all four pages render with correct fees/schedule inline; adding a fifth programme to config creates a page with zero new code; each page has a unique `<title>` matching the keyword pattern.
**Ask Claude:** "Explain what generateStaticParams did to my build output. Show me where in `.next/` the static HTML lives."

### Step 7 — Remaining static pages (4 h)
**Goal:** About (story + YouTube embed), Fees table, Results/testimonials, FAQ accordion, Privacy, T&Cs, 404.
**Learn:**
- shadcn/ui installation + Accordion component: https://ui.shadcn.com/docs
- Lazy-loading embeds (why a raw YouTube iframe tanks performance): https://web.dev/articles/iframe-lazy-loading
**Build:** the six pages + `not-found.tsx`. Only render testimonials where `consentOnFile === true`.
**DoD:** nothing on the site says "coming soon"; FAQ accordion keyboard-accessible; story video plays on mobile data.
**Ask Claude:** "Draft the privacy policy and T&Cs from the spec's requirements (PDPA consent, make-up/refund/recording policies) — then walk me through what each clause means." *(This is a case where Claude writing the draft is right — it's legal boilerplate, not learning material. Have a lawyer or at least a careful read pass over it.)*

### Step 8 — Enquiry form + serverless handler (4–5 h) — first backend code
**Goal:** working `/contact` form: POST → Route Handler → Telegram message to you + row in Google Sheet. This is F2 + your enquiry log (US-09).
**Learn:**
- Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- React form state + controlled inputs (client component!): https://react.dev/learn/reacting-to-input-with-state
- Telegram Bot API sendMessage (simplest webhook-ish integration you'll ever do): https://core.telegram.org/bots/api#sendmessage
- Environment variables in Next: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
**Build:** form with name/level/subject/phone + PDPA consent checkbox (blocks submit); server-side validation (never trust the client); `/api/enquiry` calls Telegram + Sheets; success and error states in the UI.
**DoD:** submitting on your phone makes your other phone buzz with the Telegram message; row appears in Sheet with `source` column; submitting garbage returns a clean 400, not a crash.
**Ask Claude:** "I'm going to explain my request flow from button tap to Telegram message. Correct me where I'm wrong." *(Teaching it back is the test.)*

### Step 9 — UTM capture (2 h)
**Goal:** `?utm_source=tiktok` on any landing page flows into both the WhatsApp pre-fill and the form payload.
**Learn:**
- `useSearchParams` and why it forces client components: https://nextjs.org/docs/app/api-reference/functions/use-search-params
- sessionStorage (persist source across page navigation): https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
**Build:** tiny hook `useTrafficSource()` — reads UTM on landing, stores it, exposed to FAB + form.
**DoD:** land on `/?utm_source=test`, navigate to a programme page, tap WhatsApp → pre-filled text contains `test`.
**Ask Claude:** "Review my hook for the case where a user lands with no UTM at all, and for SSR/hydration pitfalls."

### Step 10 — Analytics (2 h)
**Goal:** GA4 events on every CTA; Vercel Analytics on.
**Learn:**
- GA4 for SPAs/Next: https://developers.google.com/analytics/devguides/collection/ga4
**Build:** GA4 via `@next/third-parties`, fire `cta_whatsapp_click` / `enquiry_submit` events with programme + source params.
**DoD:** you can see your own test events in GA4 Realtime.
**Ask Claude:** "What's the difference between GA4 events and Vercel Analytics, and why do I want both?"

### Step 11 — SEO pass (3 h)
**Goal:** the site is legible to Google.
**Learn:**
- Next metadata API (you touched it in step 6 — now finish it): https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- JSON-LD structured data basics: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Console tour: https://developers.google.com/search/docs/monitor-debug/search-console-start
**Build:** per-page titles/descriptions, OG image, `sitemap.ts`, `robots.ts`, LocalBusiness+EducationalOrganization JSON-LD, GSC verification + sitemap submission, Google Business Profile created and linked.
**DoD:** Rich Results Test passes; GSC shows sitemap accepted; every page title follows "{Subject} Tuition Singapore …".
**Ask Claude:** "Explain what Google does with my JSON-LD and when I should expect indexing. What's realistic?"

### Step 12 — Performance & accessibility hardening (2–3 h)
**Goal:** Lighthouse mobile ≥ 90 across the board.
**Learn:**
- Core Web Vitals, what each metric means: https://web.dev/articles/vitals
**Build:** run Lighthouse, fix what it flags (usually: image sizing, font loading, unused JS, contrast, missing labels).
**DoD:** ≥ 90 performance/accessibility/SEO on mobile for `/`, one programme page, `/contact`.
**Ask Claude (Claude Code):** "Here's my Lighthouse JSON. Triage the top 3 fixes by impact and explain the mechanism behind each."

### Step 13 — Launch (1 h) 🚀
**Goal:** run the spec §1.9 go/no-go checklist, then send the link to existing families + update social bios.
**DoD:** every checklist box ticked, first real enquiry logged.
**Ask Claude:** "Run through the launch checklist with me item by item; I'll confirm each."

**Phase 1 skills you can now honestly claim:** Next.js App Router, TypeScript, Tailwind, serverless functions, third-party API integration, DNS/deployment, SEO, web performance.

---

## PHASE 2 — PLATFORM (semester-paced units, Aug–Dec)

Same loop applies. Units are bigger; expect 1–2 weeks each at 6–8 h/week. Full requirements are in spec Part 2 — this lists the learning path.

### Unit 14 — SQL & data modelling before any code (1 wk)
**Learn:** SQLBolt end-to-end (https://sqlbolt.com) · Prisma "concepts" docs (https://www.prisma.io/docs/orm/overview) · read spec §2.6 model and, for each table, answer: why is this its own table?
**Build:** Supabase project (SG region); translate spec schema into `schema.prisma`; first migration; seed script with fake students/classes.
**DoD:** you can draw the ER diagram from memory and defend the `GuardianLink` many-to-many; `prisma studio` shows seeded data.

### Unit 15 — Auth + RBAC (2 wks) — the hardest and most valuable unit
**Learn:** Auth.js v5 docs (https://authjs.dev) · OWASP broken access control (https://owasp.org/Top10/A01_2021-Broken_Access_Control/) · JWT vs session mental model.
**Build:** email-OTP login; `role` on the session; middleware protecting `/app/*` route groups; server-side ownership checks; teacher-provisioned invites (no self-signup).
**DoD:** write the authz test matrix (role × resource) FIRST, then make every cell pass. Student A cannot fetch student B's anything — prove it with a failing-then-passing test.

### Unit 16 — Materials portal (1–2 wks)
**Learn:** Supabase Storage + signed URLs (https://supabase.com/docs/guides/storage) · file upload patterns in Next.
**Build:** teacher upload scoped to class; student dashboard lists materials for enrolled classes only; signed URLs expire.
**DoD:** spec 2a exit criterion — a real student logs in and downloads this week's notes.

### Unit 17 — Attendance, scores, parent dashboard, fees (2–3 wks)
**Learn:** mostly applying what you know; new: chart rendering (Recharts) for score trends.
**Build:** P5–P8, P11 from spec.
**DoD:** spec 2b exit criterion — a real parent checks scores without messaging you.

### Unit 18 — FastAPI + Docker (1–2 wks)
**Learn:** official FastAPI tutorial, full pass (https://fastapi.tiangolo.com/tutorial/) · Docker getting-started (https://docs.docker.com/get-started/) · deploy a hello-world container to Fly.io/Railway.
**Build:** `/ai` service: health endpoint, service-token auth from the Next app, OpenAPI docs live.
**DoD:** Next app calls the deployed Python service and renders the response.

### Unit 19 — RAG + doubt-clearing copilot (2–3 wks)
**Learn:** Anthropic API docs (https://docs.claude.com) · pgvector basics (https://supabase.com/docs/guides/ai) · what embeddings are (any short primer; then explain it back to Claude).
**Build:** embed your chapter summaries into pgvector; question pipeline per spec A1 (student Q → retrieve → Claude draft → teacher inbox → approve → send); name-stripping before every API call (PDPA N7).
**DoD:** 20-question eval fixture graded; drafts grounded in YOUR notes, not generic answers.

### Unit 20 — Report narratives + polish (1–2 wks)
**Build:** A2 monthly reports; CI (GitHub Actions: typecheck, lint, test, migrate-diff); audit logging on grade edits.
**DoD:** spec 2c exit criterion; CI green badge on the repo.

---

## Working rhythm that makes this stick

1. **One step at a time, in order.** The order is the pedagogy.
2. **Read before you code** — the Learn links are 20–60 min each, not optional.
3. **Teach it back.** After each step, explain what you built to Claude and ask it to poke holes. If you can't explain it, you copied it.
4. **Commit per step** with a message describing what you learned, not just what changed.
5. **When stuck:** 30 min of genuine effort → ask Claude for a hint → hint → partial → full solution only on explicit request. Struggling is the point; drowning is not.
6. **Timebox Phase 1 hard.** Shipped and imperfect on 27 Jul beats perfect and unshipped. Phase 2 is where craftsmanship pays.