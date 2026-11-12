// Motion 5 — on phones a single «Подзвонити» bar slides up once the hero is gone; it hides while the prices call disc or the contacts field is in view.
export function initStickyCall(): void {
  const bar = document.querySelector<HTMLElement>("[data-sticky-call]");
  const hero = document.getElementById("hero");
  const contacts = document.getElementById("contacts");
  if (!bar || !hero || !("IntersectionObserver" in window)) return;
  let heroGone = false;
  let contactsIn = false;
  let ctaIn = false;
  const update = (): void => {
    const show = heroGone && !contactsIn && !ctaIn && !document.documentElement.classList.contains("menu-open");
    bar.classList.toggle("is-shown", show);
    bar.setAttribute("aria-hidden", String(!show));
    bar.querySelector("a")?.setAttribute("tabindex", show ? "0" : "-1");
  };
  new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting; update(); }).observe(hero);
  if (contacts) new IntersectionObserver(([e]) => { contactsIn = e.isIntersecting; update(); }).observe(contacts);
  const cta = document.querySelector("[data-call-cta]");
  if (cta) new IntersectionObserver(([e]) => { ctaIn = e.isIntersecting; update(); }).observe(cta);
  new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  update();
}
