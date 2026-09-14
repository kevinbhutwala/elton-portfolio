import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LOCAL_URL = 'http://localhost:3000';

const videos = [
  { file: 'wayanad-cinematics.mov', thumb: 'wayanad-cinematics.jpg', isVertical: false, time: 2.5 },
  { file: 'dj-doel-blr.mp4', thumb: 'dj-doel-blr.jpg', isVertical: true, time: 1.5 },
  { file: 'flake-house.mov', thumb: 'flake-house.jpg', isVertical: true, time: 1.2 },
  { file: 'goa-auto-expo.mp4', thumb: 'goa-auto-expo.jpg', isVertical: true, time: 1.5 },
  { file: 'goa-cinematics.mp4', thumb: 'goa-cinematics.jpg', isVertical: true, time: 2.0 },
  { file: 'hair-salon-work.mov', thumb: 'hair-salon-work.jpg', isVertical: true, time: 1.5 },
  { file: 'supercars-dubai.mp4', thumb: 'supercars-dubai.jpg', isVertical: true, time: 1.8 },
  { file: 'turtle-matcha-cafe.mov', thumb: 'turtle-matcha-cafe.jpg', isVertical: true, time: 1.5 },
];

async function generate() {
  console.log('🚀 Extracting Ultra-Crisp HD Thumbnails from Authentic Video Masters...\n');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();

  for (const v of videos) {
    const videoUrl = `${LOCAL_URL}/videos/${v.file}`;
    console.log(`🎬 Processing ${v.file} (target: ${v.thumb})...`);

    const dataUrl = await page.evaluate(async (url, isVert, seekTime) => {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.src = url;
        video.muted = true;
        video.playsInline = true;

        video.onloadedmetadata = () => {
          video.currentTime = Math.min(seekTime, video.duration > 1 ? seekTime : video.duration * 0.5);
        };

        video.onseeked = () => {
          try {
            const canvas = document.createElement('canvas');
            // High DPI supersampling: 1920x1080 or 1080x1920
            const targetW = isVert ? 1080 : 1920;
            const targetH = isVert ? 1920 : 1080;
            canvas.width = targetW;
            canvas.height = targetH;

            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Calculate cover crop dimensions
            const vW = video.videoWidth;
            const vH = video.videoHeight;
            const scale = Math.max(targetW / vW, targetH / vH);
            const drawW = vW * scale;
            const drawH = vH * scale;
            const offsetX = (targetW - drawW) / 2;
            const offsetY = (targetH - drawH) / 2;

            ctx.drawImage(video, offsetX, offsetY, drawW, drawH);

            // Export high quality JPEG (quality 0.96)
            resolve(canvas.toDataURL('image/jpeg', 0.96));
          } catch (e) {
            reject(e.toString());
          }
        };

        video.onerror = (e) => reject(`Video load error: ${url}`);
      });
    }, videoUrl, v.isVertical, v.time);

    if (dataUrl) {
      const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
      const outPath = path.join(process.cwd(), 'public/thumbnails', v.thumb);
      fs.writeFileSync(outPath, base64Data, 'base64');
      const stat = fs.statSync(outPath);
      console.log(`  ✨ Saved ${v.thumb} (${(stat.size / 1024).toFixed(1)} KB) at High Definition (1080p master)`);
    }
  }

  await browser.close();
  console.log('\n✅ All thumbnails successfully upgraded to 1080p HD master quality!\n');
}

generate().catch(console.error);
