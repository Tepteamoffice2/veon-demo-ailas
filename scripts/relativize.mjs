// After `astro build`: inline the bundled module script and rewrite root-absolute asset URLs to relative ones,
// so dist/index.html works from file:// (site_capture, local preview) and from a GitHub Pages sub-path.
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(process.cwd(), "dist");
const roots = ["_astro", "fonts", "img", "favicon.svg"];
const rel = (prefix) => (s) => s.replace(new RegExp(`(["'(=\s])/(${roots.join("|").replace(".", "\.")})`, "g"), `$1${prefix}$2`);

for (const name of fs.readdirSync(dist).filter((f) => f.endsWith(".html"))) {
  const file = path.join(dist, name);
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<script type="module" src="\/_astro\/([^"]+\.js)"><\/script>/g, (m, js) => {
    const p = path.join(dist, "_astro", js);
    if (!fs.existsSync(p)) return m;
    const code = fs.readFileSync(p, "utf8");
    if (/\bimport\s*[{*\w]|\bimport\(/.test(code)) return m; // keep chunked modules as files
    return `<script type="module">${code.replace(/<\/script/gi, "<\/script")}</script>`;
  });
  html = rel("./")(html);
  fs.writeFileSync(file, html);
}
const astroDir = path.join(dist, "_astro");
if (fs.existsSync(astroDir)) {
  for (const name of fs.readdirSync(astroDir).filter((f) => f.endsWith(".css"))) {
    const file = path.join(astroDir, name);
    fs.writeFileSync(file, rel("../")(fs.readFileSync(file, "utf8")));
  }
}
console.log("relativize: dist URLs are relative");
