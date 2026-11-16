import { createServer } from "node:http";
import { stat, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".txt": "text/plain", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon" };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url || "/", "http://localhost").pathname);
    let target = path.resolve(root, "." + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
    let info;
    try { info = await stat(target); } catch { target += ".html"; info = await stat(target); }
    if (info.isDirectory()) target = path.join(target, "index.html");
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
