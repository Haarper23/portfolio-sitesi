import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function scrollReveal(
  target: gsap.TweenTarget,
  trigger: Element | string,
  vars?: gsap.TweenVars
) {
  return gsap.from(target, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: "top 85%",
      once: true,
    },
    ...vars,
  });
}

export function staggerReveal(
  targets: string,
  trigger: Element | string,
  stagger = 0.1,
  vars?: gsap.TweenVars
) {
  return gsap.from(targets, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: "top 80%",
      once: true,
    },
    ...vars,
  });
}

export { gsap, ScrollTrigger };
