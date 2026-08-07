// PHANTOM static server — test fixture only.
// The app registers a service worker, which requires a secure context; file:// is not one.
// 127.0.0.1 is treated as secure by both Chromium and WebKit, so the SW path is exercised
// exactly as it is on Pages. No caching headers: every test run sees the working tree.

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PHANTOM_PORT || 4317);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, `http://127.0.0.1:${PORT}`).pathname);
  } catch {
    res.writeHead(400).end('bad url');
    return;
  }

  if (urlPath === '/') urlPath = '/index.html';

  const abs = path.resolve(ROOT, '.' + urlPath);
  // Never serve outside the repo, and never serve git internals.
  if (!abs.startsWith(ROOT) || abs.includes(`${path.sep}.git${path.sep}`)) {
    res.writeHead(403).end('forbidden');
    return;
  }

  fs.readFile(abs, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('not found: ' + urlPath);
      return;
    }
    res.writeHead(200, {
      'content-type': MIME[path.extname(abs).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-store, no-cache, must-revalidate',
      'service-worker-allowed': '/',
    });
    res.end(buf);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`phantom static server on http://127.0.0.1:${PORT} (root: ${ROOT})`);
});
