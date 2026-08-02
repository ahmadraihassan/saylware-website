/**
 * ============================================================
 *  SAYLWARE — SITE CONTENT
 * ============================================================
 *  This is the ONLY file you should need to change for everyday
 *  updates: logo text, headlines, descriptions, testimonials,
 *  contact info, and form endpoints.
 *
 *  Edit the text between the quotes " " — don't touch anything
 *  else (commas, brackets, colons) or the site will break.
 *
 *  After editing, save the file and redeploy (see README.md).
 * ============================================================
 */

export const site = {
  name: "Saylware",
  tagline: "Security operations and customer experience, run right.",
  domain: "saylware.com", // update if different
};

export const nav = {
  logoText: "Saylware",
  links: [
    { label: "Cybersecurity", href: "#cybersecurity" },
    { label: "Customer Service", href: "#customer-service" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
};

export const hero = {
  eyebrow: "Two disciplines. One standard of care.",
  headline: "We keep your business protected — and your customers heard.",
  subheadline:
    "Saylware runs the two functions every growing company underestimates: security operations and customer support. Pick one track below, or both.",
  primaryCta: { label: "Talk to Security", href: "#security-lead" },
  secondaryCta: { label: "Talk to Support", href: "#support-lead" },
};

export const trustBar = {
  label: "Built on the same operational discipline used by enterprise SOCs and support desks",
  stats: [
    { value: "24/7", label: "Monitoring & response coverage" },
    { value: "<15min", label: "Target initial response time" },
    { value: "2", label: "Dedicated specialist tracks" },
  ],
};

/* ------------------------------------------------------------ */
/*  CYBERSECURITY TRACK                                          */
/* ------------------------------------------------------------ */
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
    // Replace with your Formspree form ID for the Cybersecurity funnel.
    // Get this from https://formspree.io after creating a form.
    formspreeId: "xykrqlpb",
    submitLabel: "Request a security consult",
  },
};

/* ------------------------------------------------------------ */
/*  CUSTOMER SERVICE TRACK                                       */
/* ------------------------------------------------------------ */
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
    // Replace with your Formspree form ID for the Customer Service funnel.
    formspreeId: "xzdnlyvy",
    submitLabel: "Request a CX consult",
  },
};

/* ------------------------------------------------------------ */
/*  TESTIMONIALS                                                 */
/* ------------------------------------------------------------ */
export const testimonials = {
  eyebrow: "What clients say",
  headline: "Trusted by teams who can't afford to guess.",
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

/* ------------------------------------------------------------ */
/*  CONTACT / FOOTER                                             */
/* ------------------------------------------------------------ */
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