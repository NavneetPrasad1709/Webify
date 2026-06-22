/**
 * Data for the /work index. Intentionally empty - the /work page now leads with
 * capability + process instead of placeholder "brand work" tiles. Repopulate
 * these with real captures (and re-enable the gallery sections in habito-work)
 * once there's published work to show.
 */
export interface ShowcaseTile {
  title: string;
  category: string;
  year: string;
  image: { src: string; alt: string };
  href?: string;
  shape?: "portrait" | "landscape" | "square";
}

export interface ShowcaseRow {
  cols: 2 | 3;
  items: ShowcaseTile[];
}

export interface PartnerQuote {
  client: string;
  company: string;
  year: string;
  feedback: string;
  services: string[];
}

export const SHOWCASE_ROWS: ShowcaseRow[] = [];
export const PARTNER_QUOTES: PartnerQuote[] = [];
export const PARTNERS: string[] = [];
