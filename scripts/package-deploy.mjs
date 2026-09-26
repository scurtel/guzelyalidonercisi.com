import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const DIST_DIR = path.resolve('dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Hata: Önce `npm run build` çalıştırılmalıdır.');
  process.exit(1);
}

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
const archiveName = `guzelyalidonercisi_${timestamp}.zip`;
const archivePath = path.resolve(archiveName);

console.log(`📦 Deploy arşivi oluşturuluyor: ${archiveName}`);

// Zip the contents of dist/
try {
  execSync(`cd "${DIST_DIR}" && zip -r "${archivePath}" . -x "*.DS_Store"`, { stdio: 'inherit' });
  console.log(`✅ Arşiv başarıyla oluşturuldu: ${archivePath}`);
  console.log(`Boyut: ${(fs.statSync(archivePath).size / 1024 / 1024).toFixed(2)} MB`);
} catch (err) {
  console.error('❌ Arşivleme sırasında hata oluştu:', err);
  process.exit(1);
}
