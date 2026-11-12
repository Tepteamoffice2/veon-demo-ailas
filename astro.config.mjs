// VEON demo base: technical setup only. Visual design comes from design/concept.md of each client.
// CSS is inlined and asset URLs are made relative after the build (scripts/relativize.mjs),
// so dist/ opens from disk (file://) and from any sub-path of a static host.
import { defineConfig } from "astro/config";

export default defineConfig({
  build: { inlineStylesheets: "always" },
  compressHTML: true,
});
