import { chromium } from '@playwright/test';
import path from 'path';

const slugs = [
  'macys-ai-coworker',
  'equiledger',
  'bayesian-mmm-capstone',
  'neural-vault',
  'ab-testing',
  'card-krueger',
  'poisson-mle',
  'maxdiff',
  'key-drivers',
  'roi-dashboard-churn'
];

const outDir = '/Users/aj/.gemini/antigravity/brain/abc16b7d-93fa-41bf-851e-6cdb4e062300';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Capturing main projects page...');
  await page.goto('http://localhost:3000/projects', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Allow animations to settle
  await page.screenshot({ path: path.join(outDir, 'audit_main_projects.png'), fullPage: true });

  for (const slug of slugs) {
    console.log(`Capturing ${slug}...`);
    await page.goto(`http://localhost:3000/projects/${slug}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500); // Allow view transitions and iframes to settle
    await page.screenshot({ path: path.join(outDir, `audit_${slug}.png`), fullPage: true });
  }

  await browser.close();
  console.log('Done.');
})();
