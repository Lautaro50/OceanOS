// Va entre "vite build" y "cap sync": saca de dist lo que no tiene sentido dentro del APK
// (el propio APK, que se copia desde public/, y los archivos que solo sirven para el hosting).
import { rmSync } from 'node:fs';

for (const f of ['oceanos.apk', '.htaccess', '_redirects', 'og.jpg', 'apple-touch-icon.png']) {
  rmSync(new URL(`../dist/${f}`, import.meta.url), { force: true });
}
console.log('dist listo para el APK');
