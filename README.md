# Personal Portfolio

A personal builder's portfolio: a static single-page site that presents projects as structured case studies (the problem, what was built, how it works, challenges, lessons and results).

The site is currently in **draft mode**. The design, routing and content structure are finished. The identity (David Gala), the homepage hero, all three featured projects and both experiments (Multi-Agent Mathematical Solver and BUMP) are filled in. The About and Contact text and a few project fields are still empty so that the author can write them; empty content is simply not rendered. See [What remains incomplete](#what-remains-incomplete) and the [Pre-Submission Checklist](#pre-submission-checklist).

---

## Technology

| Purpose | Tool |
| --- | --- |
| UI | React 19 + TypeScript |
| Build / dev server | Vite 8 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`, configured in CSS) |
| Routing | React Router 8 (static SPA) |
| Icons | Lucide React |
| Font | Inter (self-hosted through `@fontsource-variable/inter`, so there are no third-party font requests) |
| Linting | Oxlint (with React, TypeScript and jsx-a11y rules) |
| Hosting target | Vercel (static) |

There is no backend, database, CMS, authentication or analytics.

---

## Running the project

Requires Node.js 22.22 or newer (developed with Node 24) and npm.

```bash
npm install          # install dependencies
npm run dev          # start the dev server at http://localhost:5173
npm run build        # type-check and create the production build in dist/
npm run preview      # serve the production build at http://localhost:4173
npm run lint         # run Oxlint
npm run typecheck    # TypeScript check only
```

---

## Where things live

```text
src/
  data/                     ← CONTENT: edit these files
    site.ts                 name, hero text, about intro, contact links, draft/published switch
    projects.ts             every project and its case-study sections
    journey.ts              About / My Journey timeline
    labels.ts               interface wording (section titles, button labels)
    placeholders.ts         status messages only (broken media, pending award verification)
  types/
    project.ts              the project content model (with field documentation)
    site.ts                 site, contact and timeline types
  components/
    layout/                 Navbar, Footer, PageContainer, RootLayout, MessagePage
    home/                   Hero, FeaturedProjects, OtherExperiments, Journey, Contact
    projects/               ProjectCard, ExperimentCard, ProjectDetailLayout, ProjectHero,
                            ProjectSection, ProjectSectionContent, ProjectMedia,
                            ChallengeBlock, ProjectNavigation
    ui/                     Button, Badge, SectionHeading, MediaPlaceholder, Prose, Icons
  pages/                    Home, ProjectDetail, NotFound, ErrorPage
  lib/                      helpers: content emptiness rules (content.ts), homepage section
                            visibility (homeSections.ts), media previews, project selectors
  styles/globals.css        design tokens (colours, fonts) and global styles
  App.tsx                   routes
public/
  media/<project>/          screenshots and videos, one folder per project
  certificates/             award certificates (PDF)
  favicon.svg               placeholder icon, replace when ready
private-media/              unredacted original screenshots: gitignored, never deployed
vercel.json                 SPA rewrite so deep links work after deployment
```

The content is kept separate from the layout. You should never need to edit a component to add text, change a status, attach an image or add a project.

### Content conventions

- `null` means not provided yet, and `[]` means nothing written yet.
- **Only real content is rendered, in every mode.** Empty fields, sections, cards, media frames and links are hidden automatically, and so are their navigation entries ("On this page", navbar, footer). Whitespace, `null`, `[]` and leftover text such as "TODO" or "To be added" all count as empty. Fill in a field and it appears; nothing else needs changing.
- Lines marked `TODO(applicant)` show what still needs your input.
- Paragraph fields are arrays with one string per paragraph:

```ts
problem: [
  'First paragraph…',
  'Second paragraph…',
],
```

---

## Editing the homepage

All homepage text is in **`src/data/site.ts`**:

| Field | Shown in |
| --- | --- |
| `name` | navigation bar, footer, browser tab titles (homepage: "`<name>` \| Portfolio"; other pages: "`<page>` · `<name>`") |
| `discipline`, `interests` | small label above the hero, uppercase and separated by `·` |
| `hero.heading` | the large hero heading, which is the page's `<h1>` (currently the name, "David Gala"). Falls back to `name` if empty |
| `hero.introduction` | the paragraph(s) below it |
| `hero.secondaryLink` | optional second hero button, e.g. `{ label: 'GitHub profile', url: 'https://github.com/<username>' }` |
| `about.introduction` | text beside the journey timeline |
| `contact.*` | contact section, plus a GitHub link in the navigation bar |

The Featured Projects, Other Experiments and hero project index are generated from `src/data/projects.ts`. The timeline comes from `src/data/journey.ts`.

## Updating the name and personal links

The name is set (`name: 'David Gala'`, and the same in `index.html`). Personal links are still empty. When they're available, add them in `src/data/site.ts`:

```ts
name: 'David Gala',
contact: {
  introduction: [],
  email: 'you@example.com',                       // plain address, no "mailto:"
  github: 'https://github.com/<username>',
  linkedin: 'https://www.linkedin.com/in/<username>',
  resume: '/resume.pdf',                          // put the file in public/
},
```

Links that are left as `null` are never rendered as buttons. Also update `<title>` and `<meta name="description">` in `index.html`; these are the static fallbacks that search engines and link previews see first.

---

## Editing a project

Each project in **`src/data/projects.ts`** maps onto the shared page template:

| Template section | Field(s) |
| --- | --- |
| A — Overview | `title`, `category`, `status` / `statusLabel`, `timeframe`, `summary`, `technologies`, `cover`, `featuredMedia` (optional page-only image; falls back to `cover`) |
| B — The Problem | `problem` |
| C — What I Built | `built.overview`, `built.features`, `built.contributions`, `built.implementation` |
| D — How It Works | `howItWorks.intro`, `howItWorks.steps`, `howItWorks.gallery`, `howItWorks.galleryLayout` (`'grid'` or `'stacked'`) |
| E — Challenges & Decisions | `challengesOverview` (paragraphs), `challenges[]` with `title`, `description`, `difficulty`, `approach`, `outcome` |
| F — What I Learned | `lessons.overview` (paragraphs), `lessons.technical`, `lessons.product`, `lessons.research`, `lessons.thinking` |
| G — Results & Next Steps | `results.overview` (paragraphs), `results.demonstrated`, `results.recognition`, `results.traction`, `results.limitations`, `results.nextSteps` |
| H — Links | `links.repository` (shown as "View Source on GitHub"), `links.liveDemo`, `links.video`, `links.documentation`. Award certificates are added automatically from `results.recognition`. |

Every field is documented in `src/types/project.ts`, and TypeScript will flag mistakes when you run `npm run build`.

**Section headings:** when your text names a section differently, set `sectionTitles`, for example `sectionTitles: { problem: 'Why I Built It' }`. The heading and the "On this page" entry both change. Other sections keep their default titles.

**Status:** `status` is one of `'in-development'`, `'prototype'` or `'experiment'`, which sets the colour and default label. `statusLabel` overrides the wording, for example `'Hackathon Prototype'`.

**Awards:** add them to `results.recognition` using the exact wording on the certificate. An optional `certificatePreview` image (for example the certificate's first page) is shown inside the award. Keep `verified: false` until every field has been checked against the official document. Unverified awards appear only in draft mode, marked "Pending verification", and are hidden once the site is published.

## Replacing media placeholders

1. Put the file in the project's folder, for example `public/media/customs/review-screen.webp`.
   Folders: `customs/`, `printer-ai/`, `opportunity-radar/`, `mathematical-assistant/`, `safety-simulation/`. Certificates go in `public/certificates/`.
2. Reference it in `src/data/projects.ts`. The path starts at `/media/…`, without `public`.

```ts
// Main preview (cards + project overview)
cover: {
  type: 'image',
  src: '/media/customs/review-screen.webp',
  alt: 'Describe what the screenshot shows',
  aspectRatio: '16 / 10',          // match the real image to avoid cropping / layout shift
},

// Gallery in "How It Works" (any number, each with an optional caption)
howItWorks: {
  intro: [],
  steps: [
    { title: 'Step title', description: '…', media: { type: 'image', src: '/media/…', alt: '…' } },
  ],
  gallery: [
    { type: 'image', src: '/media/customs/validation.webp', alt: '…', caption: '…' },
    { type: 'video', src: '/media/customs/demo.mp4', title: 'What the clip shows', poster: '/media/customs/demo-poster.webp' },
    { type: 'external-video', url: 'https://www.youtube.com/watch?v=<id>', title: 'What the video shows' },
  ],
},
```

- Supported: PNG, JPG and WebP images, MP4 video (optionally with `captions: '/media/…/file.vtt'`), external video links, and PDF certificates.
- Images on project pages can be clicked to enlarge them. Lazy loading is automatic, and the cover loads first.
- With no `cover`, cards and the project page show no image frame at all.
- If a path is wrong, a neutral "Media could not be loaded" frame appears instead of a broken icon, and the dev console prints the faulty path.
- Prefer WebP, around 1600–2000 px wide. Only use authentic screenshots of your own work.
- **Screenshots with personal data:** everything in `public/` is deployed. Keep unredacted originals in `private-media/` (gitignored, never deployed) and put only processed, privacy-safe copies in `public/media/…`. Business Opportunity Radar already works this way: `public/media/opportunity-radar/processed/`.

## Adding another project

Add a `defineProject({...})` entry to the `projects` array in `src/data/projects.ts`:

```ts
defineProject({
  slug: 'my-new-project',          // URL: /projects/my-new-project (must be unique)
  title: 'My New Project',
  category: 'Category / Subcategory',
  status: 'experiment',
  featured: false,                 // true → Featured Projects; false → Other Experiments
  hasDetailPage: true,             // generate a case-study page (default: same as `featured`)
  summary: 'One or two sentences.',
  // every other field is optional and defaults to empty
}),
```

The card, project page, route, hero index, page title and previous/next links are created automatically. Featured projects are numbered in the order they appear in the array.

To give one of the current experiments its own page, set `hasDetailPage: true` and fill in its sections. Both current experiments work this way: each card opens a short page. The Mathematical Solver's repository link also appears on its card. BUMP has no repository, so it has no link.

## Draft and published mode

`portfolioStatus` in `src/data/site.ts`:

Empty content is hidden in **both** modes; the site never shows placeholders. The mode only affects unverified awards:

- `'draft'`: unverified awards are visible, marked "Pending verification".
- `'published'`: unverified awards are hidden.

Because empty content is already hidden, what you see in draft mode is what visitors will see, apart from unverified awards.

Switch to `'published'` only after completing the checklist below.

---

## Deploying to Vercel

The project is a standard Vite static site, so Vercel detects it automatically.

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected settings: framework **Vite**, build command `npm run build`, output directory `dist`.
4. Deploy, then open a project URL directly (for example `/projects/customs-documentation`) and refresh it to confirm deep links work.

Alternatively, from the command line: `npx vercel` (preview) and `npx vercel --prod` (production).

`vercel.json` rewrites every path to `index.html`, so direct visits and refreshes on nested routes work. Real files in `dist/` (assets, media, certificates) are still served normally.

> The code is on GitHub at [davizuco01-sudo/portfolio-horowitz](https://github.com/davizuco01-sudo/portfolio-horowitz) (branch `main`). The site has not been deployed to Vercel yet.
>
> Never commit secrets or private files. `.gitignore` excludes `node_modules/`, `dist/`, `.env` / `.env.*` files, `.vercel/` and `private-media/` (the unredacted screenshots). The site itself needs no environment variables or API keys.

---

## What remains incomplete

Everything below must come from the author. None of it has been invented.

**Identity and homepage (`src/data/site.ts`)**
- Done: name ("David Gala"), hero label, heading ("David Gala") and introduction, and the static `<title>` ("David Gala | Portfolio") and description in `index.html`.
- About / journey introduction.
- Contact introduction, email, GitHub, LinkedIn and resume.

**Journey (`src/data/journey.ts`)**
- The text for all five milestones (and dates, if wanted).
- Optional related projects for milestones 1, 2 and 5. Milestones 3 and 4 are linked to the hackathon and opportunity projects.

**Projects (`src/data/projects.ts`)**
- Customs Documentation AI: Sections B–F and the screenshots are done (from `CUSTOMS_CONTENT.md`). The project page opens with `main-menu.png`, followed by the document case, review dashboard and source traceability screenshots. The homepage card uses `main-menu.png` too (it is the project's `cover`). Still missing: Section G "Current Status & Next Steps" (the source file ends mid-sentence), the timeframe and any links.
- LayerGuard (AI-Powered 3D Printing Assistant): done from `LAYERGUARD_CONTENT.md`, including the verified award, the ceremony photo and the certificate. Optional: timeframe. It has no screenshots and no repository, so "How It Works" and a source-code link are intentionally absent.
- Business Opportunity Radar: done from `RADAR_CONTENT.md` (The Problem, What I Built, Challenges & Decisions, Results & Next Steps) with two privacy-safe screenshots: the dashboard overview (card + page) and the customs opportunity (gallery). Personal details were removed from both, and the originals are kept in `private-media/`, outside the deployed site. Still optional: a third "AI Analysis" screenshot, a timeframe and any links. It has no "What I Learned" text, so that section stays hidden.
- Multi-Agent Mathematical Solver: done from `MATHAI_CONTENT.md` (Why I Built It, What I Built, and the GitHub repository link). It has a short page and no screenshots, so no image frame is shown. Optional: an authentic screenshot and a timeframe.
- BUMP — Agentic Proximity Safety: done from `BUMP_CONTENT.md` (Why I Built It and What I Built), presented as a simulation. It has no screenshots and no repository, so there is no image frame and no Links section. Optional: an authentic screenshot, a repository URL and a timeframe.

**Media and branding**
- Authentic screenshots and videos in `public/media/…` for the Other Experiments (optional for both) (and optionally a third Business Opportunity Radar screenshot). (The LayerGuard certificate is already in `public/media/printer-ai/`.)
- A final favicon (`public/favicon.svg`) if you want one.

**Known technical limitations**
- As with any static SPA, unknown URLs show the designed 404 page but return HTTP 200.
- Page titles are set by JavaScript. Link previews on social platforms use the static tags in `index.html`.

---

## Pre-Submission Checklist

- [x] Personal name added (`site.ts` and `index.html`)
- [x] Hero introduction written by the applicant, in their own words (About introduction still empty)
- [ ] Project descriptions completed (summaries confirmed, Sections B–H written)
- [ ] Authentic screenshots included (no mock-ups, stock or AI-generated images), all with alt text
- [x] Award details verified against the certificate (`verified: true`, certificate linked). Done for LayerGuard, the only award.
- [ ] Project links checked (repository, demo, video, documentation all open correctly)
- [ ] Contact details supplied and tested (email opens, profiles load)
- [ ] No fictional information anywhere (no invented metrics, users, dates, or results)
- [ ] Set `portfolioStatus: 'published'` and review every page (unverified awards disappear)
- [ ] Mobile responsiveness verified on a real phone
- [ ] All routes tested, including direct visits/refresh on each project URL and an unknown URL (404)
- [ ] Final site URL verified after deployment
