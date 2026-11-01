# Personal Portfolio

A personal builder's portfolio: a static single-page site that presents projects as structured case studies (the problem, what was built, how it works, challenges, lessons and results).

The site is currently in **draft mode**. The design, routing and content structure are finished. The personal text and media are intentionally empty so that the author can write them. See [What remains incomplete](#what-remains-incomplete) and the [Pre-Submission Checklist](#pre-submission-checklist).

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
    placeholders.ts         draft-only placeholder text
  types/
    project.ts              the project content model (with field documentation)
    site.ts                 site, contact and timeline types
  components/
    layout/                 Navbar, Footer, PageContainer, RootLayout, MessagePage
    home/                   Hero, FeaturedProjects, OtherExperiments, Journey, Contact
    projects/               ProjectCard, ExperimentCard, ProjectDetailLayout, ProjectHero,
                            ProjectSection, ProjectSectionContent, ProjectMedia,
                            ChallengeBlock, ProjectNavigation
    ui/                     Button, Badge, SectionHeading, MediaPlaceholder, Draft, Prose, Icons
  pages/                    Home, ProjectDetail, NotFound, ErrorPage
  lib/                      small helpers (project selectors, draft mode, page titles)
  styles/globals.css        design tokens (colours, fonts) and global styles
  App.tsx                   routes
public/
  media/<project>/          screenshots and videos, one folder per project
  certificates/             award certificates (PDF)
  favicon.svg               placeholder icon, replace when ready
vercel.json                 SPA rewrite so deep links work after deployment
```

The content is kept separate from the layout. You should never need to edit a component to add text, change a status, attach an image or add a project.

### Content conventions

- `null` means not provided yet, and `[]` means nothing written yet.
- In **draft** mode, empty content shows neutral placeholders and dashed "Draft" notes. In **published** mode, it is hidden automatically.
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
| `name` | navigation bar, hero, footer, browser tab title |
| `discipline`, `interests` | small label above the hero |
| `hero.heading` | the large hero sentence |
| `hero.introduction` | the paragraph(s) below it |
| `hero.secondaryLink` | optional second hero button, e.g. `{ label: 'GitHub profile', url: 'https://github.com/<username>' }` |
| `about.introduction` | text beside the journey timeline |
| `contact.*` | contact section, plus a GitHub link in the navigation bar |

The Featured Projects, Other Experiments and hero project index are generated from `src/data/projects.ts`. The timeline comes from `src/data/journey.ts`.

## Updating the name and personal links

In `src/data/site.ts`:

```ts
name: 'Your Full Name',
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
| A — Overview | `title`, `category`, `status` / `statusLabel`, `timeframe`, `summary`, `technologies`, `cover` |
| B — The Problem | `problem` |
| C — What I Built | `built.overview`, `built.features`, `built.contributions`, `built.implementation` |
| D — How It Works | `howItWorks.intro`, `howItWorks.steps`, `howItWorks.gallery` |
| E — Challenges & Decisions | `challenges[]` with `title`, `description`, `difficulty`, `approach`, `outcome` |
| F — What I Learned | `lessons.technical`, `lessons.product`, `lessons.research`, `lessons.thinking` |
| G — Results & Next Steps | `results.demonstrated`, `results.recognition`, `results.traction`, `results.limitations`, `results.nextSteps` |
| H — Links | `links.repository`, `links.liveDemo`, `links.video`, `links.documentation`. Award certificates are added automatically from `results.recognition`. |

Every field is documented in `src/types/project.ts`, and TypeScript will flag mistakes when you run `npm run build`.

**Status:** `status` is one of `'in-development'`, `'prototype'` or `'experiment'`, which sets the colour and default label. `statusLabel` overrides the wording, for example `'Hackathon Prototype'`.

**Awards:** add them to `results.recognition` using the exact wording on the certificate. Keep `verified: false` until every field has been checked against the official document. Unverified awards appear only in draft mode, marked "Pending verification", and are hidden once the site is published.

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
- If a path is wrong, a neutral "Media could not be loaded" frame appears instead of a broken icon, and the dev console prints the faulty path.
- Prefer WebP, around 1600–2000 px wide. Only use authentic screenshots of your own work.

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

To give one of the current experiments its own page, set `hasDetailPage: true` and fill in its sections.

## Draft and published mode

`portfolioStatus` in `src/data/site.ts`:

- `'draft'`: placeholders, dashed "Draft" notes, empty contact slots, unverified awards and a small "Draft version" badge in the footer are visible.
- `'published'`: all of those are hidden. Empty sections disappear from project pages and from "On this page".

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

> The site has not been deployed, and no remote repository has been created.

---

## What remains incomplete

Everything below must come from the author. None of it has been invented.

**Identity and homepage (`src/data/site.ts`)**
- Name.
- Hero heading and personal introduction.
- About / journey introduction.
- Contact introduction, email, GitHub, LinkedIn and resume.
- Static `<title>` and description in `index.html`.

**Journey (`src/data/journey.ts`)**
- The text for all five milestones (and dates, if wanted).
- Optional related projects for milestones 1, 2 and 5. Milestones 3 and 4 are linked to the hackathon and opportunity projects.

**Projects (`src/data/projects.ts`)**
- All three featured projects: timeframe, technologies, cover media and Sections B–H (problem, what was built, how it works, challenges, lessons, results and links).
- The one-line summaries currently come from the project brief. Confirm them or rewrite them in your own words.
- 3D Printer AI Diagnostic Assistant: the exact award title, competition name, category, date and certificate. Then set `verified: true`.
- Other Experiments: category, cover image, technologies and links.

**Media and branding**
- Authentic screenshots and videos in `public/media/…`.
- The certificate PDF in `public/certificates/`.
- A final favicon (`public/favicon.svg`) if you want one.

**Known technical limitations**
- As with any static SPA, unknown URLs show the designed 404 page but return HTTP 200.
- Page titles are set by JavaScript. Link previews on social platforms use the static tags in `index.html`.

---

## Pre-Submission Checklist

- [ ] Personal name added (`site.ts` and `index.html`)
- [ ] Introduction written by the applicant, in their own words
- [ ] Project descriptions completed (summaries confirmed, Sections B–H written)
- [ ] Authentic screenshots included (no mock-ups, stock or AI-generated images), all with alt text
- [ ] Award details verified against the certificate (`verified: true`, certificate linked)
- [ ] Project links checked (repository, demo, video, documentation all open correctly)
- [ ] Contact details supplied and tested (email opens, profiles load)
- [ ] No fictional information anywhere (no invented metrics, users, dates, or results)
- [ ] No visible draft placeholders: set `portfolioStatus: 'published'` and review every page
- [ ] Mobile responsiveness verified on a real phone
- [ ] All routes tested, including direct visits/refresh on each project URL and an unknown URL (404)
- [ ] Final site URL verified after deployment
