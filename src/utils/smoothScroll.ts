import type { MouseEvent } from "react";

export function scrollToSection(
  event: MouseEvent<HTMLAnchorElement>,
  hash: string
) {
  if (!hash.startsWith("#")) return;

  const target = document.querySelector(hash);
  if (!target) return;

  event.preventDefault();

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const desktopShift =
    window.innerWidth >= 640
      ? Number((target as HTMLElement).dataset.scrollShift ?? 0)
      : 0;
  const top = target.getBoundingClientRect().top + window.scrollY - 10 + desktopShift;

  window.history.pushState(null, "", hash);
  window.scrollTo({
    top,
    behavior: reducedMotion ? "auto" : "smooth",
  });
}
