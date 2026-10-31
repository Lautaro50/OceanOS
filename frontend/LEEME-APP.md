# Cómo armar el APK de OceanOS

El APK es una **foto** de la web en el momento de armarlo: si cambia la web, hay que armar uno nuevo.

```
cd frontend
npm install
npm run app:sync        # compila la web y la copia al proyecto de Android
```
Después, en Android Studio: abrí la carpeta `frontend/android` y **Build → Build APK(s)**
(prueba) o **Build → Generate Signed Bundle / APK** (con tu clave).

- Si cambiás el código de la web, repetí `npm run app:sync` antes de compilar.
- Subí `versionCode` en `android/app/build.gradle` en cada versión nueva.
- Para que el botón de descarga del sitio entregue la versión nueva, reemplazá `public/oceanos.apk` y hacé push.
- **La clave de firma (`.jks`) no se sube nunca al repo.** Guardala en un lugar privado: si la perdés, nadie podrá actualizar la app instalada.
- Antes de instalar una versión firmada con otra clave, hay que desinstalar la anterior.
