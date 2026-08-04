/**
 * ============================================================
 *  SAYLWARE — SITE CONTENT
 * ============================================================
 *  Everyday edits live here: headlines, services, testimonials,
 *  contact info, and Formspree IDs. Save and redeploy after changes.
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
    { label: "Home", href: "#" },
    { label: "About", href: "#pillars" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#journey" },
  ],
  actions: [
    { label: "Book a call", href: "#contact" },
    { label: "Get started", href: "#security-lead" },
  ],
};

export const hero = {
  headlineLeft: "We protect what",
  headlineRight: "growth depends on.",
  subheadline:
    "Saylware runs security operations and customer support with the same standard of care — so your systems stay safe and your customers stay heard.",
  hotspot: {
    title: "Active defense",
    description: "24/7 monitoring with human-led investigation on every real alert.",
    cta: "View more",
    href: "#cybersecurity",
  },
  image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=1000&fit=crop",
  imageAlt: "Secure operations center",
};

export const pillars = {
  eyebrow: "What we stand for",
  headline: "Reimagining operations with purpose",
  description:
    "Two specialist tracks. One operating standard. Built for teams that can't afford noise, downtime, or forgotten tickets.",
  items: [
    {
      title: "Always on watch",
      description:
        "Continuous detection across endpoints, network, and cloud — with humans who know which alerts matter.",
      tone: "amber" as const,
    },
    {
      title: "Customers first",
      description:
        "Support desks that sound like your brand, hit your SLAs, and turn feedback into clearer product signal.",
      tone: "sky" as const,
    },
    {
      title: "Clear accountability",
      description:
        "Timelines, reporting, and escalation paths you can hand to leadership without translating jargon.",
      tone: "peach" as const,
    },
  ],
};

export const signature = {
  headline: "Our signature tracks",
  security: {
    id: "cybersecurity",
    title: "CYBER DEFENSE",
    tags: "Detection / Response / Advisory",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&h=1100&fit=crop",
    badge: "SECURITY OPS",
    cert: "SOC-ready",
    cardTitle: "Managed Detection",
    cardMeta: "Endpoints · Network · Cloud · IR",
    highlight: "Coverage 24/7 — human triage",
    metaLabel: "Target response",
    metaValue: "< 15 min",
    statusLabel: "Status",
    statusValue: "Accepting clients",
  },
  support: {
    id: "customer-service",
    title: "CUSTOMER DESK",
    tags: "Support / CX / Analytics",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=1100&fit=crop",
    badge: "CX OPS",
    cert: "Brand-aligned",
    cardTitle: "Managed Support",
    cardMeta: "Tickets · Chat · Voice · QA",
    highlight: "SLA-backed desk under your brand",
    metaLabel: "Typical ramp",
    metaValue: "2–4 weeks",
    statusLabel: "Status",
    statusValue: "Accepting clients",
  },
};

export const values = {
  headline: "Where quality meets opportunity",
  items: [
    {
      title: "Resilient systems",
      description:
        "Hardening, detection, and response designed so incidents stay small and recoverable.",
      tone: "amber" as const,
    },
    {
      title: "Smart operations",
      description:
        "Playbooks and tooling that cut noise so your team spends time on real decisions.",
      tone: "sky" as const,
    },
    {
      title: "Connected teams",
      description:
        "Security and support handoffs that keep context intact from alert to customer reply.",
      tone: "peach" as const,
    },
    {
      title: "Premium delivery",
      description:
        "Clear reporting, named owners, and no black-box vendors between you and the work.",
      tone: "rose" as const,
    },
  ],
};

export const journey = {
  headline: "The journey of partnership",
  steps: [
    {
      title: "Discovery",
      description:
        "We map your stack, risks, and support volume so the engagement starts with clarity — not assumptions.",
    },
    {
      title: "Design",
      description:
        "Playbooks, SLAs, tooling choices, and escalation paths tailored to how your business actually runs.",
    },
    {
      title: "Activate",
      description:
        "We stand up monitoring or your desk, train agents, and prove the first week of live operations.",
    },
    {
      title: "Operate & improve",
      description:
        "Ongoing reporting, QA, and tuning — so coverage and CSAT keep getting sharper over time.",
    },
  ],
};

export const ctaBanner = {
  headline: "Invest in defenses that matter",
  primary: { label: "Book a call", href: "#contact" },
  secondary: { label: "Talk to security", href: "#security-lead" },
  image:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop",
};

export const trustBar = {
  label: "Built on the same operational discipline used by enterprise SOCs and support desks",
  stats: [
    { value: "24/7", label: "Monitoring & response coverage" },
    { value: "<15min", label: "Target initial response time" },
    { value: "2", label: "Dedicated specialist tracks" },
  ],
};

export const cybersecurity = {
  id: "cybersecurity",
  eyebrow: "Cybersecurity Services",
  headline: "Detection and response, without the noise.",
  description:
    "We monitor, investigate, and respond to threats across your environment so your team isn't buried in alerts. Clear reporting, real remediation, no black box.",
  services: [
    {
      title: "Managed Detection & Response",
      description:
        "Continuous monitoring across endpoints, network, and cloud, with human-led investigation on every real alert.",
    },
    {
      title: "Incident Response",
      description:
        "Rapid triage and containment when something goes wrong, with a clear timeline of what happened and what to fix.",
    },
    {
      title: "Vulnerability Management",
      description:
        "Ongoing scanning and prioritization so you patch what attackers would actually use first.",
    },
    {
      title: "Security Advisory",
      description:
        "Practical guidance on hardening your stack, tooling choices, and compliance readiness — no upsell, just advice.",
    },
  ],
  leadForm: {
    id: "security-lead",
    heading: "Talk to a security specialist",
    subheading: "Tell us about your environment. We'll follow up within one business day.",
    formspreeId: "xykrqlpb",
    submitLabel: "Request a security consult",
  },
};

export const customerService = {
  id: "customer-service",
  eyebrow: "Customer Service Solutions",
  headline: "Support that feels like an extension of your team.",
  description:
    "We design and run customer support operations that protect your reputation the same way we protect your network — proactively, and with clear accountability.",
  services: [
    {
      title: "Managed Support Desk",
      description:
        "Trained agents handling tickets, chat, and calls under your brand, with response-time targets you set.",
    },
    {
      title: "CX Process Design",
      description:
        "We map your support workflows and fix the friction points before they become churn.",
    },
    {
      title: "Escalation & QA",
      description:
        "A structured escalation path and quality review process, so nothing important slips through.",
    },
    {
      title: "Support Analytics",
      description:
        "Clear reporting on volume, resolution time, and satisfaction — so support becomes a visible asset, not a cost center.",
    },
  ],
  leadForm: {
    id: "support-lead",
    heading: "Talk to a customer experience specialist",
    subheading: "Tell us where your support operation needs help. We'll follow up within one business day.",
    formspreeId: "xzdnlyvy",
    submitLabel: "Request a CX consult",
  },
};

export const testimonials = {
  eyebrow: "Social proof",
  headline: "Trusted by operators and founders",
  items: [
    {
      quote:
        "They cut our alert queue down to what actually mattered. First vendor that felt like an extension of our team, not another dashboard.",
      name: "Jane Doe",
      role: "Head of IT, Example Co.",
    },
    {
      quote:
        "Our support tickets stopped piling up and our CSAT went up in the first month. Reporting is genuinely useful, not just a vanity chart.",
      name: "John Smith",
      role: "COO, Example Retail",
    },
    {
      quote:
        "Straightforward, responsive, and they explain things in plain language instead of jargon. Exactly what a growing company needs.",
      name: "Amina Raza",
      role: "Founder, Example Startup",
    },
  ],
};

export const contact = {
  eyebrow: "Get in touch",
  headline: "Not sure which track you need?",
  description: "Send us a general note and we'll point you to the right specialist.",
  email: "hello@saylware.com",
  phone: "+92 000 0000000",
  formspreeId: "xeeybvzn",
};

export const footer = {
  companyDescription:
    "Saylware provides managed cybersecurity and customer service operations for growing businesses.",
  columns: [
    {
      heading: "Cybersecurity",
      links: [
        { label: "Managed Detection & Response", href: "#cybersecurity" },
        { label: "Incident Response", href: "#cybersecurity" },
        { label: "Vulnerability Management", href: "#cybersecurity" },
      ],
    },
    {
      heading: "Customer Service",
      links: [
        { label: "Managed Support Desk", href: "#customer-service" },
        { label: "CX Process Design", href: "#customer-service" },
        { label: "Support Analytics", href: "#customer-service" },
      ],
    },
  ],
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
  ],
  copyright: `© ${new Date().getFullYear()} Saylware. All rights reserved.`,
};
