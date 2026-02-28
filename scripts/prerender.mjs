import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = resolve('build');
const PORT = 4173;

// Minimal static file server for the build output
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = createServer((req, res) => {
  const filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);
  try {
    const data = readFileSync(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    // SPA fallback
    const html = readFileSync(join(DIST, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
});

server.listen(PORT, async () => {
  console.log(`Serving build on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

  // Wait for React to render
  await page.waitForSelector('#root > *');

  const html = await page.content();
  writeFileSync(join(DIST, 'index.html'), html);
  console.log('Prerendered index.html written');

  await browser.close();
  server.close();
});
