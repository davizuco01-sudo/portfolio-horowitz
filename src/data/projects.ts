import { defineProject } from '../lib/defineProject';

/**
 * All projects shown on the site.
 *
 * - Order matters: featured projects are numbered 01, 02, 03... in this order.
 * - `featured: true` → Featured Projects section; `false` → Other Experiments.
 * - `hasDetailPage: true` → a case-study page is generated at /projects/<slug>.
 * - Unknown content stays `null` or `[]`. Never fill gaps with guesses.
 * - Media files live in /public/media/<folder>/ and are referenced as
 *   "/media/<folder>/<file>". See README.md → "Replacing media placeholders".
 *
 * The one-line summaries below come from the project brief.
 * TODO(applicant): confirm each summary or rewrite it in your own words.
 */
export const projects = [
  /* ------------------------------------------------------------------------ */
  /* 01 — Customs Documentation AI                                            */
  /* Media folder: /public/media/customs/                                     */
  /* ------------------------------------------------------------------------ */
  // Text below is copied verbatim from CUSTOMS_CONTENT.md. Do not paraphrase.
  defineProject({
    slug: 'customs-documentation',
    title: 'Customs Documentation AI',
    category: 'Applied AI / Document Processing',
    status: 'in-development',
    statusLabel: 'Working Prototype — In Development',
    featured: true,
    hasDetailPage: true,
    timeframe: null, // TODO(applicant): e.g. '2025 – present'
    summary:
      'An AI-powered tool that extracts and structures customs documentation according to the EU Customs Data Model, combining automated validation with human review and document traceability.',
    technologies: ['Python', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Claude Sonnet 5.5'],
    // Homepage card and, with no `featuredMedia`, the first image on the project page (image 1 of 4).
    // The gallery below continues with images 2–4, so no screenshot appears twice on the page.
    cover: {
      type: 'image',
      src: '/media/customs/main-menu.png',
      alt: 'Main menu of the H1 review application ("Revisión H1 EUCDM"), presenting document review for the H1 declaration as four numbered steps (upload documents, analyze, review and export), with buttons to create a new case or load a synthetic demonstration and an empty document queue on the left.',
      caption: 'Main menu: an overview of the application and its four-step workflow (upload, analyze, review and export).',
      width: 1920,
      height: 1080,
      aspectRatio: '16 / 9',
    },

    // 1. The Problem & Discovery
    problem: [
      'I started this project while looking for business problems that could realistically be solved with AI. After researching different industries and analyzing complaints from employees, I became interested in customs agencies. It seemed like a sector where people were still spending a considerable amount of time manually processing documents.',
      "I had no previous experience in customs, so I started by investigating how the information was supposed to be structured. That's how I discovered the EU Customs Data Model and the H1 import and B1 export requirements. Spain's recent transition to H1 made the opportunity even more interesting to me.",
    ],

    // 2. What I Built
    built: {
      overview: [
        'I built an application that extracts, organizes and validates information from customs documents, including commercial invoices, packing lists and transport documents.',
        'Using Claude Sonnet 5.5, the system identifies information and associates it with the corresponding H1 fields. A separate Python layer checks technical constraints and flags missing, inconsistent or uncertain information.',
        'One of the features I focused on most was traceability. Users can select an extracted value and open the original PDF, where its source is highlighted using document coordinates. This allows them to check exactly where the information came from before accepting or correcting it.',
        'The application can also compare information across documents belonging to the same shipment and organize the remaining review tasks. Once all pending review requirements have been addressed, it allows users to export the structured information as H1 XML.',
        'I wanted AI to handle the repetitive work without giving it the final say over information that could have serious consequences if incorrect.',
      ],
      features: [],
      contributions: [],
      implementation: [],
    },

    // Screenshots only, in workflow order (images 2–4, after the main menu in `featuredMedia`).
    howItWorks: {
      intro: [],
      steps: [],
      galleryLayout: 'stacked',
      gallery: [
        {
          type: 'image',
          src: '/media/customs/document-case.png',
          alt: 'Document case with three uploaded PDFs, each with a document type selector, below a four-step progress bar: upload, analyze, review and export.',
          caption: 'Document case: the PDFs for one shipment are uploaded and each is classified by document type before analysis.',
          width: 1920,
          height: 1080,
          aspectRatio: '16 / 9',
        },
        {
          type: 'image',
          src: '/media/customs/review-dashboard.png',
          alt: 'Review dashboard for a commercial invoice, with counters for extracted, validated and pending values and a list of missing H1 fields such as net mass and gross mass.',
          caption: 'Review dashboard: a summary of extracted and validated values, with the pending review decisions listed by H1 field.',
          width: 1920,
          height: 1080,
          aspectRatio: '16 / 9',
        },
        {
          type: 'image',
          src: '/media/customs/source-traceability.png',
          alt: "Original commercial invoice PDF with the buyer's postcode highlighted, next to an information panel showing the H1 field, the value proposed by Claude, the value after review, the validation status and the source citation.",
          caption: 'Source traceability: an extracted postcode highlighted in the original PDF, with the proposed value, validation status and source citation in the side panel.',
          width: 1920,
          height: 1080,
          aspectRatio: '16 / 9',
        },
      ],
    },

    // 3. Technical Challenges
    challengesOverview: [
      'My biggest challenge was getting the AI to associate information with the correct fields without missing values along the way. Earlier versions sometimes assigned information to the wrong parameters or flagged repeated values for unnecessary review.',
      "I worked on these problems through repeated testing with different documents, refining the agent's instructions and improving the validation and review logic.",
      'Another challenge was the interface. As the number of fields and verification steps increased, the application became uncomfortable to navigate. I had to rethink how the results were presented and make the review process clearer and more interactive.',
    ],
    challenges: [],

    // 4. What I Learned
    lessons: {
      overview: [
        "At first, I was mostly focused on making the program work correctly. An early version had a fairly monotonous interface, and my father, who has years of experience in marketing, pointed out something I hadn't really considered: even a useful product can struggle if people don't enjoy using it.",
        'That made me change my approach. I started paying much more attention to the interface, the way information was presented and how easily users could interact with the results.',
        'This project also made me realize that building functional software and building something people would actually pay for are two very different challenges.',
      ],
    },

    // 5. Current Status & Next Steps
    // TODO(applicant): CUSTOMS_CONTENT.md ends mid-sentence ("The application is currently").
    // The text was checked and is not mapped anywhere else. Paste the complete approved text into
    // `results.overview` as paragraphs; "Results & Next Steps" stays hidden until then.
    results: { overview: [], demonstrated: [], recognition: [], traction: [], limitations: [], nextSteps: [] },
    links: { repository: null, liveDemo: null, video: null, documentation: [] },
  }),

  /* ------------------------------------------------------------------------ */
  /* 02 — LayerGuard (AI-Powered 3D Printing Assistant)                       */
  /* Media folder: /public/media/printer-ai/                                  */
  /* ------------------------------------------------------------------------ */
  // Text below is copied verbatim from LAYERGUARD_CONTENT.md. Do not paraphrase.
  // Built on AWS PartyRock: there is no source repository, so `links.repository` stays null.
  defineProject({
    slug: '3d-printer-assistant',
    title: 'LayerGuard — AI-Powered 3D Printing Assistant',
    category: 'Multimodal AI / Rapid Prototyping',
    status: 'prototype',
    statusLabel: 'Hackathon Prototype',
    featured: true,
    hasDetailPage: true,
    timeframe: null,
    summary:
      'A multimodal AI assistant designed to help 3D printer users identify printing defects, understand their possible causes and find practical solutions through image analysis and conversational guidance.',
    technologies: ['AWS PartyRock'],
    // Authentic photo (1600×1200). Used on the homepage card and, with no `featuredMedia`, as the
    // project page's main image.
    cover: {
      type: 'image',
      src: '/media/printer-ai/award-ceremony.jpg',
      alt: 'Award ceremony on stage: a prize-winner holds up the award certificate, standing between two other people, in front of screens showing the event name "Premios Nacionales de IA Generativa 2025/2026", the category title and Amazon "Compromiso por la Educación Tecnológica" branding, with the audience in the foreground.',
      caption: 'Award ceremony, National Generative AI Awards 2025/2026.',
      width: 1600,
      height: 1200,
      aspectRatio: '4 / 3',
    },

    // 1. The Challenge
    problem: [
      'During a university hackathon using AWS PartyRock, we were given two hours to develop four different AI projects, leaving approximately 30 minutes for each challenge.',
      'One of them focused on making 3D printing more accessible, as part of a challenge associated with Prusa Research. Participants could explore several problems, including training, troubleshooting and print configuration optimization.',
      "I decided to focus on diagnosing printing failures. Many beginners struggle to identify what's going wrong with their prints, and often don't even know the technical terms needed to describe the problem. I wanted to build something that could help them understand and solve those issues without requiring advanced knowledge of 3D printing.",
    ],

    // 2. What I Built
    built: {
      overview: [
        'I developed LayerGuard, a multimodal AI assistant designed to help users diagnose problems with their 3D printers.',
        'Instead of relying entirely on technical descriptions, the prototype was designed around visual evidence. Users could provide an image of a failed print alongside information about their printer, filament, nozzle and printing settings.',
        'The AI would analyze the available information to identify possible defects, such as warping, stringing or adhesion failures, explain their potential causes and suggest practical corrections, including changes to slicer settings when appropriate.',
        'I also designed the experience to support follow-up questions through conversational assistance, allowing users to ask for clarification or additional guidance.',
        'The central idea was to combine visual analysis and technical context to make troubleshooting more accessible, particularly for beginners who might struggle to describe what they were seeing.',
      ],
      features: [],
      contributions: [],
      implementation: [],
    },
    // No screenshots of the PartyRock app exist, so "How It Works" stays hidden.
    howItWorks: { intro: [], steps: [], gallery: [] },

    // 3. My Approach
    challengesOverview: [
      'I used AWS PartyRock to build the prototype without developing a traditional application from scratch.',
      'With approximately 30 minutes available, I concentrated on the interaction between the different AI components rather than building a complex interface.',
      'I organized the concept around two main inputs: technical information about the printing setup and an image of the problem. The diagnostic system was designed to interpret both sources, identify possible causes and provide actionable recommendations.',
      "I also considered cases where no image was available, so the assistant could offer an estimated diagnosis using the user's description while acknowledging the additional uncertainty.",
      'My focus was on turning the available AI capabilities into a practical troubleshooting workflow within the time constraints of the competition.',
    ],
    challenges: [],
    lessons: { overview: [], technical: [], product: [], research: [], thinking: [] },

    // 4. Results & Recognition
    results: {
      overview: [
        "LayerGuard didn't win the initial university evaluation. However, several months later, I received an email informing me that the project had been awarded third prize nationally in the 3D Printing & Additive Manufacturing category of the AWS National Generative AI Awards 2025/2026.",
        'What made the result particularly meaningful to me was that I had developed the prototype in approximately 30 minutes, as one of four projects during the university hackathon.',
        'Although LayerGuard was a prototype rather than a commercial product, the experience showed me how quickly an idea could be turned into something useful by combining a clearly defined problem with the right AI tools.',
      ],
      demonstrated: [],
      recognition: [
        {
          // English wording from LAYERGUARD_CONTENT.md, checked against the certificate:
          // "Premios Nacionales de IA Generativa 2025/2026", "Tercer Premio",
          // "Categoría: Impresión 3D y Fab. Aditiva", "Proyecto: LayerGuard", "Octubre 2026".
          title: 'Third Prize',
          event: 'National Generative AI Awards 2025/2026',
          category: '3D Printing & Additive Manufacturing',
          date: 'October 2026',
          certificateUrl: '/media/printer-ai/award-certificate.pdf',
          // First page of the PDF, rendered unmodified to JPEG (1600×1120).
          certificatePreview: {
            type: 'image',
            src: '/media/printer-ai/award-certificate-preview.jpg',
            alt: 'Award certificate: "Premios Nacionales de IA Generativa 2025/2026", Tercer Premio, awarded to David Gala Rodríguez, Categoría: Impresión 3D y Fab. Aditiva, Proyecto: LayerGuard, Octubre 2026, with AWS, PartyRock, Prusa Research and Amazon "Compromiso por la Educación Tecnológica" logos.',
            width: 1600,
            height: 1120,
            aspectRatio: '10 / 7',
          },
          verified: true,
        },
      ],
      traction: [],
      limitations: [],
      nextSteps: [],
    },
    links: { repository: null, liveDemo: null, video: null, documentation: [] },
  }),

  /* ------------------------------------------------------------------------ */
  /* 03 — Business Opportunity Radar                                          */
  /* Media folder: /public/media/opportunity-radar/processed/                 */
  /* ------------------------------------------------------------------------ */
  // Text below is copied verbatim from RADAR_CONTENT.md. Do not paraphrase.
  // Results are the app's own classifications of one saved Supabase dataset (131 comments,
  // 50 discussions, 11 HOT / 3 WARM / 117 COLD), not validated demand or customers.
  // Screenshots: only the privacy-safe copies in /media/opportunity-radar/processed/ may be used.
  // The unredacted originals (AI-inferred names and LinkedIn links) are kept outside public/ in
  // private-media/opportunity-radar/originals/ and must never be published.
  defineProject({
    slug: 'opportunity-radar',
    title: 'Business Opportunity Radar',
    category: 'AI Agents / Market Research / Automation',
    status: 'prototype',
    statusLabel: 'Functional Research Prototype',
    featured: true,
    hasDetailPage: true,
    timeframe: null,
    summary:
      'An automated research tool that analyzes online discussions to identify repetitive operational problems and potential business opportunities.',
    technologies: ['React', 'JavaScript', 'Vite', 'Supabase', 'Reddit API', 'Groq', 'GitHub Actions'],
    // Homepage card and, with no `featuredMedia`, the first image on the project page.
    cover: {
      type: 'image',
      src: '/media/opportunity-radar/processed/radar-overview.png',
      alt: 'Radar dashboard ("Radar de Fuego", data from Supabase): a list panel showing 22 of 131 records with filters for text search, platform, lead label, minimum pain and minimum relevance, next to an AI reasoning panel with an operational analysis (inventory and logistics planning to reduce dependence on Excel spreadsheets) and a proposed solution. The selected record is marked HOT · 80. A side panel has been removed for privacy.',
      caption: 'Radar overview: filters for the collected comments and the AI reasoning for a selected one, with its HOT · 80 priority score. A panel with unverified personal details has been removed.',
      width: 1920,
      height: 1080,
      aspectRatio: '16 / 9',
    },

    // 1. The Problem
    problem: [
      "After spending months learning to build applications with AI, I found myself facing a different problem: I knew how to create software, but I didn't know what was worth building.",
      "I didn't want to spend weeks developing random ideas without understanding whether anyone actually needed them. So I decided to build a tool that could help me discover problems directly from the people experiencing them.",
      'My idea was to look for professionals describing repetitive tasks, inefficient workflows and frustrations in their daily work, then use AI to identify which of those problems might be worth investigating.',
    ],

    // 2. What I Built
    built: {
      overview: [
        'I developed a research application that collects discussions from Reddit, filters irrelevant content and analyzes the remaining messages for potential business opportunities.',
        'The system combines automated collection with multiple analysis stages. It evaluates whether a comment describes a real operational problem, identifies repetitive or manual work, considers possible automation approaches and assigns a priority score.',
        'I used Supabase to store the collected messages and their analysis results, and built a React dashboard to review them. The interface allows me to filter opportunities, inspect the reasoning behind their classifications and open the original conversations.',
        "I also configured an automated daily scanning workflow using GitHub Actions so the research process wouldn't depend entirely on manual searches.",
      ],
      features: [],
      contributions: [],
      implementation: [],
    },

    // Screenshot 2 of 2 (the overview is the page's first image, so it is not repeated here).
    howItWorks: {
      intro: [],
      steps: [],
      galleryLayout: 'stacked',
      gallery: [
        {
          type: 'image',
          src: '/media/opportunity-radar/processed/radar-customs.png',
          alt: 'The radar dashboard with a selected record marked HOT · 80. The AI operational analysis reads "Problemas en la configuración de SAP y diseño de facturas de aduanas" (problems configuring SAP and designing customs invoices), and the proposed solution suggests redesigning customs invoices to meet CBP requirements and simplify the import process. A side panel has been removed for privacy.',
          caption: 'Customs opportunity: a comment about SAP configuration and customs invoice design, with the AI analysis and a proposed solution. A panel with unverified personal details has been removed.',
          width: 1920,
          height: 1080,
          aspectRatio: '16 / 9',
        },
      ],
    },

    // 3. Technical Challenges
    challengesOverview: [
      'One of the biggest difficulties was separating genuine problems from irrelevant conversations, advertisements and general advice.',
      "A message mentioning spreadsheets or automation doesn't necessarily represent a business opportunity. I had to introduce filtering stages, scoring rules and more specific AI instructions to reduce the amount of noise.",
      'The results also taught me that an AI-generated priority score is only a starting point. Even when a system identifies an interesting problem, it cannot prove that someone would pay for a solution.',
      'I still needed to investigate the industry and understand the people behind those workflows.',
    ],
    challenges: [],
    lessons: { overview: [], technical: [], product: [], research: [], thinking: [] },

    // 4. Results & What Came Next
    // Do not describe proven demand or revenue unless it can be documented.
    results: {
      overview: [
        'In one saved research dataset, the application collected and classified 131 Reddit comments from 50 different discussions. Its scoring system identified 11 high-priority and 3 medium-priority potential opportunities.',
        'Several of the problems involved logistics and customs operations: inconsistent shipping documents, manual data entry, mismatched invoice information and difficulties transferring data between systems.',
        'This research helped direct my attention toward the customs industry, where I continued investigating documentation requirements and eventually started building Customs Documentation AI.',
        "The Radar didn't become a commercial product, but it served the purpose I originally built it for: helping me move from searching for an idea to working on a specific problem.",
        'It also taught me that discovering a problem, validating demand and building the solution are three different stages.',
      ],
      demonstrated: [],
      recognition: [],
      traction: [],
      limitations: [],
      nextSteps: [],
    },
    // No repository, demo or video link has been provided, so "Links" stays hidden.
    links: { repository: null, liveDemo: null, video: null, documentation: [] },
  }),

  /* ------------------------------------------------------------------------ */
  /* Other Experiments: compact cards, each opening a short page             */
  /* (`hasDetailPage: true`, only the sections with approved text).          */
  /* ------------------------------------------------------------------------ */
  /* Source: MATHAI_CONTENT.md (approved by the applicant). Text copied verbatim.
   * Secondary project: a short page with "Why I Built It", "What I Built" and the
   * repository link. No screenshots supplied, so there is no image frame.
   * Stack checked against the repository (3 CrewAI agents, 4 tasks,
   * groq/llama-3.3-70b-versatile, SymPy, Matplotlib, Streamlit, pdflatex). Never
   * claim verified answers, deployment, users or accuracy figures. */
  defineProject({
    slug: 'mathematical-assistant',
    title: 'Multi-Agent Mathematical Solver',
    category: 'AI Agents / Mathematics',
    status: 'experiment',
    statusLabel: 'Experimental Prototype',
    featured: false,
    hasDetailPage: true,
    summary:
      'An experimental multi-agent system that coordinates mathematical problem solving, scientific explanations and visualizations to generate structured LaTeX reports.',
    technologies: ['Python', 'CrewAI', 'Groq', 'Llama 3.3 70B', 'SymPy', 'Streamlit', 'Matplotlib', 'LaTeX'],
    cover: null, // Optional: /media/mathematical-assistant/<file> (authentic screenshot only)
    // The source heading is "Why I Built It", so the Problem section uses that title.
    sectionTitles: { problem: 'Why I Built It' },
    problem: [
      'As a Mathematical Engineering student, I wanted to explore whether AI could do more than simply provide answers to mathematical problems. My idea was to create a system that could explain the reasoning, connect mathematical concepts to practical applications and present everything in a structured document.',
    ],
    built: {
      overview: [
        'I used CrewAI to coordinate three specialized agents across four tasks: a mathematical solver, a scientific researcher and a visualization agent.',
        'The system integrates SymPy for symbolic calculations, generates graphs when appropriate and combines the results into a LaTeX report. I also built a Streamlit interface where users can enter mathematical problems and download the generated PDF when compilation succeeds.',
        'This project allowed me to experiment with multi-agent orchestration and the integration of language models with mathematical tools.',
      ],
    },
    links: { repository: 'https://github.com/davizuco01-sudo/IA-matematicas' },
  }),

  /* Source: BUMP_CONTENT.md (approved by the applicant). Text copied verbatim.
   * Secondary project, same shape as the Mathematical Solver: a short page with
   * "Why I Built It" and "What I Built". It is a Python simulation only: never claim
   * a finished mobile app, real GPS, push notifications, photo capture, deployed
   * matching, guaranteed safety, users or performance figures. No screenshots and
   * no repository URL were supplied, so there is no image frame and no Links section. */
  defineProject({
    slug: 'safety-simulation',
    title: 'BUMP — Agentic Proximity Safety',
    category: 'AI Agents / Safety Systems / Simulation',
    status: 'experiment',
    statusLabel: 'Experimental Prototype',
    featured: false,
    hasDetailPage: true,
    summary:
      'An experimental AI-powered decision system that evaluates simulated proximity encounters between users before allowing an interaction.',
    technologies: ['Python', 'CrewAI', 'Groq', 'Llama 3.3 70B', 'SQLite'],
    cover: null, // Optional: /media/safety-simulation/<file> (authentic screenshot only)
    // The source heading is "Why I Built It", so the Problem section uses that title.
    sectionTitles: { problem: 'Why I Built It' },
    problem: [
      'BUMP started as an idea for a location-based social app, inspired by Pokémon GO. When two people using the app came close to each other, they would receive a notification, take a photo together and add it to a personal collection of encounters.',
      'As I explored the concept, I became more interested in a different question: how could the application decide whether notifying two nearby strangers was appropriate?',
      'I decided to experiment with an AI-based safety layer before developing the full social application.',
    ],
    built: {
      overview: [
        'I developed a Python simulation where users move through a virtual space and the system detects when they come within a defined distance.',
        'Using CrewAI and Llama 3.3 70B through Groq, I created an agent that evaluates simulated encounters using information such as profile verification, mutual connections and location context.',
        'The system can recommend allowing or blocking an interaction, while SQLite stores user information and previous decisions.',
        'The project allowed me to explore how an AI agent could be integrated into a rule-based proximity system. It also highlighted the limitations of using incomplete profile information to make decisions about personal safety.',
        'BUMP remained a simulation, not a deployed mobile application or a validated safety system.',
      ],
    },
    // No repository URL has been supplied, so no GitHub link is shown.
    links: { repository: null },
  }),
];
