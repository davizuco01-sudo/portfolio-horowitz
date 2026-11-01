# MASTER BUILD INSTRUCTIONS — PERSONAL PORTFOLIO

## 1. YOUR ROLE

You are acting as a **Senior Frontend Engineer, Product Designer, UX/UI Specialist, and Software Architect**.

You are responsible for designing and implementing the complete initial foundation of a personal portfolio website intended for a highly selective technology and entrepreneurship academy application.

You must approach this as a real professional software project, not as a quick website mockup.

Your responsibilities include:

- Designing a cohesive and polished user interface.
- Establishing a maintainable software architecture.
- Creating reusable components.
- Implementing fully functional navigation.
- Preparing the entire portfolio content structure.
- Ensuring excellent responsive behavior.
- Maintaining accessibility and performance.
- Making future content integration straightforward.
- Verifying that the application builds and runs successfully.

**Your task is to build the portfolio infrastructure and visual experience, NOT to invent or write the applicant's personal story.**

The applicant will provide all substantive personal descriptions, project explanations, achievements, and reflections later.

This distinction is essential.

---

## 2. PROJECT CONTEXT

The portfolio belongs to a 19-year-old student currently studying Mathematical Engineering in Spain.

Over approximately nine months, the applicant has independently explored artificial intelligence, AI-assisted software development, automation, APIs, databases, and application development.

The applicant has created several independent projects and is particularly interested in building technology that solves practical problems.

The portfolio is being prepared for an application to **Horowitz Andreessen Academy**, associated with Andreessen Horowitz (a16z).

The academy places significant emphasis on evidence of independent work, initiative, projects built, personal contributions, technical challenges, and learning.

The purpose of the website is to allow an admissions evaluator to quickly understand:

1. What the applicant has built.
2. Why each project was started.
3. What the applicant personally contributed.
4. Which technical challenges were encountered.
5. What was learned.
6. Which results can be demonstrated.
7. How the applicant's interests and capabilities have evolved.

**Important:** This is not a conventional software developer job portfolio, a commercial agency website, or a startup landing page.

It is a personal builder's portfolio.

The site should communicate technical competence, intellectual curiosity, initiative, clarity, and thoughtful execution through its design and organization.

Do not use exaggerated marketing language.

Do not create the impression that the applicant has commercial achievements, users, customers, or professional experience that have not been verified.

---

## 3. CURRENT OBJECTIVE AND SCOPE

This is PHASE 1: **Build the complete visual and technical foundation.**

At this stage, the portfolio must have:

- A complete design system.
- A finished responsive layout.
- All required pages.
- Functional routing and navigation.
- Reusable project templates.
- Well-organized content structures.
- Clearly defined media locations.
- Safe placeholders for missing information.
- Working build and development commands.
- Documentation explaining how to add real content.

The site must look coherent and intentionally designed even while the personal content is incomplete.

However, this is a **draft portfolio**, not a finished admissions submission.

Do not attempt to disguise missing content by generating fictional material.

Use appropriate placeholder states where necessary.

The final result should be a working website whose structure and design are already established, and where future work mainly consists of replacing placeholders with real content and media.

### Explicit exclusions

Do not:

- Write the applicant's autobiography.
- Invent project descriptions.
- Invent technical obstacles or lessons learned.
- Fabricate statistics or achievements.
- Invent testimonials or client names.
- Create fictional GitHub links or email addresses.
- Invent dates, employment history, or education details.
- Generate fake screenshots of completed applications.
- Use misleading AI-generated project imagery.
- Create a backend or database.
- Add authentication.
- Integrate AI APIs.
- Add unnecessary dependencies.
- Add decorative features unrelated to the portfolio's objective.
- Deploy the website or push code to remote repositories without explicit authorization.

If information is missing, leave a structured placeholder.

Do not compensate for missing data with assumptions.

---

## 4. REQUIRED TECHNOLOGY STACK

Use the following stack:

**Core**

- React
- TypeScript
- Vite
- Tailwind CSS

**Navigation**

- React Router, using a version compatible with the installed React environment.

**Icons**

- Lucide React.

**Deployment target**

- Vercel, using its standard static frontend deployment workflow.

**Package manager**

- npm.

Use stable compatible package versions.

Follow the official current setup for Vite and Tailwind CSS. In particular, use Tailwind's current Vite integration rather than copying an obsolete Tailwind configuration.

Do not introduce Next.js, a CMS, authentication infrastructure, a database, or server-side rendering.

This is primarily a static website.

A static SPA architecture is sufficient.

Ensure direct navigation and browser refresh work on every project route after deployment to Vercel. Include the necessary SPA rewrite configuration if required.

### Initial repository handling

Before making changes:

1. Inspect the current project directory.
2. Determine whether a project already exists.
3. If the directory is empty, initialize the application.
4. If an existing application exists, inspect its files and dependencies before modifying anything.
5. Do not delete or overwrite unrelated existing work.
6. Do not force Git operations or rewrite repository history.

Proceed autonomously with ordinary implementation decisions. Ask for clarification only if there is a genuine blocker or a potentially destructive operation.

---

# 5. VISUAL DESIGN DIRECTION

## Overall aesthetic

Create a modern, minimal, sophisticated portfolio with an engineering and technology-oriented visual identity.

The design should feel like a thoughtfully crafted personal website by a technically capable builder.

It should not resemble:

- A generic AI-generated SaaS landing page.
- A cryptocurrency dashboard.
- A gaming website.
- A corporate consulting company.
- A generic developer resume template.
- A flashy startup pitch deck.

Use a restrained, editorial design approach.

Prioritize information hierarchy, typography, alignment, spacing, and authentic project evidence.

The visual experience should be premium but understated.

## Color palette

Use a dark-first design system.

Suggested foundation:

- Main background: `#111827`
- Elevated surface: `#1B2535`
- Secondary surface: `#243047`
- Primary text: `#F3F5F9`
- Secondary text: `#B8C3D3`
- Muted text: `#8493A7`
- Accent blue: `#79A8F8`
- Subtle borders: muted slate tones.

You may refine these values slightly to improve contrast, consistency, or accessibility.

Centralize the colors in reusable design tokens or theme variables.

Avoid bright neon palettes, excessive gradients, glassmorphism everywhere, and unnecessary glowing effects.

## Typography

Use clean, contemporary typography with strong hierarchy.

Prefer Inter or a high-quality system font stack.

Requirements:

- Large, confident headings.
- Highly readable paragraphs.
- Clear distinction between headings, labels, body text, and metadata.
- Consistent line height.
- Comfortable maximum reading width.
- Good contrast.
- Restrained use of uppercase metadata labels.

## Layout

Use a responsive grid with a centered content container.

Suggested maximum main width: approximately 1120–1200px.

Use generous whitespace.

The website must remain visually balanced on:

- Large desktop screens.
- Standard laptops.
- Tablets.
- Mobile devices.

Avoid overly wide paragraphs.

Avoid extremely dense project cards.

## Interactions and animations

Use subtle, functional interactions:

- Smooth but restrained hover transitions.
- Clear focus states.
- Small hover effects on project cards.
- Simple mobile navigation.
- Optional restrained section entrance effects.

Respect `prefers-reduced-motion`.

Avoid:

- Complex loading animations.
- Parallax.
- 3D scenes.
- Particle backgrounds.
- Continuous decorative movement.
- Unnecessary scroll hijacking.

The portfolio should feel fast and responsive.

---

# 6. WEBSITE INFORMATION ARCHITECTURE

Create the following routes:

```text
/
├── Home
│   ├── Hero / Introduction
│   ├── Featured Projects
│   ├── Other Experiments
│   ├── About / My Journey
│   └── Contact / Footer
│
├── /projects/customs-documentation
│
├── /projects/3d-printer-assistant
│
├── /projects/opportunity-radar
│
└── 404 Not Found
```

All three project routes must exist and work from the first implementation.

They must share a reusable project detail template.

Do not implement separate hardcoded layouts that would require rebuilding each page individually.

The architecture must allow future projects to be added through structured data.

---

# 7. HOME PAGE

## 7.1 Navigation bar

Create a minimal navigation bar.

Left side:

- Personal name or a temporary clearly identified placeholder.
- Clicking it returns to Home.

Right side:

- Work
- About
- Contact
- GitHub, only when a real URL is supplied.

The section links should work correctly.

On mobile, implement an accessible navigation menu if necessary.

Do not create links with `href="#"` merely to simulate functionality.

If a real external URL has not been provided, omit or disable that external link appropriately.

## 7.2 Hero section

The Hero is the introductory section.

It must contain space for:

- The applicant's name.
- A small educational/disciplinary label.
- A strong personal introductory heading.
- A short personal introduction.
- A primary link to Featured Work.
- An optional secondary external link.

Known educational context:

- Mathematical Engineering student.
- Interested in AI and building software.

Do not invent personal slogans, inspirational quotes, or a mission statement.

Provide configurable fields for the real content.

During the draft phase, use neutral visible placeholders such as:

- `Your Name`
- `Personal introduction to be added`
- `A short explanation of what I build and why`

These placeholders are scaffolding, not final content.

The Hero must still look visually complete in terms of layout, spacing, and proportions.

## 7.3 Featured Projects

This is the primary section of the homepage.

Create three featured project cards in the following order.

### Project 01 — Customs Documentation AI

Classification:

- Featured project.
- Applied AI / Document Processing.
- Current status: In Development.

High-level known functionality:

An application under development for extracting and structuring information from heterogeneous customs documents, with automated validation and human review.

Do not write a finished project case study.

### Project 02 — 3D Printer AI Diagnostic Assistant

Classification:

- Featured project.
- Multimodal AI / Rapid Prototyping.
- Current status: Hackathon Prototype.

Known context:

A prototype designed to assist users troubleshooting 3D printers using visual input and conversational assistance.

It received third place in a category of a national AWS generative AI competition.

The precise official award title and category wording should remain configurable until verified against the certificate.

Do not invent competition statistics or technical performance results.

### Project 03 — Business Opportunity Radar

Classification:

- Featured project.
- Research Tools / Automation.
- Current status: Independent Experiment.

Known context:

An experimental system for collecting and analyzing publicly available signals about potential business problems.

The applicant used this project as part of an attempt to identify opportunities worth investigating.

Do not suggest that the system has proven market demand or generated commercial revenue.

### Featured project card layout

Each card should support:

- Project number.
- Project title.
- Category.
- Status.
- One short description.
- Preview image or media.
- Optional technology tags.
- Link to detailed project page.

The cards should be visually substantial without being excessively large.

Use a responsive arrangement.

The first project may receive additional visual prominence as the main featured project.

All cards must be keyboard-accessible and their navigation must work.

### Media placeholders

No authentic screenshots have been supplied yet.

Create elegant placeholder media frames using CSS and typography.

Do not generate fake application screenshots.

Do not download random stock images to represent the applicant's projects.

Placeholders may display:

`Project preview to be added`

Make it straightforward to replace each placeholder with a real image or video later.

---

## 7.4 Other Experiments

Create a separate section named:

**Other Experiments**

This section will contain smaller projects.

Initially create two entries.

### Mathematical AI Assistant

An early experiment involving AI-assisted mathematical problem solving and PDF explanations.

### Multi-Agent Safety Simulation

An experiment involving multiple AI agents analyzing or debating safety scenarios.

These are secondary projects.

Use smaller cards than those in the Featured Projects section.

For now, they do not need dedicated detail pages.

Do not create clickable navigation to pages that do not exist.

The card component should support future expansion into full project pages.

Each secondary project should eventually support:

- Title.
- Category.
- Short description.
- Thumbnail.
- Optional technologies.
- Optional project link.

Keep unknown fields empty.

---

## 7.5 About / My Journey

Create a dedicated section for the applicant's personal background and progression.

This is not intended to be a conventional CV.

It should communicate how the applicant's interests evolved through independent experimentation and building.

Create a visually appealing and configurable timeline or narrative layout with five structural milestones:

1. Initial curiosity about AI.
2. Learning through independent software projects.
3. Participating in a generative AI hackathon.
4. Exploring business opportunities.
5. Working toward real-world applications.

These are organizational headings, not complete biographical claims.

Each milestone should have:

- Title.
- Optional date.
- Short body.
- Optional related project.
- Optional icon or visual element.

Do not invent dates.

Do not generate the actual personal story.

The applicant will write the content independently.

The timeline must still render cleanly with empty descriptions.

---

## 7.6 Contact and footer

Include space for:

- GitHub.
- LinkedIn.
- Email.
- Optional resume link.

Only display active links when real destinations have been configured.

Do not invent contact information.

Do not add a nonfunctional contact form.

Use a clean footer with simple navigation and a configurable identity.

---

# 8. PROJECT DETAIL PAGE TEMPLATE

This is one of the most important architectural requirements.

Implement a reusable `ProjectDetail` system driven by project data.

Each featured project should use the same visual structure.

The purpose is to support comprehensive project case studies.

Use the following section organization.

## Section A — Project Overview

Display:

- Project title.
- Category.
- Status.
- Optional timeframe.
- Short summary.
- Optional technology tags.
- Main project media.

No dates or technologies should appear unless provided.

## Section B — The Problem

A section explaining:

- What problem motivated the project.
- Why the problem was interesting.
- What made it worth investigating.

Leave room for several paragraphs.

Do not write the content.

## Section C — What I Built

A section explaining the actual application.

Prepare space for:

- Functional overview.
- Core features.
- Personal contributions.
- Important implementation details.

## Section D — How It Works

Create a flexible media and explanation section.

It must support:

- Screenshots.
- Short videos.
- Feature demonstrations.
- Architecture diagrams.
- Captions.
- Optional numbered steps.

An image should not be required for the page to render properly.

Create reusable media components.

## Section E — Challenges & Decisions

Prepare space for technical difficulties and decisions.

Each challenge entry should support:

- Challenge title.
- Description.
- What made it difficult.
- Approach taken.
- Result or current limitation.

Create reusable challenge blocks.

Do not invent challenges.

## Section F — What I Learned

Prepare a flexible section for:

- Technical lessons.
- Product lessons.
- Research insights.
- Changes in thinking.

The applicant will write the content himself.

## Section G — Results & Next Steps

Prepare space for:

- Demonstrated results.
- Awards or recognition.
- Usage or traction, only if documented.
- Current limitations.
- Planned next steps.

Never fabricate metrics.

Do not generate fictional user counts, adoption figures, testimonials, monetary values, or accuracy percentages.

## Section H — Links

Support optional links to:

- GitHub repository.
- Live demonstration.
- Video demonstration.
- Award certificate.
- Relevant technical documentation.

If a link is missing, do not render a fake button.

## General requirements for the template

- Every section must be data-driven.
- Missing content must not break the layout.
- Empty optional sections should either show a tasteful draft placeholder or be conditionally hidden.
- Keep the intended section structure clearly documented.
- Include breadcrumb or back-to-projects navigation.
- Support previous/next project navigation where appropriate.
- Ensure direct access to project URLs works.
- Maintain the same visual design language as the homepage.

---

# 9. CONTENT MANAGEMENT ARCHITECTURE

One of the most important objectives is to keep content separate from presentation.

Do not place long project descriptions directly inside JSX components.

Create a central structured content system.

Suggested files:

```text
src/
  data/
    site.ts
    projects.ts
    journey.ts

  types/
    project.ts
    site.ts
```

Create TypeScript interfaces for project information.

A project should support fields equivalent to:

```ts
interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: "in-development" | "prototype" | "experiment";
  featured: boolean;

  summary: string | null;

  technologies: string[];

  media: ProjectMedia[];

  problem: string | null;
  whatIBuilt: string | null;
  howItWorks: ProjectStep[];
  challenges: ProjectChallenge[];
  lessons: string[];
  results: string[];
  nextSteps: string[];

  links: ProjectLinks;
}
```

You may refine the interfaces if necessary.

Prioritize good TypeScript design, clear naming, and straightforward future maintenance.

Use `null` or empty arrays for unknown content.

Do not fill missing values with invented descriptions.

Create a distinction between:

- Content genuinely provided by the applicant.
- Structural section titles.
- Draft placeholders.

Where appropriate, add TODO comments indicating which content must be provided later.

The applicant should be able to add a project, edit text, change a status, or attach an image without editing the page layout.

---

# 10. MEDIA MANAGEMENT

Prepare an organized media directory.

Suggested structure:

```text
public/
  media/
    customs/
    printer-ai/
    opportunity-radar/
    mathematical-assistant/
    safety-simulation/

  certificates/
```

Support:

- PNG.
- JPG.
- WebP.
- MP4 or external video links.
- PDF certificates.

Implement image rendering with proper:

- Aspect ratio handling.
- Alt text.
- Responsive sizing.
- Lazy loading where appropriate.
- Graceful fallbacks.

Use optimized media loading.

Do not generate screenshots that pretend to be real project evidence.

Do not use random internet images as substitutes.

If media is missing, use neutral CSS placeholders.

The project detail page should allow multiple screenshots with captions.

A lightweight image enlargement feature is acceptable if it is accessible and does not add substantial complexity.

---

# 11. COMPONENT ARCHITECTURE

Create a modular component hierarchy.

Suggested structure:

```text
src/
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      PageContainer.tsx

    home/
      Hero.tsx
      FeaturedProjects.tsx
      OtherExperiments.tsx
      Journey.tsx
      Contact.tsx

    projects/
      ProjectCard.tsx
      ProjectHero.tsx
      ProjectDetailLayout.tsx
      ProjectSection.tsx
      ProjectMedia.tsx
      ChallengeBlock.tsx
      ProjectNavigation.tsx

    ui/
      Button.tsx
      Badge.tsx
      SectionHeading.tsx
      MediaPlaceholder.tsx

  pages/
    Home.tsx
    ProjectDetail.tsx
    NotFound.tsx

  data/
    projects.ts
    site.ts
    journey.ts

  types/
    project.ts
    site.ts

  styles/
    globals.css

  App.tsx
  main.tsx
```

You can adjust the structure when there is a clear engineering reason.

Do not create unnecessary abstraction layers.

Prefer understandable, reusable components over large monolithic files or excessive fragmentation.

Use semantic HTML.

Ensure consistent spacing and design tokens.

---

# 12. RESPONSIVENESS AND ACCESSIBILITY

The portfolio must be fully functional on mobile devices.

Requirements:

- Mobile-first responsive implementation.
- Appropriate breakpoints.
- Readable typography on small screens.
- No horizontal overflow.
- Responsive project cards.
- Functional mobile navigation.
- Proper keyboard navigation.
- Visible focus states.
- Semantic heading hierarchy.
- Descriptive accessible labels.
- Appropriate alt text.
- WCAG-conscious color contrast.
- Reduced-motion support.
- Accessible interactive elements.

Use actual links for navigation and actual buttons for actions.

Do not simulate clickable elements using non-interactive containers.

Every visible interactive element must have a real function.

---

# 13. PERFORMANCE AND SEO

The site should be lightweight.

Performance priorities:

- Minimal JavaScript beyond what is required.
- No unnecessary animation libraries.
- Efficient rendering.
- Optimized image handling.
- No large decorative videos.
- Avoid cumulative layout shifts.
- Fast initial loading.
- Minimal dependencies.

Prepare appropriate page titles and metadata.

Do not invent the applicant's name or professional achievements in metadata.

Use neutral configurable defaults until real identity data is supplied.

Support individual document titles for project pages.

Add a simple favicon placeholder that can be replaced later.

Do not present the portfolio as officially affiliated with AWS, Prusa Research, the academy, or a16z.

Awards and related organizations may be mentioned factually when supported by real evidence.

---

# 14. DRAFT CONTENT HANDLING

The site must support a clearly defined draft state.

For example, create a configuration value such as:

```ts
portfolioStatus: "draft"
```

In draft mode:

- Missing content may display tasteful editorial placeholders.
- Missing media displays designed placeholder frames.
- Missing external links are hidden.
- Empty project sections retain a coherent layout.
- The page remains fully navigable.

Avoid an interface covered in large warning messages or excessive "TODO" labels.

The structure should be obvious without looking unfinished or broken.

Document which fields must be completed before final publication.

Do not silently substitute fictional content for missing data.

---

# 15. IMPLEMENTATION PROCESS

Work in the following order.

### Step 1 — Inspect environment

- Review the repository.
- Check available Node.js and npm versions.
- Identify existing files and configuration.
- Determine whether to initialize or extend the project.

### Step 2 — Set up foundation

- Configure Vite, React, and TypeScript.
- Install Tailwind CSS using the correct current method.
- Configure routing.
- Establish the project folder structure.
- Add the global design system.

### Step 3 — Build shared components

- Navigation.
- Footer.
- Containers.
- Typography styles.
- Buttons and links.
- Project cards.
- Placeholder media.

### Step 4 — Build homepage

Implement the complete homepage structure with all agreed sections.

### Step 5 — Build project pages

Implement the three routes using a common data-driven template.

### Step 6 — Populate structural project records

Add the five known projects to the content system.

Use only the factual project context in these instructions.

Keep substantive personal writing empty.

### Step 7 — Responsive refinement

Check the design at mobile, tablet, laptop, and desktop widths.

### Step 8 — Verification

Run available checks, resolve errors, and test navigation.

### Step 9 — Documentation

Create a README explaining how to run, edit, and deploy the site.

Do not stop after merely generating a project scaffold.

Implement the complete agreed structure.

---

# 16. ACCEPTANCE CRITERIA

The task is complete only when all the following requirements are satisfied.

### Functionality

- The site starts locally.
- The homepage renders.
- Every agreed homepage section exists.
- The three featured project pages work.
- The three featured project cards link to the correct pages.
- The two secondary experiments appear.
- Internal navigation works.
- Browser refresh works on nested routes in the intended deployment configuration.
- Unknown routes show an appropriate 404 page.
- Missing content does not crash the application.

### Visual quality

- Consistent professional dark theme.
- Clear hierarchy.
- Balanced spacing.
- Readable typography.
- Coherent cards.
- Responsive layout.
- No broken image icons.
- No unfinished default Vite branding.
- No obvious visual inconsistencies.

### Code quality

- TypeScript used consistently.
- Reusable components.
- Centralized project data.
- No excessive duplication.
- No fabricated content.
- No unused placeholder dependencies.
- No hardcoded fake links.
- Organized media assets.
- Clean configuration.

### Technical verification

Execute the relevant scripts, including:

```bash
npm run build
npm run lint
```

Also run a TypeScript type check if it is not already part of the build.

Resolve all errors that fall within the scope of this project.

If browser testing tools are available, inspect the rendered site at representative desktop and mobile widths.

If browser testing is not available, explicitly say so. Do not claim that visual tests were completed when they were not.

---

# 17. README DOCUMENTATION

Create a useful `README.md`.

It must explain:

1. What the project is.
2. Which technologies it uses.
3. How to install dependencies.
4. How to launch the development server.
5. How to create a production build.
6. Where the homepage content is stored.
7. Where the individual project data is stored.
8. How to replace media placeholders.
9. How to add another project.
10. How to update the name and personal links.
11. How to deploy to Vercel.
12. Which elements remain incomplete.

Include a clear **Pre-Submission Checklist** covering:

- Personal name added.
- Introduction written by the applicant.
- Project descriptions completed.
- Authentic screenshots included.
- Award details verified.
- Project links checked.
- Contact details supplied.
- No fictional information.
- No visible draft placeholders.
- Mobile responsiveness verified.
- All routes tested.
- Final site URL verified.

---

# 18. IMPORTANT CONTENT INTEGRITY RULES

This section overrides any tendency to invent content for visual completeness.

**Do not write personal narratives or achievements on behalf of the applicant.**

The academy explicitly discourages AI-written personal portfolio text.

Your responsibility is to provide the technical and visual framework.

You may write ordinary interface labels such as:

- Featured Work
- About
- Projects
- The Problem
- What I Built
- Technical Challenges
- What I Learned
- Results
- Contact

You may also use neutral development placeholders.

You may not fabricate:

- Personal anecdotes.
- Motivations.
- Experiences.
- Awards.
- Technical challenges.
- Project outcomes.
- Number of users.
- Revenue.
- Customer relationships.
- Testimonials.
- Research findings.

If a fact is not explicitly provided, leave it unfilled.

When unsure whether something is factual, do not guess.

---

# 19. QUALITY EXPECTATIONS

Think like a professional engineer delivering a real product.

The website should be:

- Visually polished.
- Technically simple.
- Easy to maintain.
- Easy to extend.
- Accessible.
- Fast.
- Credible.
- Distinctive without being extravagant.

Avoid generic templates that rely on flashy effects to compensate for weak content.

Do not overengineer.

The project should make future additions easy.

The final website should look like a strong foundation for a carefully documented collection of real projects.

---

# 20. FINAL DELIVERY

After implementation, provide a concise but complete report describing:

### A. Implemented features

Which pages, sections, and reusable components are finished.

### B. File structure

Where the important files are located.

### C. How to run the project

Provide the exact commands necessary to launch it locally.

### D. Verification

State which checks were run and their actual results.

### E. Remaining work

Identify exactly which content and media must be supplied by the applicant.

### F. Technical decisions

Briefly explain any deviations from the proposed architecture.

Do not claim success for operations you did not perform.

Do not invent deployment URLs.

Do not perform deployment or remote Git operations without authorization.

---

# FINAL INSTRUCTION

**Build the complete first version of the portfolio now.**

You have enough information to make implementation decisions about the architecture, layout, styling, and components.

Do not interrupt the task with unnecessary design preference questions.

Use professional judgment while strictly respecting all factual-content restrictions.

The objective is a fully functioning, aesthetically polished, modular portfolio with the correct pages and content slots, ready to be populated with the applicant's real work.

**The design and structure should be finished. The applicant's personal stories and detailed project content should remain intentionally unfilled.**