/**
 * ============================================================
 *  SAYLWARE · SITE CONTENT
 * ============================================================
 */

export const site = {
  name: "Saylware",
  tagline: "Security operations and customer experience, run right.",
  domain: "saylware.com",
};

export const nav = {
  logoText: "Saylware",
  links: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#journey" },
    { label: "Stories", href: "/#testimonials" },
    { label: "Work with us", href: "/careers" },
  ],
  actions: [{ label: "Reach us anytime", href: "/#get-started" }],
};

export const hero = {
  headline: "Your operations stay sharp with Saylware.",
  subheadline:
    "Advanced cybersecurity and customer support with a calm, capable touch. Reach us anytime — we are here when you need us.",
  primaryCta: { label: "Explore services", href: "/#services" },
  bookCta: { label: "Reach us anytime", href: "/#get-started" },
  availability: {
    label: "Always available",
    headline: "Reach us anytime.",
    body: "Security alerts and customer issues do not wait for business hours. Double down with a team that picks up when you need them.",
  },
  images: {
    soc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=1000&fit=crop",
    socAlt: "SOC analyst monitoring security systems",
    care: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=1000&fit=crop",
    careAlt: "Customer care representative on a support call",
  },
};

export const partners = {
  label: "Trusted by growing teams",
  names: [
    "Northline",
    "Peakform",
    "Aperture",
    "Riverstack",
    "Orbit Desk",
    "Clearpath",
    "Lumen Ops",
    "Brightlane",
  ],
};

export const pillars = {
  eyebrow: "What we stand for",
  headline: "Modern ops for teams that move fast",
  description:
    "Two specialist services. One operating standard. Built for teams that cannot afford noise, downtime, or forgotten tickets.",
  items: [
    {
      title: "Always on watch",
      summary: "Detection that respects your team's attention.",
      description:
        "Continuous detection across endpoints, network, and cloud, with humans who know which alerts matter. We filter noise before it hits your inbox and escalate only what needs a decision.",
      icon: "shield" as const,
    },
    {
      title: "Customers first",
      summary: "Support that sounds like your brand.",
      description:
        "Support desks that hit your SLAs and turn feedback into clearer product signal. Agents train on your voice, your policies, and your escalation paths so customers never feel outsourced.",
      icon: "nodes" as const,
    },
    {
      title: "Clear accountability",
      summary: "Reporting leadership can actually use.",
      description:
        "Timelines, reporting, and escalation paths you can hand to leadership without translating jargon. Named owners, measurable outcomes, and no black box between you and the work.",
      icon: "chart" as const,
    },
  ],
};

export type ServiceFacet = "security" | "support";

export type ServiceItem = {
  slug: string;
  facet: ServiceFacet;
  title: string;
  short: string;
  tags: string[];
  image: string;
  overview: string;
  highlights: { title: string; body: string }[];
  outcomes: string[];
};

export const serviceCatalog: ServiceItem[] = [
  {
    slug: "managed-detection-response",
    facet: "security",
    title: "Managed Detection and Response",
    short: "24/7 monitoring with human led triage on every real alert. Noise stays filtered so your team only sees what needs a decision.",
    tags: ["SOC", "Endpoints", "Cloud"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&h=600&fit=crop",
    overview:
      "We watch your environment around the clock, investigate what matters, and hand you clear next steps instead of another noisy dashboard.",
    highlights: [
      { title: "Coverage", body: "Endpoints, network, identity, and cloud signals in one operating rhythm." },
      { title: "Human triage", body: "Analysts validate alerts before anything lands on your team." },
      { title: "Reporting", body: "Weekly summaries and incident narratives leadership can read." },
    ],
    outcomes: ["Fewer false positives", "Faster mean time to respond", "Clear audit trail"],
  },
  {
    slug: "incident-response",
    facet: "security",
    title: "Incident Response",
    short: "Rapid containment with a clear timeline of what happened, what was isolated, and what to harden next.",
    tags: ["IR", "Containment", "Forensics"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&h=600&fit=crop",
    overview:
      "When something goes wrong, we triage, contain, and document so you recover with confidence and learn what to harden next.",
    highlights: [
      { title: "Playbooks", body: "Pre agreed escalation paths for ransomware, account takeover, and data exposure." },
      { title: "Containment", body: "Isolate impacted assets while preserving evidence for review." },
      { title: "After action", body: "A plain language report with fixes ranked by risk." },
    ],
    outcomes: ["Shorter outages", "Documented timeline", "Hardening backlog"],
  },
  {
    slug: "vulnerability-management",
    facet: "security",
    title: "Vulnerability Management",
    short: "Scan, prioritize, and patch what attackers would use first. Remediation queues that respect business impact.",
    tags: ["Scanning", "Prioritization", "Patch"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&h=600&fit=crop",
    overview:
      "Ongoing scanning paired with prioritization that respects business impact, not just CVSS scores.",
    highlights: [
      { title: "Discovery", body: "Continuous inventory of internet facing and internal assets." },
      { title: "Prioritization", body: "Exploitability and exposure drive the queue, not raw severity alone." },
      { title: "Cadence", body: "Sprint friendly remediation plans your engineers can actually ship." },
    ],
    outcomes: ["Reduced attack surface", "Trackable remediation", "Fewer critical reopenings"],
  },
  {
    slug: "security-advisory",
    facet: "security",
    title: "Security Advisory",
    short: "Practical guidance on hardening, tooling, and readiness without the upsell theater or black box advice.",
    tags: ["Advisory", "Hardening", "Compliance"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&h=600&fit=crop",
    overview:
      "Straight advice on stack choices, hardening priorities, and compliance readiness without the upsell theater.",
    highlights: [
      { title: "Architecture reviews", body: "Spot weak trust boundaries before they become incidents." },
      { title: "Tooling", body: "Recommend what fits your stage, not the biggest license." },
      { title: "Readiness", body: "Map controls to the frameworks your customers ask about." },
    ],
    outcomes: ["Clear roadmap", "Fewer tool overlaps", "Buyer ready answers"],
  },
  {
    slug: "managed-support-desk",
    facet: "support",
    title: "Managed Support Desk",
    short: "Agents under your brand with SLAs you set across chat, email, and voice, measured weekly without vanity metrics.",
    tags: ["Tickets", "Chat", "Voice"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=600&fit=crop",
    overview:
      "Trained agents handle tickets, chat, and calls as an extension of your team, measured against response targets you define.",
    highlights: [
      { title: "Brand voice", body: "Macros, tone guides, and QA calibrated to how you sound." },
      { title: "Channels", body: "Email, chat, and voice with a single queue view." },
      { title: "SLAs", body: "Targets you set, reported weekly without vanity metrics." },
    ],
    outcomes: ["Faster first response", "Stable CSAT", "Less founder firefighting"],
  },
  {
    slug: "cx-process-design",
    facet: "support",
    title: "CX Process Design",
    short: "Map workflows and remove friction before it becomes churn. Clear intake, escalation, and closure blueprints.",
    tags: ["Workflows", "Journey", "Design"],
    image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=900&h=600&fit=crop",
    overview:
      "We map how support actually flows today, find the pain points, and redesign the path customers take when they need help.",
    highlights: [
      { title: "Discovery", body: "Shadow tickets and calls to see where handoffs break." },
      { title: "Blueprints", body: "Clear workflows for intake, escalation, and closure." },
      { title: "Enablement", body: "Train the team and leave playbooks they will use." },
    ],
    outcomes: ["Fewer loops", "Clearer ownership", "Smoother escalations"],
  },
  {
    slug: "escalation-qa",
    facet: "support",
    title: "Escalation and QA",
    short: "Structured escalation with quality review on every shift so nothing important slips and agents keep improving.",
    tags: ["QA", "Escalation", "Coaching"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&h=600&fit=crop",
    overview:
      "A structured escalation path plus quality review so nothing important slips and agents keep improving.",
    highlights: [
      { title: "Escalation matrix", body: "Who owns what, and when engineering gets involved." },
      { title: "QA sampling", body: "Scorecards tied to your brand and policy standards." },
      { title: "Coaching", body: "Feedback loops that improve the next conversation." },
    ],
    outcomes: ["Fewer missed tickets", "Consistent quality", "Stronger agent growth"],
  },
  {
    slug: "support-analytics",
    facet: "support",
    title: "Support Analytics",
    short: "Volume, resolution, and satisfaction made visible so support becomes a measurable asset, not a cost center.",
    tags: ["Reporting", "CSAT", "Trends"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop",
    overview:
      "Clear reporting on volume, resolution time, and satisfaction so support becomes a visible asset, not a cost center.",
    highlights: [
      { title: "Dashboards", body: "Live views for ops leads and monthly packs for leadership." },
      { title: "Drivers", body: "See which themes drive contacts and churn risk." },
      { title: "Action", body: "Recommendations tied to the numbers, not just charts." },
    ],
    outcomes: ["Visible ROI", "Product feedback loops", "Capacity planning"],
  },
];

export const facets = {
  headline: "Our services",
  intro: "Two facets. Hover a column to browse. Pause on a card to expand and open the full brief.",
  security: {
    id: "cybersecurity",
    title: "Cybersecurity",
    subtitle: "Detection, response, and advisory",
  },
  support: {
    id: "customer-service",
    title: "Customer Care",
    subtitle: "Desk, process, QA, and analytics",
  },
};

export const values = {
  headline: "Everything your ops stack should feel like",
  items: [
    {
      title: "Resilient systems",
      description: "Hardening, detection, and response designed so incidents stay small and recoverable.",
      icon: "shield" as const,
    },
    {
      title: "Smart operations",
      description: "Playbooks and tooling that cut noise so your team spends time on real decisions.",
      icon: "bolt" as const,
    },
    {
      title: "Connected teams",
      description: "Security and support handoffs that keep context intact from alert to customer reply.",
      icon: "nodes" as const,
    },
    {
      title: "Premium delivery",
      description: "Clear reporting, named owners, and no black box vendors between you and the work.",
      icon: "spark" as const,
    },
  ],
};

export const journey = {
  headline: "How we partner with you",
  steps: [
    {
      title: "Discovery",
      description:
        "We map your stack, risks, and support volume so the engagement starts with clarity, not assumptions.",
      icon: "search" as const,
    },
    {
      title: "Design",
      description:
        "Playbooks, SLAs, tooling choices, and escalation paths tailored to how your business actually runs.",
      icon: "grid" as const,
    },
    {
      title: "Activate",
      description:
        "We stand up monitoring or your desk, train agents, and prove the first week of live operations.",
      icon: "rocket" as const,
    },
    {
      title: "Operate and improve",
      description:
        "Ongoing reporting, QA, and tuning so coverage and CSAT keep getting sharper over time.",
      icon: "chart" as const,
    },
  ],
};

export const ctaBanner = {
  headline: "Ready for ops that feel modern?",
  primary: { label: "Book a call", href: "/#get-started" },
  secondary: { label: "See services", href: "/#services" },
};

export const cybersecurity = {
  leadForm: {
    id: "security-lead",
    heading: "Talk to a security specialist",
    subheading: "Tell us about your environment. We will follow up within one business day.",
    formspreeId: "xykrqlpb",
    submitLabel: "Request a security consult",
  },
};

export const customerService = {
  leadForm: {
    id: "support-lead",
    heading: "Talk to a customer care specialist",
    subheading: "Tell us where your support operation needs help. We will follow up within one business day.",
    formspreeId: "xzdnlyvy",
    submitLabel: "Request a CX consult",
  },
};

export const formFlow = {
  steps: [
    { key: "support" as const, nextLabel: "Want to secure your business?", nextHint: "Jump to cybersecurity" },
    { key: "security" as const, nextLabel: "Still unsure?", nextHint: "Send a general note" },
    { key: "general" as const, nextLabel: null, nextHint: null },
  ],
};

export const testimonials = {
  eyebrow: "Our customers",
  headline: "Our success stories.",
  subheadline:
    "Operators and founders share how Saylware cut noise, steadied support, and made ops feel under control again.",
  items: [
    {
      quote:
        "They cut our alert queue down to what actually mattered. First vendor that felt like an extension of our team, not another dashboard.",
      name: "Ahmad Al Amir",
      role: "Manager IT Systems, Phoenix Solutions",
      company: "Phoenix Solutions",
      rating: "5.0",
      tags: ["Security", "MDR", "Noise down"],
      type: "Business Types",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      logo: "PS",
      logoColor: "#8b7cff",
      logoId: "phoenix" as const,
    },
    {
      quote:
        "Our support tickets stopped piling up and our CSAT went up in the first month. Reporting is genuinely useful, not just a vanity chart.",
      name: "Stephanie Ramos",
      role: "CEO, All Pest Control",
      company: "All Pest Control",
      rating: "5.0",
      tags: ["Support", "CSAT", "Desk"],
      type: "Business Types",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
      logo: "AP",
      logoColor: "#c6f24a",
      logoId: "allpest" as const,
    },
    {
      quote:
        "Straightforward, responsive, and they explain things in plain language instead of jargon. Exactly what a growing company needs.",
      name: "Thomas R.",
      role: "CEO, Quick Fix Auto",
      company: "Quick Fix Auto",
      rating: "5.0",
      tags: ["Advisory", "Clarity", "Growth"],
      type: "Business Types",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      logo: "QF",
      logoColor: "#f59e0b",
      logoId: "quickfix" as const,
    },
    {
      quote:
        "Escalations finally have a clear owner. Our techs get answers faster, and leadership can see what is actually moving in the queue.",
      name: "Steve K.",
      role: "Tech Support Head, AZ Security",
      company: "AZ Security",
      rating: "5.0",
      tags: ["Support", "Escalation", "Ops"],
      type: "Business Types",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      logo: "AZ",
      logoColor: "#38bdf8",
      logoId: "azsecurity" as const,
    },
  ],
};

export const contact = {
  eyebrow: "General inquiry",
  headline: "Still figuring out what you need?",
  description: "Send us a general note and we will point you to the right specialist.",
  email: "hello@saylware.com",
  phone: "+92 000 0000000",
  formspreeId: "xeeybvzn",
};

export const careers = {
  eyebrow: "Career",
  headline: "Work with us",
  filters: ["All Roles", "Remote", "On-site"],
  formspreeId: "xeeybvzn",
  apply: {
    title: "Apply now",
    steps: [
      {
        id: "personal",
        label: "Personal information",
        description: "Share the basics so we can reach you.",
      },
      {
        id: "preferences",
        label: "Role preferences",
        description: "Tell us how you want to work with us.",
      },
      {
        id: "experience",
        label: "Experience",
        description: "Show us what you bring to the table.",
      },
    ],
    workplaceOptions: [
      {
        value: "On-Site",
        title: "On-Site",
        description: "You work from our office or a client site.",
      },
      {
        value: "Hybrid",
        title: "Hybrid",
        description: "Split time between office and remote.",
      },
      {
        value: "Remote",
        title: "Remote",
        description: "Fully remote with clear overlap hours.",
      },
    ],
    employmentOptions: [
      {
        value: "Full Time",
        title: "Full Time",
        description: "Standard full-time role with benefits.",
      },
      {
        value: "Part Time",
        title: "Part Time",
        description: "Fewer hours, same bar for quality.",
      },
      {
        value: "Contract",
        title: "Contract",
        description: "Fixed-scope or project-based engagement.",
      },
    ],
    countries: ["Pakistan", "United States", "United Kingdom", "UAE", "Saudi Arabia", "Canada", "Other"],
  },
  roles: [
    {
      slug: "security-analyst",
      title: "Security Analyst",
      type: "Full Time",
      location: "Remote / Hybrid",
      department: "Security",
      description:
        "Triage alerts, investigate incidents, and write clear findings for customer teams. You will work alongside senior hunters and own cases end to end.",
    },
    {
      slug: "support-lead",
      title: "Support Lead",
      type: "Full Time",
      location: "On-site / Hybrid",
      department: "Customer Care",
      description:
        "Lead a pod of agents, coach quality, and keep SLAs honest. You bridge customers, product, and engineering when tickets need elevation.",
    },
    {
      slug: "cx-specialist",
      title: "CX Specialist",
      type: "Full Time",
      location: "Remote",
      department: "Customer Care",
      description:
        "Handle chat, email, and voice under client brands. You turn messy tickets into calm resolutions and feed insights back to the account team.",
    },
    {
      slug: "threat-hunter",
      title: "Threat Hunter",
      type: "Full Time",
      location: "Remote",
      department: "Security",
      description:
        "Proactively hunt across customer environments, build detections, and partner with IR when something real shows up.",
    },
    {
      slug: "operations-coordinator",
      title: "Operations Coordinator",
      type: "Full Time",
      location: "Hybrid",
      department: "Ops",
      description:
        "Keep schedules, handoffs, and reporting tight across security and support. You are the glue that makes multi client ops feel simple.",
    },
  ],
  perks: [
    {
      title: "Flexible hours",
      description: "Shift patterns that respect deep work and life outside the queue.",
      icon: "clock" as const,
    },
    {
      title: "Learning budget",
      description: "Certs, courses, and conference slots so you keep leveling up.",
      icon: "book" as const,
    },
    {
      title: "Health coverage",
      description: "Solid medical support for you and your household where we operate.",
      icon: "heart" as const,
    },
    {
      title: "Clear growth",
      description: "Named ladders for analysts, agents, and leads. No mystery promotions.",
      icon: "trend" as const,
    },
  ],
  values: [
    { num: "01", title: "We are principled", body: "Say the hard thing early. Protect the customer and the truth." },
    { num: "02", title: "We are bold", body: "Ship improvements, own mistakes, and keep raising the bar." },
    { num: "03", title: "We stay calm", body: "Incidents and angry tickets need composure, not chaos." },
    { num: "04", title: "We teach", body: "Document, coach, and leave the next person better set up." },
  ],
};

export const footer = {
  companyDescription:
    "Saylware provides managed cybersecurity and customer care operations for growing businesses.",
  columns: [
    {
      heading: "Cybersecurity",
      links: serviceCatalog
        .filter((s) => s.facet === "security")
        .slice(0, 3)
        .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    },
    {
      heading: "Customer Care",
      links: serviceCatalog
        .filter((s) => s.facet === "support")
        .slice(0, 3)
        .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    },
    {
      heading: "Company",
      links: [
        { label: "Work with us", href: "/careers" },
        { label: "Get started", href: "/#get-started" },
        { label: "Success stories", href: "/#testimonials" },
      ],
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/saylware/" },
    { label: "X", href: "#" },
  ],
  copyright: `© ${new Date().getFullYear()} Saylware. All rights reserved.`,
};

export function getServiceBySlug(slug: string) {
  return serviceCatalog.find((s) => s.slug === slug);
}

export function getRoleBySlug(slug: string) {
  return careers.roles.find((r) => r.slug === slug);
}

export type CareerRole = (typeof careers.roles)[number];

