// Mobile menu: «Меню» toggles the nav panel; closes on anchor click, Escape and when the desktop bar takes over.
export function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const panel = document.getElementById("site-nav");
  if (!toggle || !panel) return;

  const setOpen = (open: boolean): void => {
    toggle.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("menu-open", open);
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  panel.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a[href^='#']")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 1280px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}
