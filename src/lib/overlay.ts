"use client";

/**
 * Shared overlay coordination for the site's fixed dialogs (contact modal +
 * lead popup). Two jobs:
 *   1. Ref-counted scroll lock — emits webify:lock-scroll / webify:unlock-scroll
 *      so the Lenis provider can stop()/start() smooth scroll and the page can't
 *      scroll behind an open overlay (mobile bug fix).
 *   2. "Only one modal at a time" guard — the lead popup checks
 *      isContactModalOpen() and never fires on top of the contact modal.
 */
let lockCount = 0;
let contactModalOpen = false;

export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1 && typeof window !== "undefined") {
    window.dispatchEvent(new Event("webify:lock-scroll"));
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0 && typeof window !== "undefined") {
    window.dispatchEvent(new Event("webify:unlock-scroll"));
  }
}

export function setContactModalOpen(open: boolean) {
  contactModalOpen = open;
}

export function isContactModalOpen() {
  return contactModalOpen;
}
