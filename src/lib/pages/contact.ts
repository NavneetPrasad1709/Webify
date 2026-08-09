/** Static content for the /contact page. Contact details from webify.org.in. */

import { BOOKING_URL } from "@/lib/site";

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon: "calendar" | "email" | "location";
};

/* Canonical contact details, kept in sync with the site footer. */
export const contactChannels: ContactChannel[] = [
  {
    label: "Book a Call",
    value: "Free 20 minutes, pick a time",
    href: BOOKING_URL,
    external: true,
    icon: "calendar",
  },
  {
    label: "Email",
    value: "contact@webify.org.in",
    href: "mailto:contact@webify.org.in?subject=Project%20inquiry",
    icon: "email",
  },
  {
    label: "Location",
    value: "Remote-first, worldwide",
    href: "/about",
    icon: "location",
  },
];

export type RoutingCard = {
  number: string;
  title: string;
  text: string;
  cta: string;
  href: string;
};

export const routingCards: RoutingCard[] = [
  {
    number: "01",
    title: "Start a Project",
    text: "Email us what you are building and a senior team member replies within 24 hours, with an honest take on scope and timeline.",
    cta: "Email Us",
    href: "mailto:contact@webify.org.in?subject=Project%20inquiry",
  },
  {
    /* The low-commitment route deliberately points at the calendar, not a
       mailto: someone who is unsure what they need converts on a short call
       far better than on a blank compose window, and a booking is measurable
       where a mailto is not. */
    number: "02",
    title: "Ask a Question",
    text: "Not sure what you need yet? Take twenty minutes and talk it through. No deck, no pressure, and you leave with a straight answer either way.",
    cta: "Book a Call",
    href: BOOKING_URL,
  },
];

export type FormField = {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email";
  required: boolean;
  /** Maps to the HTML autocomplete token so browsers can fill the field. */
  autoComplete: string;
  full?: boolean;
};

/* Only a name and a reachable address are required. Everything else is a
   qualifier: a founder without a registered company is exactly the visitor
   this site is for, so a required company field would turn them away. */
export const formFields: FormField[] = [
  {
    id: "first-name",
    label: "First name",
    placeholder: "e.g. James",
    type: "text",
    required: true,
    autoComplete: "given-name",
  },
  {
    id: "company-name",
    label: "Company (optional)",
    placeholder: "e.g. Webify",
    type: "text",
    required: false,
    autoComplete: "organization",
  },
  {
    id: "email",
    label: "Email address",
    placeholder: "hello@example.com",
    type: "email",
    required: true,
    autoComplete: "email",
    full: true,
  },
  /* Sits beside the timeline select, so the two optional qualifiers share a
     row instead of each leaving half the grid empty. */
  {
    id: "project-type",
    label: "What do you need? (optional)",
    placeholder: "e.g. New website, redesign, app",
    type: "text",
    required: false,
    autoComplete: "off",
  },
];

export const messageField = {
  id: "message",
  label: "Message",
  placeholder: "Tell us about your project and goals",
};

/* Optional qualifier: cheap for the visitor, valuable for the reply.
   Deliberately no budget select while public pricing is withheld. */
export const timelineField = {
  id: "timeline",
  label: "Launch timing (optional)",
  placeholder: "Select a timeline",
  options: [
    "As soon as possible",
    "In 1 to 2 months",
    "In 3+ months",
    "Just exploring",
  ],
};

export const successMessage = "Thanks, your message is in. A senior team member replies within 24 hours.";
