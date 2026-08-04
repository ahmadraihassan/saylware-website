/**
 * ============================================================
 *  SAYLWARE · SITE CONTENT
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
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#journey" },
    { label: "Clients", href: "#partners" },
  ],
  actions: [
    { label: "Book a call", href: "#get-started" },
  ],
};

export const hero = {
  headline: "Your operations stay sharp with Saylware.",
  subheadline:
    "Advanced cybersecurity and customer support with a calm, capable touch. Book a conversation today.",
  primaryCta: { label: "Explore services", href: "#services" },
  bookCta: { label: "Book a call", href: "#get-started" },
  hours: {
    label: "Working hours",
    weekdays: "Mon to Fri, 9:00 AM to 6:00 PM",
    weekend: "Sat, 10:00 AM to 2:00 PM",
  },
  image:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1200&fit=crop",
  imageAlt: "Saylware specialist ready to help",
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
      description:
        "Continuous detection across endpoints, network, and cloud, with humans who know which alerts matter.",
      tone: "lavender" as const,
    },
    {
      title: "Customers first",
      description:
        "Support desks that sound like your brand, hit your SLAs, and turn feedback into clearer product signal.",
      tone: "mint" as const,
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
  headline: "Our services",
  intro:
    "Pick the service that fits today. Expand later. Both run with the same clarity and ownership.",
  security: {
    id: "cybersecurity",
    title: "Cybersecurity",
    tags: "Detection / Response / Advisory",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&h=1100&fit=crop",
    badge: "Security",
    cert: "SOC ready",
    cardTitle: "Managed Detection",
    cardMeta: "Endpoints · Network · Cloud · IR",
    highlight: "Coverage 24/7 with human triage",
    metaLabel: "Target response",
    metaValue: "< 15 min",
    statusLabel: "Status",
    statusValue: "Accepting clients",
  },
  support: {
    id: "customer-service",
    title: "Customer Care",
    tags: "Support / CX / Analytics",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=1100&fit=crop",
    badge: "Support",
    cert: "Brand aligned",
    cardTitle: "Managed Support",
    cardMeta: "Tickets · Chat · Voice · QA",
    highlight: "SLA backed desk under your brand",
    metaLabel: "Typical ramp",
    metaValue: "2 to 4 weeks",
    statusLabel: "Status",
    statusValue: "Accepting clients",
  },
};

export const values = {
  headline: "Everything your ops stack should feel like",
  items: [
    {
      title: "Resilient systems",
      description:
        "Hardening, detection, and response designed so incidents stay small and recoverable.",
      tone: "lavender" as const,
    },
    {
      title: "Smart operations",
      description:
        "Playbooks and tooling that cut noise so your team spends time on real decisions.",
      tone: "mint" as const,
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
        "Clear reporting, named owners, and no black box vendors between you and the work.",
      tone: "lime" as const,
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
      title: "Operate and improve",
      description:
        "Ongoing reporting, QA, and tuning so coverage and CSAT keep getting sharper over time.",
    },
  ],
};

export const ctaBanner = {
  headline: "Ready for ops that feel modern?",
  primary: { label: "Book a call", href: "#get-started" },
  secondary: { label: "See services", href: "#services" },
};

export const cybersecurity = {
  id: "cybersecurity",
  eyebrow: "Cybersecurity",
  headline: "Detection and response without the noise.",
  description:
    "We monitor, investigate, and respond to threats across your environment so your team is not buried in alerts. Clear reporting, real remediation, no black box.",
  services: [
    {
      title: "Managed Detection and Response",
      description:
        "Continuous monitoring across endpoints, network, and cloud, with human led investigation on every real alert.",
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
        "Practical guidance on hardening your stack, tooling choices, and compliance readiness. No upsell, just advice.",
    },
  ],
  leadForm: {
    id: "security-lead",
    heading: "Talk to a security specialist",
    subheading: "Tell us about your environment. We will follow up within one business day.",
    formspreeId: "xykrqlpb",
    submitLabel: "Request a security consult",
  },
};

export const customerService = {
  id: "customer-service",
  eyebrow: "Customer Care",
  headline: "Support that feels like an extension of your team.",
  description:
    "We design and run customer support operations that protect your reputation the same way we protect your network: proactively, with clear accountability.",
  services: [
    {
      title: "Managed Support Desk",
      description:
        "Trained agents handling tickets, chat, and calls under your brand, with response time targets you set.",
    },
    {
      title: "CX Process Design",
      description:
        "We map your support workflows and fix the friction points before they become churn.",
    },
    {
      title: "Escalation and QA",
      description:
        "A structured escalation path and quality review process, so nothing important slips through.",
    },
    {
      title: "Support Analytics",
      description:
        "Clear reporting on volume, resolution time, and satisfaction so support becomes a visible asset, not a cost center.",
    },
  ],
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
    {
      key: "support" as const,
      nextLabel: "Want to secure your business?",
      nextHint: "Jump to cybersecurity",
    },
    {
      key: "security" as const,
      nextLabel: "Still unsure?",
      nextHint: "Send a general note",
    },
    {
      key: "general" as const,
      nextLabel: null,
      nextHint: null,
    },
  ],
};

export const testimonials = {
  eyebrow: "What clients say",
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
  eyebrow: "General inquiry",
  headline: "Still figuring out what you need?",
  description: "Send us a general note and we will point you to the right specialist.",
  email: "hello@saylware.com",
  phone: "+92 000 0000000",
  formspreeId: "xeeybvzn",
};

export const footer = {
  companyDescription:
    "Saylware provides managed cybersecurity and customer care operations for growing businesses.",
  columns: [
    {
      heading: "Cybersecurity",
      links: [
        { label: "Managed Detection and Response", href: "#cybersecurity" },
        { label: "Incident Response", href: "#cybersecurity" },
        { label: "Vulnerability Management", href: "#cybersecurity" },
      ],
    },
    {
      heading: "Customer Care",
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
