/**
 * Minimal static server that behaves like the production nginx setup:
 * `/kk/` -> `kk/index.html`, unknown paths -> `404.html` with status 404.
 *
 *   node scripts/serve-static.mjs [dir=out] [port=3000]
 *
 * For local preview and e2e tests only — production is served by nginx.
 */
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const ROOT = path.resolve(process.argv[2] ?? "out");
const PORT = Number(process.argv[3] ?? 3000);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function isFile(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}

/** Maps a URL path to a file inside ROOT, refusing anything that escapes it. */
async function resolveFile(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  const target = path.resolve(ROOT, `.${decoded}`);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null;
  for (const candidate of [target, path.join(target, "index.html")]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

function send(res, status, file) {
  res.writeHead(status, { "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream" });
  createReadStream(file)
    .on("error", (error) => {
      console.error("serve-static: read failed", error);
      res.destroy();
    })
    .pipe(res);
}

const server = createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url ?? "/", "http://localhost");
    const file = await resolveFile(pathname);
    if (file) return send(res, 200, file);

    const notFound = path.join(ROOT, "404.html");
    if (await isFile(notFound)) return send(res, 404, notFound);
    res.writeHead(404).end("Not found");
  } catch (error) {
    console.error("serve-static:", error);
    res.writeHead(500).end("Internal error");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Serving ${ROOT} at http://localhost:${PORT}`);
});
