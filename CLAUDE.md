# Project Instructions

This repository contains my personal portfolio website.

The complete project specification is in `PORTFOLIO_SPEC.md`.

Always read that specification before making substantial architectural or design changes.

Never invent personal information, achievements, project results, or technical experiences.

Keep content separate from UI components.

Prioritize maintainability, accessibility, and visual consistency.

---

## Standing rules (apply to every task)

1. **Applicant text is verbatim.** When the applicant supplies approved text (e.g. `CUSTOMS_CONTENT.md`), copy it exactly. Do not rewrite, paraphrase, shorten, extend or "improve" it. Adapt only the data structure needed to display it.
2. **Render only real content.** Any section, field, card, media frame, link or nav entry without real content is not rendered, in **both** draft and published mode. Never show placeholder copy ("to be added", "Draft" notes, empty slots, empty image frames) on the site. Keep the empty fields in the TypeScript data structures so content can be added later.
3. **Never hide a section to cover a content-mapping error.** Before treating a section as empty, check that its content doesn't already exist elsewhere: another field of the same project, a content `.md` file, or git history. If it does, map it. If the source itself is incomplete, leave a `TODO(applicant)` comment in the data and tell the user.
4. **Do not change `portfolioStatus`** in `src/data/site.ts` (currently `'draft'`) unless the user explicitly asks. To test published mode, back up `site.ts`, flip it temporarily, build into a temp `--outDir`, then restore and `cmp` the file (see "Verification" below).
5. **Do not push, deploy, or commit** unless asked. The remote is `origin` → `https://github.com/davizuco01-sudo/portfolio-horowitz.git`, branch `main`. Never force-push or rewrite history. Not deployed to Vercel yet.
6. **Do not modify other projects' content** when working on one project, and don't redesign or change the theme, typography or layout unless asked.

## How content visibility works

All emptiness decisions go through `src/lib/content.ts`:

- `isMeaningful(text)`: true for a non-empty string that isn't scaffolding (the `PLACEHOLDER_TEXT` regex rejects "TODO", "TBD", "To be added/written/confirmed", "Lorem ipsum", "Placeholder").
- `hasText(value)`: the same rule for strings or arrays of strings. Use it for every "does this section have content?" decision.
- `meaningful(items)`: filters arrays. `Prose` and `BulletList` use it, so they render nothing for empty input.

Where each rule is applied:

| Area | File | Rule |
| --- | --- | --- |
| Project page sections B–H | `components/projects/ProjectDetailLayout.tsx` | Each section has `hasContent`. Only those render, and "On this page" is built from the same filtered list, so it can't link to a hidden section. Steps and challenges without a title are dropped. |
| Homepage sections | `lib/homeSections.ts` | `homeSections.{work,experiments,about,contact}` flags. `Journey`, `Contact`, `FeaturedProjects` and `OtherExperiments` return `null` when their flag is false. |
| Navbar / footer links | `components/layout/navigation.ts` | `sectionLinks` is filtered by `homeSections`, so no link points at a missing `#about` / `#contact`. |
| Journey milestones | `lib/homeSections.ts` → `visibleJourney` | A milestone renders only once it has `body` text. The titles are template headings from the brief, not content. |
| Card / hero media | `lib/media.ts` → `hasMediaPreview` | Cards render an image frame only when there's a real preview image. The lead card falls back to a non-split layout without one. The project hero renders media only if `featuredMedia ?? cover` exists. |
| Project links | `lib/projects.ts` → `getProjectLinks` | Only URLs that pass `isMeaningful`. |

What `portfolioStatus` still controls: **only** unverified awards (`results.recognition` with `verified: false`). In draft mode they show with a "Pending verification" marker, which is an accuracy safeguard, not a placeholder. In published mode they're hidden (`getVisibleRecognition` in `lib/projects.ts`).

`src/data/placeholders.ts` now holds only status messages: the broken-media fallback ("Media could not be loaded", shown only when a file path fails to load) and the two pending-verification strings. **Do not add "to be added" copy back to it.** The old `components/ui/Draft.tsx` (`Placeholder` / `DraftNote`) was deleted on purpose.

Currently hidden because they're empty: the About and Contact sections (and their nav links), the hero's secondary link, Customs "Results & Next Steps" and "Links", LayerGuard's "How It Works" and "What I Learned", Business Opportunity Radar's "What I Learned" and "Links" (no source content), every Mathematical Solver section except Why I Built It / What I Built / Links, and every BUMP section except Why I Built It / What I Built (no repository, so no Links).

## Site identity (`src/data/site.ts`)

The portfolio belongs to **David Gala**. All identity text below was supplied by him; copy it verbatim and don't add other personal details (no contact info, social links or biography until he provides them).

| Field | Value | Where it shows |
| --- | --- | --- |
| `name` | `'David Gala'` | Navbar brand, footer (`© <year> David Gala`), tab titles (`siteTitle`) |
| `discipline` + `interests` | `'Mathematical Engineering'`, `['AI', 'Software']` | Small hero label, rendered uppercase with `·` separators: "MATHEMATICAL ENGINEERING · AI · SOFTWARE" |
| `hero.heading` | `'David Gala'` (no trailing period: the applicant asked for headings without periods) | The homepage `<h1>`, in the large heading style |
| `hero.introduction` | "I'm a Mathematical Engineering student who started building with AI out of curiosity. I've been exploring how to turn what I learn into useful software." | Paragraph under the heading |

How it's wired:
- `components/home/Hero.tsx`: the `<h1>` shows `hero.heading` in the large style and falls back to `siteTitle` if the heading is empty. There is no separate small name line any more. The label separator is `·` (it was `/`).
- Tab titles: the homepage is `homeDocumentTitle` (`lib/content.ts`), so "David Gala | Portfolio". Other pages use `"<page> · David Gala"` (`lib/useDocumentTitle.ts`).
- `index.html` static fallback: `<title>David Gala | Portfolio</title>` and the description "Personal portfolio of David Gala: projects and experiments."
- The hero button label is unchanged ("View featured work", `labels.hero.primaryAction`). The brief called it "Explore my work"; it was kept as is because the brief said to preserve the existing button.
- About and Contact stay hidden: no biography or contact details have been provided.

## Content model additions (made for Customs Documentation AI)

These optional fields default to empty in `lib/defineProject.ts`, so existing project entries are unaffected:

- `featuredMedia: MediaItem | null`: main image on the project page only. Falls back to `cover`, which is used on cards.
- `howItWorks.galleryLayout: 'grid' | 'stacked'`: `'stacked'` gives each screenshot the full content width. The default `'grid'` places two per row.
- `challengesOverview: Paragraphs`, `lessons.overview: Paragraphs`, `results.overview: Paragraphs`: narrative paragraphs rendered with the existing `Prose` component before any structured items. These exist because approved applicant text is plain paragraphs, and forcing it into titled challenge cards or lesson categories would mean inventing titles or categories.
- What I Built: the "Overview" sub-heading is shown only when other `built.*` sub-sections also have content.
- `Recognition.certificatePreview?: ImageMedia` (added for LayerGuard): an image of the certificate, shown inside the award item below "View certificate" (full card width on mobile, enlargeable). Awards without it render exactly as before.
- `sectionTitles: Partial<Record<ProjectSectionId, string>>` (added for the Mathematical Solver, default `{}`): per-project section headings for when the approved source names a section differently, e.g. `{ problem: 'Why I Built It' }`. `ProjectDetailLayout` uses it for both the section heading and "On this page". Other projects keep the default titles from `labels.project.sections`.
- The repository link label is `labels.project.links.repository = 'View Source on GitHub'` (it was "Source code"). It's used on the project page "Links" button and on experiment cards. The Solver is the only project with a repository so far.
- `ExperimentCard`: a repository or live-demo URL is shown as a small external link **also** when the card has a detail page. The link sits above the card-wide link (`relative z-10`), so the card body opens the page and the link opens GitHub in a new tab. The card's focus ring now reacts only to the title link (`has-[h3_a:focus-visible]`). Cards without URLs are unchanged.

## Project status

### 01 Customs Documentation AI (`slug: customs-documentation`)

Source text: `CUSTOMS_CONTENT.md` (untracked, approved by the applicant). Integrated verbatim; a script check confirmed each of the 14 strings appears exactly once in `src/data/projects.ts`.

| Source section | Field |
| --- | --- |
| Category, Status, Technologies, Short Description | `category`, `statusLabel: 'Working Prototype — In Development'`, `technologies`, `summary` |
| 1. The Problem & Discovery | `problem` |
| 2. What I Built | `built.overview` (5 paragraphs; keeps the H1 XML export sentence) |
| 3. Technical Challenges | `challengesOverview` |
| 4. What I Learned | `lessons.overview` |
| 5. Current Status & Next Steps | `results.overview`: **EMPTY. The source file ends mid-sentence at "The application is currently".** Verified absent from the repo, git history and the other fields. Ask the applicant for the full text and paste it in verbatim. The section then appears automatically. |

Screenshots (`public/media/customs/`, all 1920×1080, authentic, never modify; the UI is in Spanish):
- `main-menu.png`: `cover`, used for **both** the homepage card and the first image on the project page (hero, 16:9, uncropped, with a caption; the caption only shows on the page). It is also the image the viewer opens from the hero, and it shows the four-step workflow (Subir documentos → Analizar → Revisar → Exportar). `featuredMedia` is not set, so the page falls back to `cover`. History: the card first used `review-dashboard.png`; the applicant then asked for the main menu on the card too (2026-11-05).
- Gallery (stacked, images 2–4): `document-case.png` → `review-dashboard.png` → `source-traceability.png`, each with a short factual caption and alt text based on what the screenshot shows.
- On the project page the sequence is main menu → document case → review dashboard → source traceability, with no image repeated. Before the main menu was added, `source-traceability.png` was the hero and also the 3rd gallery item.
- Note: step 4 of the main-menu screenshot says the export is "un informe de revisión legible y el JSON con toda la trazabilidad. No es una declaración aduanera." The page text (verbatim from the applicant) says H1 XML export. Both may be true; neither the caption nor the alt text mentions an export format.

Content constraints for this project: it's a working prototype, not a deployed commercial product. XML export is a confirmed current feature. Never imply the XML is certified for official customs submission.

Known cosmetic point: the homepage lead card uses `object-cover`, so the main-menu preview may be trimmed at the edges depending on the viewport. This was left as is on purpose (the homepage structure was not to be changed).

### 02 LayerGuard — AI-Powered 3D Printing Assistant (`slug: 3d-printer-assistant`)

Source text: `LAYERGUARD_CONTENT.md` (untracked, approved by the applicant). Integrated verbatim; a script check (`portfolio-verify/layerguard-text-check.cjs`) confirmed the short description and all 16 section paragraphs appear exactly once in `src/data/projects.ts`. The route is unchanged.

| Source section | Field |
| --- | --- |
| Category, Status, Technology, Short Description | `category`, `statusLabel: 'Hackathon Prototype'`, `technologies: ['AWS PartyRock']`, `summary` |
| 1. The Challenge | `problem` |
| 2. What I Built | `built.overview` |
| 3. My Approach | `challengesOverview` |
| 4. Results & Recognition | `results.overview` + `results.recognition[0]` |

Award (`verified: true`, checked against the certificate): English wording from the content file (`Third Prize`, `National Generative AI Awards 2025/2026`, `3D Printing & Additive Manufacturing`, `October 2026`). The certificate reads "Premios Nacionales de IA Generativa 2025/2026", "Tercer Premio", "Categoría: Impresión 3D y Fab. Aditiva", "Proyecto: LayerGuard", "Octubre 2026", with AWS, PartyRock, Prusa Research and Amazon branding.

Media (`public/media/printer-ai/`, authentic, never modify):
- `award-ceremony.jpg` (1600×1200): `cover`, so the homepage card and the project hero (4:3 frame, no cropping on the page; the 16:10 card trims only ceiling and audience).
- `award-certificate.pdf`: original, linked as `certificateUrl` (award item + automatic "Award certificate" button in Links).
- `award-certificate-preview.jpg` (1600×1120): first page rendered with PyMuPDF (`portfolio-verify/render-certificate.py`), used as `certificatePreview`.

Constraints: built on AWS PartyRock in about 30 minutes at a hackathon. No source repository (never add a repository link), no screenshots of the app (so no "How It Works"), not commercially deployed, no specific model attribution, no real-time monitoring or printer control. The text describes designed behaviour; don't present it as measured performance.

### 03 Business Opportunity Radar (`slug: opportunity-radar`)

Source text: `RADAR_CONTENT.md` (untracked, approved by the applicant). Integrated verbatim; `portfolio-verify/radar-text-check.cjs` confirms the short description and all 16 section paragraphs appear exactly once in `src/data/projects.ts`, plus category, status and the 7 technologies. The route is unchanged.

| Source section | Field |
| --- | --- |
| Category, Status, Technologies, Short Description | `category: 'AI Agents / Market Research / Automation'`, `status: 'prototype'` + `statusLabel: 'Functional Research Prototype'` (was `'experiment'` / "Independent Experiment"), `technologies`, `summary` |
| 1. The Problem | `problem` |
| 2. What I Built | `built.overview` |
| 3. Technical Challenges | `challengesOverview` (shown as "Challenges & Decisions") |
| 4. Results & What Came Next | `results.overview` (shown as "Results & Next Steps") |

Key narrative point: the Radar's results pointed the applicant at logistics/customs problems, which led to Customs Documentation AI. That is stated in the approved Results text; keep it.

Verified figures (one saved Supabase dataset): 131 unique Reddit comments, 50 discussions, 11 HOT / 3 WARM / 117 COLD. These are the app's own classifications, not validated demand, customers or revenue. Never claim verified market demand or automated LinkedIn scraping.

Screenshots (privacy-sensitive, read before touching):
- The originals contain an "Identidad Triangulada" panel with **unverified AI-inferred real names, Reddit aliases and LinkedIn links**. They must never be published.
- Originals (`radar-dashboard.png`, `radar-customs-analysis.png`, `radar-history.png`, unmodified) were moved to `private-media/opportunity-radar/originals/`, outside `public/`, and `private-media/` is gitignored. Never move them back into `public/` or commit them.
- Publication-safe copies are in `public/media/opportunity-radar/processed/` (1920×1080), produced by `portfolio-verify/radar-process.py <originals> <processed>`:
  1. The browser's "To exit full screen, press and hold Esc" notice (x 698–1223, y 65–146) was replaced with the same region of the applicant's `radar-history.png`, which shows the same app header unobscured. The script asserts the 12 px ring around it is pixel-identical in both screenshots.
  2. The identity column (x 1312–1735, y 530–1080: the identity card and the clipped card below it, whose "Diagnóstico (Simulado)" title was cut off with no visible content) was filled with the panel colour `(15,19,36)`.
  3. The script asserts no other pixel changed. Dashboard, filters, HOT · 80 score, AI reasoning and proposed solution are intact.
- `processed/radar-overview.png` (from `radar-dashboard.png`): `cover`, so the homepage card and the project hero (16:9, uncropped).
- `processed/radar-customs.png` (from `radar-customs-analysis.png`): the only gallery item ("How It Works", stacked). It shows the SAP / customs invoice / CBP opportunity.
- Both captions say a panel with unverified personal details has been removed.
- The brief also asked for an "AI Analysis" screenshot (`radar-analysis.png`). It doesn't exist; the applicant chose (2026-11-05) to publish the two matching screenshots and add the third later. `radar-history.png` is not used (the brief said not to). To add a new screenshot: keep the original in `private-media/`, check it for names/LinkedIn, process it, and reference only the `processed/` copy.

### Other Experiments

#### Multi-Agent Mathematical Solver (`slug: mathematical-assistant`, was "Mathematical AI Assistant")

Source text: `MATHAI_CONTENT.md` (untracked, approved by the applicant). Integrated verbatim; the short description and all 4 paragraphs appear exactly once in `src/data/projects.ts`. The slug was kept to match the `public/media/mathematical-assistant/` folder.

Secondary project, kept short: `featured: false`, `hasDetailPage: true`. The homepage card shows status, category, summary, technologies and "View Source on GitHub". The card body opens a short page with only **Why I Built It**, **What I Built** and **Links**.

| Source section | Field |
| --- | --- |
| Category, Status, Technologies, Short Description | `category: 'AI Agents / Mathematics'`, `status: 'experiment'` + `statusLabel: 'Experimental Prototype'`, `technologies` (8), `summary` |
| Why I Built It | `problem`, shown under the heading "Why I Built It" via `sectionTitles` |
| What I Built | `built.overview` (3 paragraphs; the "Overview" sub-heading stays hidden) |
| GitHub URL | `links.repository: 'https://github.com/davizuco01-sudo/IA-matematicas'` (public, owned by the applicant's GitHub account, returns 200) |

Stack checked against the repository source (2026-11-05): 3 CrewAI agents (`arquitecto`, `investigador`, `visualizador`), 4 tasks, `groq/llama-3.3-70b-versatile`, SymPy, Matplotlib, Streamlit (`app.py`), `pdflatex` with a download only if the PDF exists. No screenshots were supplied, so there's no cover and no image frame (no fake screenshots). Constraints: experimental prototype; never claim mathematically verified answers, deployment, users, accuracy or performance figures.

Side effect of the detail page: the Radar page now has a "Next project" link to the solver, and the solver page has "Previous project: Business Opportunity Radar". The breadcrumb still says "Work" (shared component, unchanged).

#### BUMP — Agentic Proximity Safety (`slug: safety-simulation`, was "Multi-Agent Safety Simulation")

Source text: `BUMP_CONTENT.md` (untracked, approved by the applicant). Integrated verbatim; the short description and all 8 paragraphs appear exactly once on the page (`bump-check.mjs`). The slug was kept to match the `public/media/safety-simulation/` folder.

Same shape as the Solver: `featured: false`, `hasDetailPage: true`, and a short page with only **Why I Built It** (`problem` + `sectionTitles`) and **What I Built** (`built.overview`, 5 paragraphs).

| Source section | Field |
| --- | --- |
| Category, Status, Technologies, Short Description | `category: 'AI Agents / Safety Systems / Simulation'`, `status: 'experiment'` + `statusLabel: 'Experimental Prototype'`, `technologies` (Python, CrewAI, Groq, Llama 3.3 70B, SQLite), `summary` |
| Why I Built It | `problem` (3 paragraphs) |
| What I Built | `built.overview` (5 paragraphs, ending "BUMP remained a simulation, not a deployed mobile application or a validated safety system.") |

No repository URL was supplied (none in the content file or in earlier data), so `links.repository: null`: no GitHub link on the card and no Links section. No screenshots, so no cover and no image frame. Constraints: it's a Python simulation (SQLite users and positions, simulated movement, distance-based proximity detection, a CrewAI agent on Groq / Llama 3.3 70B recommending allow/block, decisions stored). The social app (notifications, photos, encounter collection) is only the original concept. Never claim a finished mobile app, real GPS, push notifications, photo capture, deployed matching, guaranteed safety, users or performance figures. The applicant didn't supply source code, so the stack couldn't be checked against a repository (unlike the Solver).

Prev/next order of project pages is now Customs → LayerGuard → Radar → Solver → BUMP. The Solver page gained a "Next project: BUMP" link (automatic).

## Verification

Run all three before finishing any change:

```
npm run typecheck
npm run lint
npm run build
```

Browser checks: Playwright (`playwright-core`) and Chrome (`C:\Program Files\Google\Chrome\Application\chrome.exe`) are set up in `C:\Users\sever\AppData\Local\Temp\portfolio-verify\`. Useful scripts there:
- `visibility-check.mjs`: draft build on port 4173 and published build on port 4174, desktop and mobile. Checks for no placeholder text, no broken same-page anchors, a sidebar that matches the rendered sections, real-media-only frames and the Customs text/images.
- `customs-check.mjs`: Customs page images, gallery order, sizes and the enlarge dialog.
- `customs-check.mjs` also checks that the homepage card and the hero are both `main-menu.png`, the hero is (16:9, `object-contain`), the page image sequence 1–4 has no duplicates, and the hero opens in the viewer.
- `layerguard-check.mjs`: LayerGuard card, sections/sidebar, all approved paragraphs, hero ratio, award fields, certificate preview and dialog, and the PDF served unmodified (both modes, desktop and mobile).
- `radar-check.mjs`: Radar card and hero use `processed/radar-overview.png`, gallery is `processed/radar-customs.png` only, the viewer opens the processed copies, 5 sections + sidebar, all 16 paragraphs, no names/LinkedIn/placeholder text, and no original screenshot served under `/media/opportunity-radar/` (both modes, desktop and mobile). `visibility-check.mjs` and `customs-check.mjs` were updated for the filled-in Radar.
- `mathai-check.mjs`: Mathematical Solver card (status, category, verbatim summary, 8 tags, no media, GitHub link on top of the card link and opening the repo in a new tab, card body opening the page), the BUMP card linking only to its page, page sections and sidebar (Why I Built It / What I Built / Links), the 4 verbatim paragraphs, no media frames, no placeholder or overclaiming text, the prev/next links (Radar ← Solver → BUMP) and the repository URL responding 200 (both modes, desktop and mobile).
- `bump-check.mjs`: BUMP card (Solver then BUMP order, status, category, verbatim summary, 5 tags, no media, only link is its own page, same row height as the Solver card on desktop), the Solver card unchanged, page sections and sidebar (Why I Built It / What I Built only), the 8 verbatim paragraphs, no Links section or GitHub link, no media frames, no placeholder text, no overclaims (GPS, push notifications, app stores, "guarantee", percentages; "deployed"/"validated" only in the negated sentence), and prev = Solver with no next (both modes, desktop and mobile).
- `identity-check.mjs`: navbar name, the single `<h1>` "David Gala", the label, the verbatim intro, the Selected Work panel (beside the text and bottom-aligned on desktop, stacked on tablet and mobile), the footer, and tab titles. Draft build only, on port 4173.

Windows gotcha: stopping a background `npx vite preview` task leaves its `node.exe` child holding the port. Find it via `Get-CimInstance Win32_Process` (command line contains `vite ... preview`) and stop it, or start the server with `node node_modules/vite/bin/vite.js preview` directly.
