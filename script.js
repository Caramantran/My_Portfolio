
/* =========================================
  PORTFOLIO NAVIGATION
   ========================================= */

const pageLinks = document.querySelectorAll("[data-page-target]");
const pages = document.querySelectorAll("[data-page]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function showPage(pageName, updateAddress = true) {
  const selectedPage = document.querySelector(
    `[data-page="${pageName}"]`
  );

  if (!selectedPage) {
    pageName = "home";
  }

  const targetPage = document.querySelector(
    `[data-page="${pageName}"]`
  );

  if (!targetPage) return;

  pages.forEach((page) => {
    const isActive = page === targetPage;

    page.classList.toggle("active", isActive);
    page.setAttribute("aria-hidden", String(!isActive));
  });

  pageLinks.forEach((link) => {
    const isActive = link.dataset.pageTarget === pageName;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (updateAddress && window.location.hash !== `#${pageName}`) {
    window.history.pushState({ page: pageName }, "", `#${pageName}`);
  }

  if (navLinks) {
    navLinks.classList.remove("open");
  }

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  }

  targetPage.scrollTop = 0;
}

/* Switch tabs when a navigation link is clicked */

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.pageTarget);
  });
});

/* Support browser back and forward buttons */

window.addEventListener("popstate", () => {
  const pageName = window.location.hash.slice(1) || "home";
  showPage(pageName, false);
});

/* Mobile navigation menu */

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });
}

/* Open the correct page when the website loads */

const startingPage = window.location.hash.slice(1) || "home";
showPage(startingPage, false);

console.log("Portfolio navigation ready.");


/* =========================================
  LIGHT / DARK THEME TOGGLE
   ========================================= */

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.textContent = "☾";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
    themeToggle.setAttribute("aria-pressed", "true");
  }

  themeToggle.addEventListener("click", () => {
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";

    const nextTheme = isLight ? "dark" : "light";

    if (nextTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("portfolio-theme", nextTheme);

    themeToggle.textContent = nextTheme === "light" ? "☾" : "☼";
    themeToggle.setAttribute(
      "aria-label",
      nextTheme === "light"
        ? "Switch to dark theme"
        : "Switch to light theme"
    );
    themeToggle.setAttribute("aria-pressed", String(nextTheme === "light"));
  });
}

/* =========================================
  ENGLISH / FRENCH LANGUAGE TOGGLE
   ========================================= */

const translations = {
  en: {
    "hero.title": 'Turning data into <span>meaningful decisions.</span>',
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Let's connect",
    "hero.description1": "I'm Aya, an engineer focused on Data Analysis and Business Analysis, with a background in Business Intelligence, Artificial Intelligence and Software Engineering.",
    "hero.description2": "I connect business needs with technical solutions — transforming information into insights, building useful tools and making complex problems easier to understand.",
    "hero.button1": "Explore my work",
    "hero.button2": "Get in touch",
    "hero.specialty1": "Data & BI",
    "hero.specialty2": "Business Analysis",
    "hero.specialty3": "AI & Software",
    "hero.eyebrow": "DATA ANALYSIS · BUSINESS INSIGHTS · TECHNOLOGY",
    "hero.portraitCaption": "DATA · BUSINESS · TECHNOLOGY",
    "hero.sideNote": "Curiosity, clarity & impact.",
    "about.eyebrow": "A LITTLE ABOUT ME",
    "about.title": "Where business questions meet <span>data.</span>",
    "about.intro": "I enjoy understanding the problem behind the numbers, finding the signal in the information and turning it into something people can use.",
    "about.approachTitle": "My approach",
    "about.approach1": "I am an engineer in Computer Engineering and Artificial Intelligence, graduated from ENSAM Casablanca in July 2025. My interests lie at the intersection of data, business needs and technology.",
    "about.approach2": "I’m particularly interested in analysing information, defining useful KPIs, building dashboards and translating operational needs into clear requirements. My experience in AI and software development helps me understand not only what the data says, but also how technical solutions can support business decisions.",
    "about.approach3": "I value structured thinking, clear communication and solutions that are practical, reliable and easy to understand.",
    "about.card1Kicker": "01 — PRIMARY FOCUS",
    "about.card1Title": "Data & Business Analysis",
    "about.card1Text": "Data preparation, KPI analysis, business needs, requirements and decision support.",
    "about.card2Kicker": "02 — BUSINESS INTELLIGENCE",
    "about.card2Title": "Reporting & Visualisation",
    "about.card2Text": "Power BI, Power Query, Excel, SQL and interactive dashboards.",
    "about.card3Kicker": "03 — TECHNICAL FOUNDATION",
    "about.card3Title": "AI & Software Engineering",
    "about.card3Text": "Python, NLP, machine learning, APIs, web development and automation.",
    "about.skillsEyebrow": "TOOLS & SKILLS",
    "about.skillsData": "Data & BI",
    "about.skillsBusiness": "Business Analysis",
    "about.skillsAI": "AI & Development",
    "experience.eyebrow": "EXPERIENCE & EDUCATION",
    "experience.title": "A foundation built across <span>business and technology.</span>",
    "experience.intro": "Experience in operational analysis, AI solutions, software delivery and data-driven projects.",
    "experience.telus.date": "MAY 2026 — OCTOBER 2026 · CASABLANCA",
    "experience.telus.title": "Data & Business Analyst — B2B",
    "experience.telus.point1": "Analysed and qualified requests from business clients to identify operational needs and business-related issues.",
    "experience.telus.point2": "Used the information gathered to support request tracking, problem resolution and operational decision-making.",
    "experience.telus.point3": "Communicated daily with international business stakeholders in French and English to clarify needs and follow up on requests.",
    "experience.telus.point4": "Strengthened skills in business analysis, information processing, problem-solving and stakeholder communication.",
    "experience.freelance.date": "NOVEMBER 2025 — APRIL 2026 · FREELANCE",
    "experience.freelance.title": "AI Solutions Developer — Chatbot & NLP Automation",
    "experience.freelance.company": "Freelance project",
    "experience.freelance.point1": "Designed a conversational assistant that allows users to query operational data using natural language.",
    "experience.freelance.point2": "Integrated OpenAI APIs and NLP pipelines to interpret requests, use context and generate answers and business insights.",
    "experience.freelance.point3": "Ran functional tests, validated response quality and improved the processing workflow.",
    "experience.rifl.date": "FEBRUARY 2025 — SEPTEMBER 2025 · CASABLANCA",
    "experience.rifl.title": "Software Engineer & Data — Final-Year Internship",
    "experience.rifl.point1": "Contributed to Siwan Taxi, an Android, iOS and web platform, through application development and operational data structuring.",
    "experience.rifl.point2": "Participated in business-needs analysis, functional specifications and Agile/Scrum sprints using Jira.",
    "experience.rifl.point3": "Worked with trip, geolocation and user-related data to support future performance analysis.",
    "experience.rifl.point4": "Contributed to functional testing, technical documentation and build/deployment automation using GitHub Actions and Docker.",
    "experience.generafi.date": "JULY 2024 — OCTOBER 2024 · CASABLANCA",
    "experience.generafi.title": "AI & Data Engineering Intern",
    "experience.generafi.point1": "Developed a vehicle and pedestrian detection and counting system using video streams, Python, YOLOv8 and SORT.",
    "experience.generafi.point2": "Automated traffic reporting with Google Sheets and Drive APIs and built an interactive Looker Studio dashboard.",
    "experience.generafi.point3": "Used Docker for containerisation and contributed to an invoice information-extraction concept using OCR and AI.",
    "experience.articode.date": "JULY 2023 — SEPTEMBER 2023 · CASABLANCA",
    "experience.articode.title": "Augmented Reality Developer Intern",
    "experience.articode.point1": "Developed interactive scenes, animations and features with Unity and C# for an augmented-reality application for the real-estate sector.",
    "experience.education.date": "JULY 2025",
    "experience.education.title": "State Engineering Degree in Computer Engineering & Artificial Intelligence",
    "experience.education.description": "Engineering degree with a focus on software engineering, artificial intelligence and data-oriented solutions.",
    "projects.eyebrow": "SELECTED WORK",
    "projects.title": "Projects that turn ideas into <span>useful solutions.</span>",
    "projects.intro": "A selection of projects across data visualisation, business intelligence, AI-powered applications and software engineering.",
    "projects.race.category": "AI APPLICATION · COMPUTER VISION",
    "projects.race.description": "A web application for managing sports-event photos with machine learning. Built to help photographers and participants find relevant images through automated image analysis and text recognition.",
    "projects.insight.category": "BUSINESS INTELLIGENCE · DATA ANALYSIS",
    "projects.insight.title": "InsightFlow — Banking Dashboard",
    "projects.insight.description": "A Power BI dashboard for monitoring key banking indicators using multi-source data. The project covers data preparation and modelling, business KPI creation and trend analysis to support decision-making.",
    "projects.ebank.category": "SOFTWARE ENGINEERING · MICROSERVICES",
    "projects.ebank.title": "E-Bank Operations",
    "projects.ebank.description": "A containerised banking application for account management, transactions and authentication. Designed around microservices to support modular deployment, maintainability and scalability.",
    "projects.art.category": "AUGMENTED REALITY · INTERACTIVE EXPERIENCE",
    "projects.art.description": "An interactive digital art gallery created with Unity, where users can explore artworks ranging from paintings to sculptures. The experience includes generated questions and AI-assisted answers to encourage discovery and interaction.",
    "projects.traffic.category": "DATA ANALYSIS · COMPUTER VISION",
    "projects.traffic.title": "Traffic Intelligence",
    "projects.traffic.description": "A video-analysis pipeline to detect and track road users, including vehicles and pedestrians. Detection outputs are organised into traffic reports and visualised through an interactive dashboard.",
    "projects.assistant.category": "NLP · DATA ACCESS · BUSINESS INSIGHTS",
    "projects.assistant.title": "AI Business Assistant",
    "projects.assistant.description": "A conversational assistant that lets users ask questions about operational data in natural language. OpenAI APIs and NLP pipelines help interpret requests and generate contextual answers and insights.",
    "contact.eyebrow": "LET'S CONNECT",
    "contact.title": "Good work starts with a <span>conversation.</span>",
    "contact.intro": "Interested in data, business analysis, BI or technology-driven projects? I’d be happy to connect and discuss how I could contribute to your team.",
    "contact.emailLabel": "EMAIL",
    "contact.emailHint": "Click to compose an email",
    "contact.phoneLabel": "PHONE",
    "contact.linkedinLabel": "LINKEDIN",
    "contact.linkedinValue": "Connect with me ↗",
    "footer.copy": "Designed with intention. Built with curiosity.",
    "footer.copyright": "© 2026 A.AKLY",
  },

  fr: {
    "hero.title": 'Transformer les données en <span>décisions pertinentes.</span>',
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.experience": "Expérience",
    "nav.projects": "Projets",
    "nav.contact": "Me contacter",
    "hero.description1": "Je suis Aya, ingénieure spécialisée en analyse de données et analyse métier, avec une expérience en Business Intelligence, en intelligence artificielle et en ingénierie logicielle.",
    "hero.description2": "Je fais le lien entre les besoins métier et les solutions techniques : je transforme les informations en insights, développe des outils utiles et rends les problèmes complexes plus faciles à comprendre.",
    "hero.button1": "Découvrir mes projets",
    "hero.button2": "Me contacter",
    "hero.specialty1": "Données & BI",
    "hero.specialty2": "Analyse métier",
    "hero.specialty3": "IA & Développement",
    "hero.eyebrow": "ANALYSE DE DONNÉES · BUSINESS · TECHNOLOGIE",
    "hero.portraitCaption": "DONNÉES · BUSINESS · TECHNOLOGIE",
    "hero.sideNote": "Curiosité, clarté et impact.",
    "about.eyebrow": "À PROPOS DE MOI",
    "about.title": "Là où les enjeux métier rencontrent <span>la donnée.</span>",
    "about.intro": "J’aime comprendre les enjeux derrière les chiffres, repérer les informations pertinentes et les transformer en éléments concrets et utiles.",
    "about.approachTitle": "Mon approche",
    "about.approach1": "Je suis ingénieure d’État en génie informatique et intelligence artificielle, diplômée de l’ENSAM Casablanca en juillet 2025. Mes centres d’intérêt se situent au croisement de la donnée, des besoins métier et de la technologie.",
    "about.approach2": "Je m’intéresse particulièrement à l’analyse des données, à la définition de KPI pertinents, à la création de tableaux de bord et à la traduction des besoins opérationnels en exigences claires. Mon expérience en IA et en développement logiciel me permet de comprendre non seulement ce que révèlent les données, mais aussi comment les solutions techniques peuvent soutenir les décisions métier.",
    "about.approach3": "J’accorde de l’importance à la rigueur, à une communication claire et à des solutions pratiques, fiables et faciles à comprendre.",
    "about.card1Kicker": "01 — AXE PRINCIPAL",
    "about.card1Title": "Analyse de données et analyse métier",
    "about.card1Text": "Préparation des données, analyse des KPI, compréhension des besoins métier, formalisation des exigences et aide à la décision.",
    "about.card2Kicker": "02 — BUSINESS INTELLIGENCE",
    "about.card2Title": "Reporting et visualisation",
    "about.card2Text": "Power BI, Power Query, Excel, SQL et tableaux de bord interactifs.",
    "about.card3Kicker": "03 — SOCLE TECHNIQUE",
    "about.card3Title": "IA et ingénierie logicielle",
    "about.card3Text": "Python, NLP, apprentissage automatique, API, développement web et automatisation.",
    "about.skillsEyebrow": "OUTILS & COMPÉTENCES",
    "about.skillsData": "Données & BI",
    "about.skillsBusiness": "Analyse métier",
    "about.skillsAI": "IA & Développement",
    "experience.eyebrow": "EXPÉRIENCE & FORMATION",
    "experience.title": "Un parcours à la croisée <span>du métier et de la technologie.</span>",
    "experience.intro": "Une expérience en analyse opérationnelle, en solutions d’IA, en développement logiciel et en projets axés sur les données.",
    "experience.telus.date": "MAI 2026 — OCTOBRE 2026 · CASABLANCA",
    "experience.telus.title": "Analyste Data & Business — B2B",
    "experience.telus.point1": "Analyse et qualification des demandes des clients professionnels afin d’identifier leurs besoins opérationnels et les problématiques métier.",
    "experience.telus.point2": "Exploitation des informations recueillies pour assurer le suivi des demandes, contribuer à la résolution des problèmes et soutenir les décisions opérationnelles.",
    "experience.telus.point3": "Communication quotidienne en français et en anglais avec des interlocuteurs professionnels internationaux pour clarifier les besoins et assurer le suivi des demandes.",
    "experience.telus.point4": "Développement de compétences en analyse métier, traitement de l’information, résolution de problèmes et communication avec les parties prenantes.",
    "experience.freelance.date": "NOVEMBRE 2025 — AVRIL 2026 · FREELANCE",
    "experience.freelance.title": "Développeuse de solutions IA — Chatbot et automatisation NLP",
    "experience.freelance.company": "Projet freelance",
    "experience.freelance.point1": "Conception d’un assistant conversationnel permettant d’interroger des données opérationnelles en langage naturel.",
    "experience.freelance.point2": "Intégration des API OpenAI et de pipelines NLP pour interpréter les demandes, exploiter le contexte et générer des réponses et des insights métier.",
    "experience.freelance.point3": "Réalisation de tests fonctionnels, validation de la qualité des réponses et amélioration du processus de traitement.",
    "experience.rifl.date": "FÉVRIER 2025 — SEPTEMBRE 2025 · CASABLANCA",
    "experience.rifl.title": "Ingénieure logiciel et data — Stage de fin d’études",
    "experience.rifl.point1": "Contribution au développement de Siwan Taxi, une plateforme Android, iOS et web, ainsi qu’à la structuration des données opérationnelles.",
    "experience.rifl.point2": "Participation à l’analyse des besoins métier, à la rédaction des spécifications fonctionnelles et aux sprints Agile/Scrum avec Jira.",
    "experience.rifl.point3": "Exploitation des données liées aux trajets, à la géolocalisation et aux utilisateurs pour préparer de futures analyses de performance.",
    "experience.rifl.point4": "Contribution aux tests fonctionnels, à la documentation technique et à l’automatisation des builds et déploiements avec GitHub Actions et Docker.",
    "experience.generafi.date": "JUILLET 2024 — OCTOBRE 2024 · CASABLANCA",
    "experience.generafi.title": "Stagiaire en ingénierie IA et data",
    "experience.generafi.point1": "Développement d’un système de détection et de comptage des véhicules et des piétons à partir de flux vidéo, avec Python, YOLOv8 et SORT.",
    "experience.generafi.point2": "Automatisation des rapports de trafic avec les API Google Sheets et Drive, et création d’un tableau de bord interactif sur Looker Studio.",
    "experience.generafi.point3": "Utilisation de Docker pour la conteneurisation et contribution à un concept d’extraction d’informations de factures à l’aide de l’OCR et de l’IA.",
    "experience.articode.date": "JUILLET 2023 — SEPTEMBRE 2023 · CASABLANCA",
    "experience.articode.title": "Stagiaire en développement de réalité augmentée",
    "experience.articode.point1": "Développement de scènes interactives, d’animations et de fonctionnalités avec Unity et C# pour une application de réalité augmentée destinée au secteur immobilier.",
    "experience.education.date": "JUILLET 2025",
    "experience.education.title": "Diplôme d’ingénieur d’État en génie informatique et intelligence artificielle",
    "experience.education.description": "Formation d’ingénieur axée sur le génie logiciel, l’intelligence artificielle et les solutions orientées données.",
    "projects.eyebrow": "PROJETS SÉLECTIONNÉS",
    "projects.title": "Des projets qui transforment les idées en <span>solutions utiles.</span>",
    "projects.intro": "Une sélection de projets en visualisation de données, Business Intelligence, applications basées sur l’IA et ingénierie logicielle.",
    "projects.race.category": "APPLICATION IA · VISION PAR ORDINATEUR",
    "projects.race.description": "Une application web de gestion de photos d’événements sportifs basée sur le machine learning. Elle aide les photographes et les participants à retrouver des images pertinentes grâce à l’analyse automatisée des images et à la reconnaissance de texte.",
    "projects.insight.category": "BUSINESS INTELLIGENCE · ANALYSE DE DONNÉES",
    "projects.insight.title": "InsightFlow — Tableau de bord bancaire",
    "projects.insight.description": "Un tableau de bord Power BI permettant de suivre les principaux indicateurs bancaires à partir de plusieurs sources de données. Le projet couvre la préparation et la modélisation des données, la création de KPI métier et l’analyse des tendances pour faciliter la prise de décision.",
    "projects.ebank.category": "GÉNIE LOGICIEL · MICROSERVICES",
    "projects.ebank.title": "E-Bank Operations",
    "projects.ebank.description": "Une application bancaire conteneurisée dédiée à la gestion des comptes, aux transactions et à l’authentification. Son architecture en microservices favorise un déploiement modulaire, la maintenabilité et l’évolutivité.",
    "projects.art.category": "RÉALITÉ AUGMENTÉE · EXPÉRIENCE INTERACTIVE",
    "projects.art.description": "Une galerie d’art numérique interactive développée avec Unity, permettant d’explorer des œuvres allant de la peinture à la sculpture. L’expérience intègre des questions générées et des réponses assistées par l’IA pour favoriser la découverte et l’interaction.",
    "projects.traffic.category": "ANALYSE DE DONNÉES · VISION PAR ORDINATEUR",
    "projects.traffic.title": "Traffic Intelligence",
    "projects.traffic.description": "Un pipeline d’analyse vidéo permettant de détecter et de suivre les usagers de la route, notamment les véhicules et les piétons. Les résultats sont organisés en rapports de trafic et visualisés dans un tableau de bord interactif.",
    "projects.assistant.category": "NLP · ACCÈS AUX DONNÉES · INSIGHTS MÉTIER",
    "projects.assistant.title": "Assistant IA métier",
    "projects.assistant.description": "Un assistant conversationnel qui permet d’interroger des données opérationnelles en langage naturel. Les API OpenAI et les pipelines NLP aident à interpréter les demandes et à générer des réponses contextualisées et des insights.",
    "contact.eyebrow": "RESTONS EN CONTACT",
    "contact.title": "Les belles réalisations commencent par <span>une conversation.</span>",
    "contact.intro": "Vous vous intéressez à la data, à l’analyse métier, à la BI ou aux projets technologiques ? Je serais ravie d’échanger avec vous et de discuter de ma contribution potentielle à votre équipe.",
    "contact.emailLabel": "E-MAIL",
    "contact.emailHint": "Cliquer pour rédiger un e-mail",
    "contact.phoneLabel": "TÉLÉPHONE",
    "contact.linkedinLabel": "LINKEDIN",
    "contact.linkedinValue": "Me contacter sur LinkedIn ↗",
    "footer.copy": "Conçu avec intention. Construit avec curiosité.",
    "footer.copyright": "© 2026 A.AKLY",
  }
};

function applyTranslations(language) {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translation = translations[language][key];

    if (translation) {
      element.innerHTML = translation;
    }
  });
}

const languageToggle = document.getElementById("language-toggle");

if (languageToggle) {
  let currentLanguage = localStorage.getItem("portfolio-language") || "en";

  function updateLanguageButton() {
    languageToggle.textContent = currentLanguage === "en" ? "FR" : "EN";
    languageToggle.setAttribute(
      "aria-label",
      currentLanguage === "en"
        ? "Passer le site en français"
        : "Switch the website to English"
    );
    languageToggle.setAttribute(
      "title",
      currentLanguage === "en" ? "Français" : "English"
    );
  }

  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "fr" : "en";

    localStorage.setItem("portfolio-language", currentLanguage);

    applyTranslations(currentLanguage);
    updateLanguageButton();

    console.log(`Selected language: ${currentLanguage}`);
  });

  applyTranslations(currentLanguage);
  updateLanguageButton();
}

