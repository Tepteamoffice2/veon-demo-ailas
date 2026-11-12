// Motion 2 — the fixation dot follows the row under the pointer or focus and rests at the open row.
// Without JS the open row marks itself with its own dot (CSS); <details> works natively.
export function initDirections(): void {
  const list = document.querySelector<HTMLElement>("[data-directions]");
  const dot = list?.querySelector<HTMLElement>("[data-dir-dot]");
  if (!list || !dot) return;
  const rows = Array.from(list.querySelectorAll<HTMLDetailsElement>("details[data-dir]"));
  list.classList.add("has-dot");

  let active: HTMLDetailsElement | null = null;
  const place = (row: HTMLDetailsElement | null): void => {
    rows.forEach((r) => r.classList.toggle("is-active", r === row));
    if (!row) {
      dot.classList.remove("is-shown");
      return;
    }
    const summary = row.querySelector("summary");
    const y = row.offsetTop + (summary ? summary.offsetHeight / 2 : 0);
    dot.style.transform = `translate3d(0, ${y}px, 0) translateY(-50%)`;
    dot.classList.add("is-shown");
  };
  const rest = (): HTMLDetailsElement | null => rows.find((r) => r.open) ?? null;

  rows.forEach((row) => {
    row.addEventListener("pointerenter", () => { active = row; place(row); });
    row.addEventListener("focusin", () => { active = row; place(row); });
    row.addEventListener("toggle", () => {
      if (row.open) rows.forEach((r) => { if (r !== row) r.open = false; });
      requestAnimationFrame(() => place(row.open ? row : (active === row ? row : rest())));
    });
  });
  list.addEventListener("pointerleave", () => { active = null; place(rest()); });
  list.addEventListener("focusout", (e) => {
    if (!list.contains(e.relatedTarget as Node | null)) { active = null; place(rest()); }
  });
  window.addEventListener("resize", () => place(active ?? rest()), { passive: true });
  place(rest());
}
