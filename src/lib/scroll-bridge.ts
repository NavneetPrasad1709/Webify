/**
 * A three-function seam between Lenis and ScrollTrigger.
 *
 * SmoothScroll wraps the whole app from the root layout, so anything it
 * imports every route imports. It needed exactly two ScrollTrigger methods,
 * `update` and `refresh`, and paid 121 kB of animation library for them on
 * pages like /privacy that run no animation at all.
 *
 * So the dependency is inverted. `@/lib/anim` registers the two methods here
 * when a page actually loads gsap; SmoothScroll subscribes and drives them if
 * and when they show up. Routes that animate wire themselves together; routes
 * that do not never load gsap at all. This module has no imports on purpose.
 */

export type ScrollBridge = {
  update: () => void;
  refresh: () => void;
};

let current: ScrollBridge | null = null;
const listeners = new Set<(bridge: ScrollBridge) => void>();

/** Called by @/lib/anim once ScrollTrigger is registered. */
export function registerScrollBridge(bridge: ScrollBridge) {
  current = bridge;
  listeners.forEach((listener) => listener(bridge));
}

export function getScrollBridge(): ScrollBridge | null {
  return current;
}

/**
 * Fires immediately when gsap is already loaded, and later if it arrives
 * afterwards. Returns an unsubscribe function.
 */
export function onScrollBridge(listener: (bridge: ScrollBridge) => void) {
  if (current) listener(current);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
