import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] || new URL('../dist', import.meta.url).pathname);
const port = Number(process.env.PORT || process.argv[3] || 8766);
const types = new Map([
  ['.avif', 'image/avif'], ['.css', 'text/css; charset=utf-8'],
  ['.ico', 'image/x-icon'], ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'], ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'], ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.webp', 'image/webp'], ['.woff2', 'font/woff2'], ['.xml', 'application/xml; charset=utf-8']
]);

function resolveRequest(pathname) {
  const decoded = decodeURIComponent(pathname.split('?')[0]);
  const relative = decoded === '/' ? 'index' : decoded.replace(/^\/+/, '').replace(/\/$/, '');
  const candidate = normalize(join(root, relative));
  if (!candidate.startsWith(root)) return null;
  if (existsSync(candidate) && statSync(candidate).isDirectory()) return join(candidate, 'index');
  return candidate;
}

createServer((request, response) => {
  const target = resolveRequest(request.url || '/');
  const selected = target && existsSync(target) && statSync(target).isFile()
    ? target
    : join(root, '404');
  const found = selected === target;

  if (!existsSync(selected)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(found ? 200 : 404, {
    'Content-Type': types.get(extname(selected)) || 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  createReadStream(selected).pipe(response);
}).listen(port, '127.0.0.1', () => {
  process.stdout.write(`Rumman site: http://127.0.0.1:${port}\n`);
});
