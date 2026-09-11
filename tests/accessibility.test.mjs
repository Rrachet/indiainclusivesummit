/*
 * Accessibility and resilience regression tests.
 *
 * The site is about disability inclusion, so these are correctness tests, not
 * nice-to-haves. They run a real browser against a real static server and
 * assert the behaviour that is easy to break by accident:
 *
 *   - the page is fully readable when the motion CDN is unreachable
 *   - the page is fully readable under prefers-reduced-motion
 *   - keyboard users can reach the content
 *   - landmarks, headings and ARIA state are correct
 *
 * Run with: npm test
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

function startServer() {
  const server = createServer(async (req, res) => {
    const path = req.url.split('?')[0];
    const file = join(ROOT, normalize(path === '/' ? 'index.html' : path).replace(/^(\.\.[/\\])+/, ''));
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('Not found');
    }
  });
  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'ok  ' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

/*
 * The motion layer is optional by design, so every context here must pass with
 * or without it. External hosts are blocked so the tests are hermetic and also
 * exercise the CDN-failure path, which is the one most likely to regress.
 */
async function auditContext(browser, label, url, contextOptions) {
  const context = await browser.newContext(contextOptions);
  await context.route('**://*.cdnjs.cloudflare.com/**', route => route.abort());
  await context.route('**://*.unsplash.com/**', route => route.abort());
  await context.route('**://fonts.g*/**', route => route.abort());

  const page = await context.newPage();
  const jsErrors = [];
  page.on('pageerror', error => jsErrors.push(error.message));

  await page.goto(url);
  await page.waitForTimeout(2600);

  check(`[${label}] no uncaught JavaScript errors`, jsErrors.length === 0, jsErrors.join(' | '));

  const cards = await page.locator('.why-track article').count();
  check(`[${label}] all four "why" cards render`, cards === 4, `found ${cards}`);

  // Without the motion layer, a horizontally overflowing track inside an
  // overflow:hidden box would put cards 2-4 permanently out of reach.
  const layout = await page.evaluate(() => {
    const scroller = document.querySelector('.why-scroll');
    return {
      enhanced: document.documentElement.classList.contains('motion-ready'),
      overflowX: getComputedStyle(scroller).overflowX,
      scrollWidth: scroller.scrollWidth,
      clientWidth: scroller.clientWidth
    };
  });
  const clipped =
    !layout.enhanced && layout.overflowX === 'hidden' && layout.scrollWidth > layout.clientWidth + 1;
  check(`[${label}] no content clipped out of reach`, !clipped, JSON.stringify(layout));

  check(
    `[${label}] loader always clears`,
    await page.evaluate(() => !document.querySelector('#loader'))
  );

  await context.close();
}

async function auditAccessibility(browser, url) {
  const context = await browser.newContext();
  await context.route('**://*.cdnjs.cloudflare.com/**', route => route.abort());
  const page = await context.newPage();
  await page.goto(url);
  await page.waitForTimeout(2600);

  await page.keyboard.press('Tab');
  const firstStop = await page.evaluate(() => document.activeElement.className);
  check('skip link is the first tab stop', firstStop.includes('skip-link'), firstStop);

  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  check(
    'skip link moves focus to <main>',
    (await page.evaluate(() => document.activeElement.id)) === 'main'
  );

  const structure = await page.evaluate(() => ({
    h1Count: document.querySelectorAll('h1').length,
    headings: [...document.querySelectorAll('h1, h2, h3')].map(h => h.tagName).join(','),
    navLabel: document.querySelector('nav')?.getAttribute('aria-label'),
    hasMain: !!document.querySelector('main#main'),
    region: {
      role: document.querySelector('.why-scroll')?.getAttribute('role'),
      label: document.querySelector('.why-scroll')?.getAttribute('aria-label'),
      tabindex: document.querySelector('.why-scroll')?.getAttribute('tabindex')
    },
    imagesWithoutAlt: [...document.querySelectorAll('img')].filter(
      img => img.getAttribute('alt') === null
    ).length,
    decorativeHidden: ['.cursor', '.progress'].every(
      selector => document.querySelector(selector)?.getAttribute('aria-hidden') === 'true'
    )
  }));

  check('exactly one h1', structure.h1Count === 1, `count=${structure.h1Count}`);
  check('no skipped heading levels', !structure.headings.includes('H1,H3'), structure.headings);
  check('navigation and main landmarks are labelled', !!structure.navLabel && structure.hasMain);
  check(
    'horizontal section is a focusable, labelled region',
    structure.region.role === 'region' && !!structure.region.label && structure.region.tabindex === '0',
    JSON.stringify(structure.region)
  );
  check('every image has an alt attribute', structure.imagesWithoutAlt === 0);
  check('decorative chrome is hidden from assistive tech', structure.decorativeHidden);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  const before = await page.getAttribute('.menu', 'aria-expanded');
  await page.click('.menu');
  const opened = await page.getAttribute('.menu', 'aria-expanded');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const closed = await page.getAttribute('.menu', 'aria-expanded');
  check(
    'menu reports its state and closes on Escape',
    before === 'false' && opened === 'true' && closed === 'false',
    `${before} -> ${opened} -> ${closed}`
  );

  const cta = await page.evaluate(() => {
    const link = document.querySelector('.register-cta');
    return { href: link?.href, rel: link?.rel, warnsNewTab: !!link?.querySelector('.visually-hidden') };
  });
  check(
    'registration link is safe and announces the new tab',
    cta.href?.includes('docs.google.com') && cta.rel.includes('noopener') && cta.warnsNewTab,
    JSON.stringify(cta)
  );

  await context.close();
}

// Every externally loaded script must be pinned and integrity-checked.
async function auditSubresourceIntegrity() {
  const source = await readFile(join(ROOT, 'main.js'), 'utf8');
  const entries = [...source.matchAll(/src:\s*'(https:[^']+)'[^}]*?integrity:\s*'(sha\d{3}-[^']+)'/gs)];
  const cdnRefs = [...source.matchAll(/src:\s*'(https:\/\/[^']+)'/g)];
  check(
    'every CDN script is pinned with a Subresource Integrity hash',
    entries.length === cdnRefs.length && entries.length > 0,
    `${entries.length} integrity-pinned / ${cdnRefs.length} CDN scripts`
  );
  check(
    'CDN scripts are pinned to an exact version',
    entries.every(([, url]) => /\d+\.\d+\.\d+/.test(url)),
    entries.map(([, url]) => url.split('/').slice(-2).join('/')).join(', ')
  );
}

const { server, port } = await startServer();
const url = `http://127.0.0.1:${port}/`;
const browser = await chromium.launch();

try {
  await auditContext(browser, 'no motion layer', url, {});
  await auditContext(browser, 'reduced motion', url, { reducedMotion: 'reduce' });
  await auditContext(browser, 'mobile', url, {
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  await auditAccessibility(browser, url);
  await auditSubresourceIntegrity();
} finally {
  await browser.close();
  server.close();
}

const failed = results.filter(r => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
