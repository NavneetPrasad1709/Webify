const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const sites = [
    { url: 'https://saas.webify.org.in/', slug: 'vexel-ai' },
    { url: 'https://webify-dentist.vercel.app/', slug: 'dental-health' },
    { url: 'https://webify-luxory-homes.vercel.app/', slug: 'evergreen-studio' },
  ];
  const b = await puppeteer.launch({ args: ['--no-sandbox'] });
  for (const s of sites) {
    const dir = '_frames/' + s.slug;
    fs.mkdirSync(dir, { recursive: true });
    const p = await b.newPage();
    await p.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });  // 8:5, matches card, no side-crop
    await p.goto(s.url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2500));
    const FRAMES = 120;        // 120 frames -> 5s at 24fps forward; boomerang => 10s
    const MAXSCROLL = 900;     // slow, gentle pan across hero + into next section
    for (let i = 0; i < FRAMES; i++) {
      const y = Math.round((i / (FRAMES - 1)) * MAXSCROLL);
      await p.evaluate((yy) => window.scrollTo(0, yy), y);
      await new Promise(r => setTimeout(r, 40));
      await p.screenshot({ path: `${dir}/f${String(i).padStart(3,'0')}.png`, clip: { x: 0, y: 0, width: 1600, height: 1000 } });
    }
    console.log('recorded', s.slug);
    await p.close();
  }
  await b.close();
})();
