# Build Checklist — tick one box at a time

Granular decomposition of [build-and-learn-plan.md](build-and-learn-plan.md). That doc holds the WHY and the Learn links; this one holds the next thing to build.

**How to work each box:**
1. Read the parent step's **Learn** links in build-and-learn-plan.md first.
2. Build the one item yourself.
3. Check it against the section's DoD.
4. Ask Claude for a review before ticking.
5. Commit per section (conventional message), update `CURRENT STEP:` in CLAUDE.md.

---

## PHASE 1 — MARKETING SITE (target: 27 Jul 2026)

### 0 — Finish setup *(Step 0/1 leftovers)*
- [ ] Move app from `my-app/` to repo root, adopt `src/` layout (`src/app/`, `src/components/`, `src/config/`)
- [ ] Add `"typecheck": "tsc --noEmit"` script; verify `strict: true` in tsconfig
- [ ] Delete scaffold boilerplate (demo page content, unused SVGs)
- [ ] Commit: `chore: scaffold next app`

> Note: scaffold is Next 16 (spec said 15 — no downgrade, spec amended).

### 1 — Route skeleton *(Step 1)*
One stub per route, each just rendering its name:
- [ ] `/` · [ ] `/about` · [ ] `/programmes` · [ ] `/programmes/[slug]` · [ ] `/fees` · [ ] `/resources` · [ ] `/results` · [ ] `/faq` · [ ] `/contact` · [ ] `/privacy` · [ ] `/terms` · [ ] `not-found.tsx`
- [ ] Learning check: can explain `layout.tsx` vs `page.tsx`, and why pages are server components by default

**DoD:** `pnpm dev` shows all routes.

### 2 — Deploy *(Step 2)*
- [ ] Vercel project connected to repo
- [ ] Domain bought
- [ ] DNS pointed; HTTPS works
- [ ] Push to `main` auto-deploys within minutes

### 3 — Content model *(Step 3 — copy before code, milestone M1)*
- [ ] `Programme` type · [ ] `Testimonial` type · [ ] `FAQ` type · [ ] `siteConfig` export
- [ ] Copy: o-level-a-math · [ ] o-level-e-math · [ ] o-level-physics · [ ] h2-math
- [ ] Fees + schedule data · [ ] FAQs · [ ] Story outline · [ ] ≥3 testimonials with `consentOnFile`

**DoD:** `pnpm typecheck` passes; zero placeholder text; a stranger could read the config and understand the whole offering.

### 4 — Layout shell *(Step 4)*
- [ ] `Header` (nav from config + mobile menu)
- [ ] `Footer`
- [ ] `WhatsAppFab` (builds `wa.me` URL, page context via props — F1)
- [ ] Wired into root layout

**DoD:** FAB visible on every route at 375px without covering content; opens WhatsApp with correct pre-fill on a real phone.

### 5 — Home page *(Step 5 — build at 375px first)*
- [ ] Hero · [ ] Proof strip · [ ] Programmes grid · [ ] Story teaser · [ ] CTA

**DoD:** no horizontal scroll at any width; Lighthouse mobile ≥ 85; all content from config.

### 6 — Programme template *(Step 6 — the money pages)*
- [ ] Dynamic route + `generateStaticParams` from config slugs
- [ ] `generateMetadata` (unique title per page, keyword pattern)
- [ ] §1 H1 with search keyword · [ ] §2 who it's for · [ ] §3 how classes run · [ ] §4 syllabus map · [ ] §5 sample material · [ ] §6 schedule + fees inline · [ ] §7 tutor block · [ ] §8 testimonials · [ ] §9 trial CTA

**DoD:** adding a 5th programme to config creates a full page with zero new code.

### 7 — Static pages *(Step 7)*
- [ ] `/programmes` overview grid
- [ ] `/about` + lazy YouTube embed
- [ ] `/fees` table
- [ ] `/results` (render only `consentOnFile === true`)
- [ ] `/faq` accordion (shadcn — first new dependency, keyboard-accessible)
- [ ] `/privacy` · [ ] `/terms` *(Claude drafts these — legal boilerplate carve-out; read them carefully)*
- [ ] `not-found.tsx` routing to `/programmes`

**DoD:** nothing says "coming soon"; video plays on mobile data.

### 8 — Enquiry funnel *(Step 8 — first backend code)*
- [ ] Form client component: name/level/subject/phone + PDPA checkbox that blocks submit
- [ ] `/api/enquiry` route handler with server-side validation
- [ ] Telegram `sendMessage` call
- [ ] Google Sheets append (with `source` column)
- [ ] Success + error states in UI
- [ ] Env vars set locally and in Vercel

**DoD:** phone submit → Telegram buzz + Sheet row; garbage input → clean 400, not a crash.

### 9 — UTM capture *(Step 9)*
- [ ] `useTrafficSource()` hook (read UTM on landing, sessionStorage)
- [ ] Wired into FAB pre-fill
- [ ] Wired into form payload

**DoD:** land on `/?utm_source=test`, navigate to a programme, tap FAB → "test" in the message.

### 10 — Analytics *(Step 10)*
- [ ] GA4 property + `@next/third-parties`
- [ ] `cta_whatsapp_click` event (programme + source params)
- [ ] `enquiry_submit` event
- [ ] Vercel Analytics on

**DoD:** your own test events visible in GA4 Realtime.

### 11 — SEO *(Step 11)*
- [ ] Per-page titles/descriptions ("{Subject} Tuition Singapore …")
- [ ] OG image
- [ ] `sitemap.ts` · [ ] `robots.ts`
- [ ] JSON-LD: LocalBusiness + EducationalOrganization
- [ ] GSC verified + sitemap submitted
- [ ] Google Business Profile created and linked

**DoD:** Rich Results Test passes; GSC shows sitemap accepted.

### 12 — Hardening *(Step 12)*
- [ ] Lighthouse on `/`, one programme page, `/contact`
- [ ] Fix flagged items until ≥ 90 performance/accessibility/SEO on mobile

### 13 — Launch *(Step 13)* 🚀
- [ ] Run spec §1.9 go/no-go checklist item by item
- [ ] Send link to existing families; update TikTok/IG bios with `?utm_source=tiktok`

---

## ⛔ GATE — do not start Phase 2 until Phase 1 is launched AND the founding-batch push is done (Part 0 rules of engagement)

## PHASE 2 — PLATFORM (Aug–Dec 2026, ~6–8 h/wk)

### 14 — Data layer *(Unit 14, 2a)*
- [ ] SQLBolt completed end-to-end (learning gate)
- [ ] Supabase project, SG region
- One model at a time from spec §2.6: [ ] `User`+`Role` · [ ] `StudentProfile` · [ ] `GuardianLink` · [ ] `Class` · [ ] `Enrolment`+enums · [ ] `ClassSession` · [ ] `Material` · [ ] `AssessmentScore` · [ ] `Attendance` · [ ] `Question`+`QStatus` · [ ] `Payment`
- [ ] First migration run
- [ ] Seed script with fake students/classes

**DoD:** can draw the ER diagram from memory and defend the `GuardianLink` many-to-many; `prisma studio` shows seeded data.

### 15 — Auth + RBAC *(Unit 15, 2a — hardest, most valuable)*
- [ ] **Authz test matrix written FIRST** (role × resource grid)
- [ ] Auth.js v5 + email-OTP provider
- [ ] `role` claim in session callback
- [ ] `/app/login` page
- [ ] Middleware protecting `/app/student|parent|teacher|admin/*`
- [ ] Server-side ownership helpers (student=self · parent=GuardianLink · teacher=own classes)
- [ ] Postgres RLS policies (defence in depth)
- [ ] Teacher-provisioned invites; no self-signup

**DoD:** "student A cannot fetch student B's anything" proven by a failing-then-passing test; every matrix cell passes.

### 16 — Materials portal *(Unit 16, 2a)*
- [ ] Supabase Storage bucket + signed expiring URLs
- [ ] `/app/teacher/materials` upload, scoped to class
- [ ] `/app/student` dashboard: materials for enrolled classes only
- [ ] Verify an expired signed URL dies

**DoD (2a exit):** a real student logs in and downloads this week's notes.

### 17 — Records + parent dashboard *(Unit 17, 2b)*
- [ ] `/app/teacher/attendance` two-tap marking (P5)
- [ ] `/app/teacher/scores` entry with `topicTag`s (P6)
- [ ] `/app/parent` child selector → attendance/scores/fees (P7)
- [ ] Fee ledger + PayNow reference reconciliation (P11)
- [ ] Templated monthly report, data only (P8)
- [ ] Recharts score-trend chart

**DoD (2b exit):** a real parent checks scores without messaging you.

### 18 — FastAPI + Docker *(Unit 18, 2c)*
- [ ] FastAPI tutorial full pass (learning gate)
- [ ] `/ai` service: health endpoint
- [ ] Service-token auth from the Next app
- [ ] Dockerfile
- [ ] Deployed to Fly.io/Railway; OpenAPI docs live

**DoD:** Next app calls the deployed Python service and renders the response.

### 19 — RAG + doubt-clearing copilot *(Unit 19, 2c)*
- [ ] pgvector enabled
- [ ] Chapter summaries embedded
- [ ] `/app/student/ask` form (text + photo upload)
- [ ] FastAPI question endpoint
- [ ] Retrieval step
- [ ] **Name-stripping before every Claude call (PDPA N7)**
- [ ] Claude draft generation
- [ ] `/app/teacher/inbox` review UI
- [ ] Approve/edit/send flow
- [ ] 20-question eval fixture, human-graded, regression-checked per prompt change

**DoD:** drafts grounded in YOUR notes; approval gate stays until eval pass > 95%.

### 20 — Report narratives + polish *(Unit 20, 2c)*
- [ ] A2 narratives: deterministic data → Claude draft → teacher approve
- [ ] GitHub Actions CI: typecheck, lint, test, migrate-diff
- [ ] Audit logging on grade edits

**DoD (2c exit):** 80% of student questions answered same-day via approved drafts; CI green badge.

---

*Phase 2 boxes are a map, not a schedule — re-verify against spec §2.9 dates when the gate opens. Slipping 2c to Jan is acceptable; slipping marketing is not.*
