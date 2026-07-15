# Website & Platform Plan — Tuition Centre Web App
*SWE-style planning doc · v2.1 · 15 July 2026*
*Owner: Kin Chong · Phase 1 ship date: 27 July 2026 · Phase 2 build: Aug–Dec 2026*

This document is self-contained: someone picking it up cold should be able to execute either phase without other references.

---

# PART 0 — OVERVIEW & PHASING CONTRACT

Two deliverables, one repo, one design system:

| | **Phase 1 — Marketing Site** | **Phase 2 — Platform** |
|---|---|---|
| Purpose | Convert visitors → trial bookings | Run the centre: portal, materials, progress tracking, AI |
| When | 21–27 Jul 2026, ~25 h total | Aug–Dec 2026, ~6–8 h/week alongside NUS semester |
| Stack | Next.js static pages + one serverless form handler | Full stack (frontend, backend API, Postgres, auth, Python AI service) |
| Users needed to justify | 0 | ~20+ enrolled students |
| Career/portfolio value | Low | High |

**Rules of engagement:**
1. Phase 1 ships first and is never delayed by Phase 2 work.
2. Phase 2 work happens only after each week's marketing content is posted and classes are prepped.
3. Phase 2 mounts behind `/app` on the same domain; Phase 1 pages are untouched by it.

---

# PART 1 — PHASE 1: MARKETING SITE

## 1.1 Problem Statement & Goals

**Problem.** Traffic from TikTok/IG and Google currently has nowhere to land. Enquiries depend on word-of-mouth, which doesn't scale and can't be measured.

**Primary goal.** Convert visitors (parents + students) into **trial-class bookings via WhatsApp**, with zero manual effort to keep the site running.

**Success metrics.**
| Metric | Target (first 90 days) |
|---|---|
| Visitor → WhatsApp click rate | ≥ 8% |
| WhatsApp enquiry → trial booked | ≥ 40% |
| Lighthouse mobile performance | ≥ 90 |
| Time to interactive on 4G | < 3 s |
| Google indexed pages | All programme pages within 30 days |

**Non-goals for Phase 1 (explicitly out of scope — see Phase 2):**
payments/checkout · student login/LMS/portal · scheduling engine · CMS/admin dashboard · blog.
Cutting these is what makes a one-week build realistic. Every successful SG centre site started as a brochure site; portals came years later.

## 1.2 Users & User Stories

Two personas, two very different readers on the same pages. Parents decide and pay; students attend. The homepage speaks to parents; programme pages must reassure both.

### P1 — The Parent (primary buyer)
Late 30s–50s, browsing on phone at night after a bad result comes home. Skeptical, comparison-shopping 3–5 centres. High trust threshold.

- **US-01** As a parent, I want to see results and testimonials immediately, so I can judge credibility in under 30 seconds.
- **US-02** As a parent, I want transparent fees and schedules per subject, so I don't have to send an enquiry just to find out the price.
- **US-03** As a parent, I want to contact the centre via WhatsApp in one tap, because I won't call and I won't fill a long form.
- **US-04** As a parent, I want to see who the tutor is (credentials, story, photo), so I know who's teaching my child.
- **US-05** As a parent, I want to know how online classes work (recordings, doubt-clearing, tests), so I can trust the format for a Sec/JC kid.

### P2 — The Student (influencer, arrives from TikTok)
Sec 3–JC2, found you through a teaching short. Decides whether to lobby their parent.

- **US-06** As a student, I want free notes/resources, so I get value before committing.
- **US-07** As a student, I want to see the tutor's story and teaching style, so it feels relatable, not corporate.
- **US-08** As a student, I want to forward one link to my parent that "explains everything."

### P3 — The Operator (you)
- **US-09** As the operator, I want every enquiry tagged with its source (TikTok / Google / referral), so I know which channel works.
- **US-10** As the operator, I want to update fees, schedules, and testimonials by editing one config file, without touching layout code.

## 1.3 Requirements

### Functional
| ID | Requirement | Priority |
|---|---|---|
| F1 | Sticky WhatsApp CTA button on every page, pre-filled message including page context (e.g. "Hi, I'd like a trial for O-Level Physics") | Must |
| F2 | Trial booking form (name, level, subject, contact) as alternative to WhatsApp; submissions land in Telegram + Google Sheet | Must |
| F3 | One page per programme: syllabus alignment, methodology, schedule, fees, tutor, testimonials, CTA | Must |
| F4 | Fees page — full transparent table, no "contact us for pricing" | Must |
| F5 | About page — origin story (text + embedded 60–90 s video) | Must |
| F6 | Testimonials/results section with specific, verifiable claims ("C5 → A2 in 5 months") | Must |
| F7 | FAQ page (online format, make-ups, recordings, refunds, class size) | Must |
| F8 | Free resources: downloadable chapter summaries (existing Physics/Math PDFs), gated by a WhatsApp click or email | Should |
| F9 | UTM parameter capture, passed into the WhatsApp pre-fill / form payload | Should |
| F10 | Structured data (LocalBusiness + EducationalOrganization schema) | Should |

### Non-functional
| ID | Requirement |
|---|---|
| N1 | **Mobile-first.** 80%+ of parents browse on phones. Design at 375 px first; desktop is the adaptation. |
| N2 | Core Web Vitals pass; LCP < 2.5 s on 4G. |
| N3 | **PDPA**: consent checkbox on forms, privacy policy page, no data stored beyond need. |
| N4 | Zero recurring cost beyond domain (~S$15–50/yr). Free-tier hosting. |
| N5 | Accessibility: semantic HTML, AA contrast, labelled form fields. |
| N6 | All content in typed config/MDX — no CMS, no database in Phase 1. |

## 1.4 Information Architecture (Sitemap)

```
/                      Home (hero, proof, programmes grid, story teaser, CTA)
/about                 Story + teaching philosophy + video
/programmes            Overview grid (level × subject)
  /programmes/o-level-a-math
  /programmes/o-level-e-math
  /programmes/o-level-physics
  /programmes/h2-math
/fees                  Transparent fee + schedule table
/resources             Free chapter summaries (lead magnet)
/results               Testimonials + before/after grades
/faq                   FAQ (accordion)
/contact               Trial booking form + WhatsApp
/privacy               PDPA privacy policy
/terms                 T&Cs (make-up, refund, recording consent)
```

**Programme page template (the money page) — every programme page contains, in order:**
1. H1 with search keyword ("O-Level Physics Tuition Singapore — Online Small Group")
2. Who it's for (stream, level, common pain points)
3. How classes run (2 h weekly Zoom, ≤12 pax, recordings, WhatsApp doubt-clearing, monthly timed tests)
4. Syllabus coverage map (reuse the chapter-summary structure already built)
5. Sample material — screenshot/PDF preview of actual notes (real material beats stock photos)
6. Schedule + fees inline, not linked away
7. Tutor credential block
8. 2–3 testimonials specific to this subject
9. Trial CTA (WhatsApp + form)

## 1.5 Phase 1 Tech Stack & Architecture

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router, SSG) + TypeScript | Known stack; file routing maps 1:1 to sitemap; best-in-class SEO; free Vercel hosting; **same framework Phase 2 extends** |
| Styling | Tailwind CSS (+ shadcn/ui, reused in Phase 2) | Fast, consistent |
| Content | Typed TS config (`site.config.ts`) + MDX | Satisfies US-10 |
| Forms | Route Handler → Telegram Bot API + Google Sheets append | Free, instant phone notification; Sheet doubles as the enquiry-tracking log |
| Analytics | GA4 + Vercel Analytics; GA4 events on every CTA | Free |
| WhatsApp | `wa.me/65XXXXXXXX?text=...` deep links | Pre-fill includes programme + utm_source |
| Video | YouTube embeds (lazy-loaded) | Free hosting; doubles as channel content |
| Domain | `.sg` / `.com.sg` (Namecheap/Cloudflare) | Local signal; ~S$40–50/yr |

**Rejected:** Wix/Squarespace (cost, speed, wastes the CS advantage — agencies charge S$2,500–6,000 for this site) · WordPress (maintenance, CWV) · any database (nothing in Phase 1 needs persistence).

**Architecture:**
```
[Static pages on Vercel CDN]
        │
        ├── CTA click ──► wa.me deep link ──► your WhatsApp
        │                   (pre-filled with programme + utm_source)
        │
        └── Form POST ──► /api/enquiry (serverless)
                             ├─► Telegram bot message to you
                             └─► append row to Google Sheet (enquiry log)
```

## 1.6 Phase 1 Content Model

```ts
// site.config.ts
type Programme = {
  slug: string;              // "o-level-physics"
  title: string;
  level: "Sec 3" | "Sec 4" | "JC1" | "JC2";
  stream: "O-Level" | "A-Level";
  feePerMonth: number;       // SGD
  schedule: { day: string; time: string }[];
  classSize: number;         // cap, e.g. 12
  syllabusCode: string;      // e.g. "6091"
  syllabusTopics: string[];  // reuse chapter-summary list
  sampleMaterialUrl?: string;
  testimonialIds: string[];
};

type Testimonial = {
  id: string;
  studentInitials: string;   // PDPA: no full names without consent
  school?: string;
  subject: string;
  beforeGrade: string;
  afterGrade: string;
  quote: string;
  consentOnFile: boolean;    // don't render unless true
};

type Enquiry = {             // form payload → Sheets row
  timestamp: string;
  name: string;
  level: string;
  subject: string;
  phone: string;
  source: string;            // utm_source ?? "direct"
  status: "new" | "trial-booked" | "enrolled" | "lost";
};
```

## 1.7 Phase 1 Milestones (21–27 Jul, ~20–25 h)

Sequenced so the site is shippable at the end of every milestone.

**M0 — Setup (2 h, Sun 20 Jul).** Repo, Next.js + Tailwind scaffold, deploy empty shell to Vercel, connect domain, GA4 property. *Exit: hello-world live on the domain.*

**M1 — Content before code (3 h, Mon).** Write ALL copy in the config file first: programme descriptions, fees, FAQs, story, 3+ consented testimonials. Copy is the real bottleneck, not code. *Exit: `site.config.ts` complete.*

**M2 — Core pages (6 h, Tue–Wed).** Layout shell (header, footer, sticky WhatsApp FAB) → Home → programme template rendering from config → Fees. *Exit: a parent could decide and enquire.*

**M3 — Trust pages (4 h, Thu).** About + story video, Results, FAQ, Privacy, T&Cs. *Exit: nothing "coming soon" anywhere.*

**M4 — Funnel plumbing (3 h, Fri).** `/api/enquiry` → Telegram + Sheet; UTM capture into WhatsApp pre-fill; GA4 events on every CTA. *Exit: a test enquiry from your phone appears in Telegram + Sheet with source tag.*

**M5 — SEO & polish (3 h, Sat).** Per-page meta ("{Subject} Tuition Singapore Online"), schema markup, OG images, sitemap.xml, Google Search Console verified, Google Business Profile linked. *Exit: Lighthouse ≥ 90 mobile.*

**M6 — Launch (1 h, Sun 27 Jul).** Run §1.9 checklist; send link to existing families with the founding-batch offer.

**Phase 1.1 (August, timebox 2 h):** publish `/resources` with the six existing chapter summaries as PDFs. Each is a long-tail SEO page ("O Level Physics kinematics summary notes") and every download is a lead.

## 1.8 Phase 1 Testing Plan

| Test | How |
|---|---|
| Mobile rendering | Real devices: one iPhone, one Android, 375 px + 414 px |
| WhatsApp deep link | Tap from each programme page — pre-filled text correct, includes source |
| Form E2E | Submit → Telegram arrives → Sheet row appended → visible error state if API fails |
| Performance | Lighthouse on every deploy; budget LCP < 2.5 s, CLS < 0.1 |
| SEO | GSC URL inspection per page; Rich Results Test on schema |
| Content | Every fee/date/schedule cross-checked against config; no placeholders |
| PDPA | Consent checkbox blocks submit; privacy page linked from form |

## 1.9 Phase 1 Launch Checklist (go/no-go)

- [ ] All 4 programme pages complete with fees + schedule inline
- [ ] ≥ 3 testimonials with written consent on file
- [ ] Story video embedded and playable on mobile data
- [ ] WhatsApp FAB works on iOS + Android
- [ ] Test enquiry received end-to-end
- [ ] Privacy policy + T&Cs live
- [ ] GA4 recording events; GSC verified; sitemap submitted
- [ ] Google Business Profile live and pointing at the site
- [ ] TikTok/IG bios updated with link + `?utm_source=tiktok`
- [ ] 404 page exists and routes to /programmes

---

# PART 2 — PHASE 2: PLATFORM (Portal + Auth + AI)

## 2.1 Problem Statement & Goals

**Problem.** As students enrol, admin work (materials distribution, attendance, fee tracking, progress reports, doubt-clearing) scales linearly with headcount and eats teaching time. A platform caps that cost and is a genuine differentiator vs other solo tutors — parent portals are a selling point at the premium end of the SG market.

**Success metrics.**
| Metric | Target |
|---|---|
| Enrolled students activated on portal | ≥ 80% |
| Admin hours per student per month | < 0.5 h |
| Parent monthly report open rate | ≥ 60% |
| Student questions answered same-day (via approved AI drafts) | ≥ 80% |

## 2.2 Users & User Stories — three authenticated roles

**Student**
- **US-11** Log in and access this week's notes, worksheets, and class recordings for my enrolled subjects only.
- **US-12** Submit homework/practice answers and see marked feedback.
- **US-13** Ask a question (text or photo of working) and get help — AI first-pass, tutor escalation.
- **US-14** See my own progress: topic mastery, test scores over time.

**Parent**
- **US-15** Log in and see my child's attendance, test scores, and monthly progress summary without asking the tutor.
- **US-16** See fee status and pay via PayNow (reference code first; gateway later).
- **US-17** Receive a monthly auto-generated progress report.

**Teacher (Kin Chong now; hires in Year 2)**
- **US-18** Upload materials once, scoped to a class; recordings auto-linked per session.
- **US-19** Mark attendance in two taps during class.
- **US-20** Enter/import test scores; per-topic tagging feeds progress analytics.
- **US-21** Review AI-drafted answers to student questions before they send.
- **US-22** Admin: manage classes, enrolments, roles.

## 2.3 Requirements

### Functional
| ID | Requirement | Sub-phase |
|---|---|---|
| P1 | Email/OTP login; roles STUDENT, PARENT, TEACHER, ADMIN | 2a |
| P2 | Parent↔child linking (one parent, many children; one child, many guardians) | 2a |
| P3 | Class → enrolment → materials access control | 2a |
| P4 | Materials library: PDF/video upload, per-class scoping | 2a |
| P5 | Attendance per session | 2b |
| P6 | Assessment scores with per-topic tags | 2b |
| P7 | Parent dashboard: attendance, scores, fee status | 2b |
| P8 | Monthly progress report (template + data; AI narrative in 2c) | 2b |
| P9 | Doubt-clearing inbox: student Q (text/image) → AI draft → teacher approve → send | 2c |
| P10 | Topic-mastery analytics per student (from P6 tags) | 2c |
| P11 | Fee ledger + PayNow reference reconciliation | 2b |

### Non-functional
- N1–N6 from Phase 1 continue to apply.
- **N7 — PDPA (serious in Phase 2).** Minors' personal data, grades, and handwriting photos: consent capture at enrolment, data minimisation, right-to-delete, SG-region DB hosting, and **no minors' data sent to third-party AI APIs without anonymisation** (strip names before LLM calls).
- **N8 — Security.** RBAC enforced server-side (never trust client role claims); row-level ownership checks on every query; rate limiting on auth + AI endpoints; audit log on grade edits.
- **N9 — Cost ceiling.** < S$25/month until 30 students (free tiers cover most of this).

## 2.4 Information Architecture

Mounts under `/app` on the same domain; Phase 1 pages untouched.

```
/app/login                     OTP login (role inferred from account)
/app/student                   dashboard: this week, materials, recordings
/app/student/ask               doubt-clearing (AI-assisted)
/app/student/progress          mastery + score history
/app/parent                    child selector → attendance, scores, fees
/app/parent/reports            monthly progress reports
/app/teacher                   class list, today's session
/app/teacher/materials         upload + scope materials
/app/teacher/attendance        two-tap marking
/app/teacher/scores            score entry with topic tags
/app/teacher/inbox             AI-drafted answers awaiting approval
/app/admin                     users, classes, enrolments
```

## 2.5 Tech Stack (demand-weighted)

Chosen to maximise fit **and** employability: TypeScript, Python, React/Next.js, Node.js, PostgreSQL, Docker, REST/OpenAPI — the highest-demand keywords, in one project, without a superfluous third ecosystem.

| Layer | Choice | Why |
|---|---|---|
| **Frontend** | Next.js 15 (React) + TypeScript + Tailwind + shadcn/ui | Extends the Phase 1 codebase; server components for the portal; most in-demand FE stack |
| **Backend (core API)** | Node.js + TypeScript — Next.js Route Handlers first, extract to NestJS when it outgrows the monolith | Shared types end-to-end; NestJS = most-hired structured Node framework |
| **Backend (AI service)** | Python 3.12 + FastAPI, Dockerised | Python owns ML; FastAPI is the model-serving standard; second in-demand language in the same project |
| **Database** | PostgreSQL on Supabase (SG region) | Default relational DB in job listings; storage + row-level security built in; SG region for PDPA |
| **ORM** | Prisma (TS); SQLAlchemy (Py, read-mostly) | Prisma schema doubles as data-model documentation |
| **API style** | REST + OpenAPI on the FastAPI service; typed server actions within Next | REST/OpenAPI is what employers test for |
| **Auth** | Auth.js (NextAuth v5) — email OTP (+ optional Google); roles in DB; JWT session with role claim, re-checked server-side | Vendor-neutral, free; implementing RBAC yourself is better learning than buying Clerk |
| **File storage** | Supabase Storage (S3-compatible), signed expiring URLs | Access checked per enrolment |
| **AI/LLM** | Anthropic API (Claude) via the FastAPI service only | Doubt drafts, report narratives, worksheet gen |
| **Vector/RAG** | pgvector on the same Postgres | Embed chapter summaries + past answers; no separate vector DB |
| **Infra** | Vercel (Next) + Fly.io/Railway (FastAPI in Docker) | Free-tier friendly; Docker = deployable skill |
| **CI/CD** | GitHub Actions: typecheck, lint, tests, Prisma migrate diff, deploy | Standard practice + interview talking point |
| **Payments (2b)** | PayNow reference codes + manual reconciliation → Stripe/HitPay later | No gateway fees before revenue justifies them |

**Rejected:** Firebase (NoSQL fights the relational model; weaker resume signal than Postgres) · Java/Spring, Go (in demand but a third ecosystem = months of drag; revisit Go later for extracted services) · separate SPA + Express (loses SSG/SEO and shared types).

**Architecture:**
```
                    ┌────────────────────────────┐
  Browser ────────► │  Next.js (Vercel)          │
  (S/P/T roles)     │  · marketing pages (SSG)   │
                    │  · /app portal (RSC)       │
                    │  · Auth.js (OTP, RBAC)     │
                    │  · Route Handlers (REST)   │
                    └────────┬──────────┬────────┘
                             │          │
                   Prisma    │          │  REST (OpenAPI, service token)
                             ▼          ▼
                  ┌──────────────┐   ┌──────────────────────┐
                  │ Postgres     │◄──┤ FastAPI (Fly.io)     │
                  │ (Supabase,SG)│   │ · Claude API calls   │
                  │ + pgvector   │   │ · embeddings/RAG     │
                  │ + Storage    │   │ · report generation  │
                  └──────────────┘   └──────────────────────┘
```

## 2.6 Data Model (Prisma sketch)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      Role     // STUDENT | PARENT | TEACHER | ADMIN
  createdAt DateTime @default(now())
  studentProfile StudentProfile?
  guardianLinks  GuardianLink[]  // as parent
}

model StudentProfile {
  id        String @id @default(cuid())
  userId    String @unique
  level     String          // "Sec 4", "JC1"
  school    String?
  user      User   @relation(fields: [userId], references: [id])
  guardians GuardianLink[]
  enrolments Enrolment[]
  scores     AssessmentScore[]
  attendance Attendance[]
  questions  Question[]
}

model GuardianLink {            // many-to-many parent↔child
  parentId  String
  studentId String
  parent    User           @relation(fields: [parentId], references: [id])
  student   StudentProfile @relation(fields: [studentId], references: [id])
  @@id([parentId, studentId])
}

model Class {
  id        String @id @default(cuid())
  programme String          // "o-level-physics" (matches Phase 1 slug)
  dayOfWeek Int
  startTime String
  capacity  Int
  enrolments Enrolment[]
  sessions   ClassSession[]
  materials  Material[]
}

model Enrolment {
  studentId String
  classId   String
  status    EnrolStatus     // TRIAL | ACTIVE | PAUSED | ENDED
  feeStatus FeeStatus       // PAID | DUE | OVERDUE
  @@id([studentId, classId])
}

model ClassSession {
  id           String @id @default(cuid())
  classId      String
  date         DateTime
  recordingUrl String?
  attendance   Attendance[]
}

model Material {
  id        String @id @default(cuid())
  classId   String
  title     String
  fileKey   String          // Storage key; served via signed URL
  topicTag  String?         // links to mastery analytics
}

model AssessmentScore {
  id        String @id @default(cuid())
  studentId String
  topicTag  String          // "kinematics", "dynamics" — reuse chapter taxonomy
  maxMarks  Int
  marks     Int
  date      DateTime
}

model Attendance {
  sessionId String
  studentId String
  status    AttendStatus    // PRESENT | ABSENT | MAKEUP
  @@id([sessionId, studentId])
}

model Question {              // doubt-clearing pipeline
  id          String @id @default(cuid())
  studentId   String
  body        String
  imageKey    String?
  aiDraft     String?        // Claude's draft answer
  finalAnswer String?
  status      QStatus        // NEW | AI_DRAFTED | APPROVED | SENT
  createdAt   DateTime @default(now())
}

model Payment {
  id        String @id @default(cuid())
  studentId String
  month     String           // "2026-09"
  amount    Int              // cents
  method    String           // "PAYNOW"
  reference String
  paidAt    DateTime?
}
```

The `topicTag` thread (Material → AssessmentScore → analytics) means the existing chapter-summary taxonomy (Kinematics, Dynamics, Thermal…) becomes the platform's topic ontology — already built.

## 2.7 Authentication & Authorization Design

**AuthN.** Auth.js email-OTP, passwordless (parents won't manage another password; students are minors so no social-login requirement). Optional Google OAuth for convenience.

**AuthZ.**
- Role stored in DB, embedded in JWT session claim, but **every mutation re-checks role + ownership server-side**.
- Ownership rules: student reads only rows where `studentId = self`; parent reads only children in `GuardianLink`; teacher reads/writes only own classes; admin bypasses with audit logging.
- Enforced twice — application middleware per route group (`/app/student/*` etc.) **and** Postgres row-level security policies. Defence in depth.
- Signed, expiring URLs for materials so shared links die in minutes.
- **Provisioning:** teacher creates student+parent records at enrolment → invite emails → OTP first login. No open self-registration — keeps strangers and scrapers out entirely and simplifies PDPA exposure.

## 2.8 ML / AI Roadmap (build in this order)

All LLM calls go through the FastAPI service with names stripped (N7). Each stage ships value alone and feeds the next.

**A1 — Doubt-clearing copilot (2c, highest ROI).** Student submits question (text or photo of working) → FastAPI → Claude (vision) → draft grounded in *your* notes via RAG (pgvector over chapter summaries) → teacher inbox → approve/edit → send. After-hours question support is the single most-praised feature in SG competitor reviews; AI makes it survivable during the NUS semester.

**A2 — Progress-report narratives (2b→2c).** Deterministic data (attendance %, score trends, weak `topicTag`s) → Claude drafts the 3-paragraph parent-facing narrative → teacher approves. A 30-min/student monthly chore becomes 2 min.

**A3 — Worksheet/question generation (later).** Practice variants per topic seeded by existing materials; human-reviewed before use.

**A4 — Mastery prediction (much later, real ML).** With 1–2 years of `AssessmentScore` data: Bayesian Knowledge Tracing or logistic regression (scikit-learn) before anything fancy. Honest note: below ~50 students a rules-based "weakest 3 topics" heuristic will beat any model — ship the heuristic first.

## 2.9 Phase 2 Milestones (semester-paced, ~6–8 h/week)

| Sub-phase | Weeks | Deliverable | Exit criterion (user-visible) |
|---|---|---|---|
| **2a — Auth + Materials** | Aug (4 wks) | Postgres + Prisma schema, Auth.js OTP + RBAC, teacher upload, student portal read-only | A real student logs in and downloads this week's notes |
| **2b — Records + Parents** | Sep–Oct (6 wks) | Attendance, scores w/ topic tags, parent dashboard, fee ledger, templated monthly report | A real parent checks scores without messaging you |
| **2c — AI layer** | Nov–Dec (6 wks) | FastAPI service, RAG over summaries, doubt inbox (A1), AI report narratives (A2) | 80% of student questions answered same-day via approved drafts |

Sequencing rationale: 2a/2b are pure CRUD — fast, and they generate the data 2c needs. Exams are Oct–Nov; 2b lands exactly when parents most want visibility. 2b has ~4 weeks of work in 6 weeks — slack for NUS midterms is deliberate.

## 2.10 Phase 2 Testing & Security Plan

- Unit tests on authz policies: every role × every resource — the matrix is small; test it exhaustively.
- Integration tests on Prisma queries with RLS enabled.
- Contract tests against the FastAPI OpenAPI spec.
- **AI evals:** fixture set of 20 real student questions, human-graded drafts, regression-checked on every prompt change. Approval gate stays until pass rate > 95%; never auto-send graded feedback.
- Load test auth + signed-URL endpoints; dependency scanning in CI.
- **Threat model:** #1 risk is IDOR (student A reading student B's scores) — covered by ownership checks + RLS. #2 is prompt injection via student questions — mitigated because AI drafts are untrusted until teacher-approved.

---

# PART 3 — RISKS & MITIGATIONS (both phases)

| Risk | Impact | Mitigation |
|---|---|---|
| **Platform-building displaces marketing/teaching** (the #1 killer — coding is more fun than posting TikToks) | Business starves while portfolio grows | Rules of engagement in Part 0; 2a doesn't start until Phase 1 has shipped AND the founding-batch push is done |
| Copywriting takes longer than coding | Phase 1 slips | M1 forces content first; reuse business-plan copy |
| Perfectionism / over-engineering | Phase 1 slips | Non-goals list is the contract; Phase 2 features need ~20+ students to justify |
| Thin testimonial base at launch | Weak conversion | Collect during Week 3 per business timeline; specific grade-jump quotes, initials only |
| No physical premises photos (online-only) | Parent distrust | Show the product instead: live Zoom screenshots, annotated notes, recording library |
| Minors' data + AI (PDPA) | Legal/reputational | N7: SG-region DB, name-stripping proxy, no auto-send AI answers, consent at enrolment |
| NUS workload spikes (Oct midterms) | Phase 2 slips | Deliberate slack in 2b; slipping 2c to Jan is acceptable, slipping marketing is not |
| Solo-dev bus factor | Outage with no backup human | Boring tech, managed services, migrations in git, weekly DB backups |
| AI answer quality harms trust | Churn | Teacher-approval gate until eval pass > 95% |