import http from 'http';
import { stat } from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import url from 'url';

const root = process.cwd();
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  try {
    const parsed = url.parse(req.url);
    let urlPath = decodeURIComponent(parsed.pathname || '/');
    if (urlPath === '/') urlPath = '/index.html';

    const filePath = path.join(root, urlPath);
    const s = await stat(filePath);

    if (s.isDirectory()) {
      const idx = path.join(filePath, 'index.html');
      try {
        await stat(idx);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return createReadStream(idx).pipe(res);
      } catch {
        res.writeHead(403).end('Directory listing disabled');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404).end('Not found');
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Serving ${root} on http://localhost:${PORT}`);
});
