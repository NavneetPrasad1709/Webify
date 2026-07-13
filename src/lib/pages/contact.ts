/** Static content for the /contact page. Contact details from webify.org.in. */

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
    value: "Free intro call, no obligation",
    href: "mailto:contact@webify.org.in?subject=Book%20a%20call",
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
    number: "02",
    title: "Ask a Question",
    text: "Not sure what you need yet? Send the question as it is in your head, we will point you in the right direction.",
    cta: "Email Support",
    href: "mailto:contact@webify.org.in?subject=Support",
  },
];

export type FormField = {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email";
  required: boolean;
  full?: boolean;
};

export const formFields: FormField[] = [
  { id: "first-name", label: "First Name", placeholder: "e.g. James", type: "text", required: true },
  { id: "company-name", label: "Company Name", placeholder: "e.g. Webify", type: "text", required: true },
  {
    id: "project-type",
    label: "What do you need?",
    placeholder: "e.g. New website, redesign, app",
    type: "text",
    required: false,
  },
  { id: "email", label: "Email Address", placeholder: "hello@example.com", type: "email", required: true, full: true },
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
  label: "When do you want to launch?",
  placeholder: "Select a timeline (optional)",
  options: [
    "As soon as possible",
    "In 1 to 2 months",
    "In 3+ months",
    "Just exploring",
  ],
};

export const successMessage = "Thanks, your message is in. A senior team member replies within 24 hours.";
