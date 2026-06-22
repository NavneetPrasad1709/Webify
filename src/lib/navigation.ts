/**
 * Single source of truth for the site's real routes.
 *
 * The Sterling Gate kinetic nav wires these inline (to avoid restructuring its
 * locked markup); the footer and any future nav consume this list.
 *
 * NOTE: the menu's "Blog" item is intentionally NOT here - the sitemap has no
 * /blog route yet, so that link is left untouched in the component pending a
 * decision (add /blog, drop it, or repoint it).
 */
export type NavLink = {
  /** Visible label - must match the locked component copy exactly. */
  label: string;
  /** Real Next.js route. */
  href: string;
};

export const PRIMARY_NAV: readonly NavLink[] = [
  { label: "About us", href: "/about" },
  { label: "Our work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Contact us", href: "/contact" },
] as const;
