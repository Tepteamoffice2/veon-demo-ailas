// Price switcher (WAI-ARIA tabs). Without JS every panel is visible as a plain list.
// Motion 3 — the panel crossfades and the figures rise 8px (CSS, .is-entering).
export function initPriceTabs(): void {
  const root = document.querySelector<HTMLElement>("[data-tabs]");
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[role='tab']"));
  const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls") ?? ""));
  root.classList.add("is-enhanced");

  const select = (i: number, focus: boolean): void => {
    tabs.forEach((t, j) => {
      const on = j === i;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const p = panels[j];
      if (!p) return;
      p.hidden = !on;
      if (on) {
        p.classList.remove("is-entering");
        void p.offsetWidth;
        p.classList.add("is-entering");
      }
    });
    if (focus) tabs[i]?.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i, false));
    tab.addEventListener("keydown", (e) => {
      const last = tabs.length - 1;
      let next = -1;
      if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
      else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = last;
      if (next >= 0) { e.preventDefault(); select(next, true); }
    });
  });
  select(0, false);
  panels.forEach((p) => p?.classList.remove("is-entering"));
}
