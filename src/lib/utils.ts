export { cn } from "./cn";

/** Zero-pad a number to 2 digits ("3" → "03"). */
export function pad(n: number) {
  return String(n).padStart(2, "0");
}
