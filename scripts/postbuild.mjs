/**
 * Removes duplicate 404 pages that `next build` emits as folders. nginx would
 * serve them with status 200 at /404/ and /_not-found/; the real 404 page is
 * out/404.html (wired via `error_page 404 /404.html;`).
 */
import { rm } from "node:fs/promises";

for (const dir of ["out/404", "out/_not-found"]) {
  await rm(dir, { recursive: true, force: true });
}
