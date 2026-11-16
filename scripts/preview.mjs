import { createServer } from "node:http";
import { stat, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".txt": "text/plain", ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".otf": "font/otf", ".mp4": "video/mp4", ".webm": "video/webm", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ico": "image/x-icon" };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url || "/", "http://localhost").pathname);
    const requested = path.resolve(root, "." + pathname);
    if (requested !== root && !requested.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
    // Next can emit route.html beside a route/ directory containing RSC files.
    // Prefer an actual index, then try the sibling HTML when that index is absent.
    let target;
    for (const candidate of [requested, path.join(requested, "index.html"), requested + ".html"]) {
      try { if ((await stat(candidate)).isFile()) { target = candidate; break; } } catch {}
    }
    if (!target) throw new Error("Exported page not found");
    const body = await readFile(target);
    res.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found. Run npm run build to create all app exports.");
  }
});
const args = process.argv.slice(2);
const option = (name) => { const index = args.indexOf(name); return index < 0 ? undefined : args[index + 1]; };
const port = Number(option("--port") || process.env.PORT || 3000);
const host = option("--host") || "0.0.0.0";
server.listen(port, host, () => console.log(`Design studies: http://localhost:${port}`));
