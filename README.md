# VitaNord Fisio — sitio web

Sitio estático de una sola página (`index.html`, sin dependencias ni build) listo para desplegar gratis en Vercel.

## Contenido pendiente

Todo el texto entre corchetes (`[Teléfono de contacto]`, `[Dirección de la clínica, Torrevieja]`, testimonios, horario, etc.) es un placeholder. Búscalo en `index.html` y sustitúyelo por los datos reales de la clínica antes de anunciar el sitio.

## Desplegar en Vercel (gratis)

**Opción A — con GitHub (recomendada, permite actualizar el sitio fácilmente):**

1. Crea un repositorio nuevo en GitHub y sube esta carpeta:
   ```bash
   cd vitanord-fisio-vercel
   git init
   git add .
   git commit -m "Sitio VitaNord Fisio"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/vitanord-fisio.git
   git push -u origin main
   ```
2. Entra en [vercel.com](https://vercel.com) → **Add New... → Project**.
3. Selecciona el repositorio `vitanord-fisio`. Vercel detecta que es un sitio estático automáticamente — no hace falta configurar nada (framework: "Other", build command vacío, output directory `.`).
4. Pulsa **Deploy**. En menos de un minuto tendrás una URL tipo `vitanord-fisio.vercel.app`, gratis.
5. Para futuras actualizaciones: edita `index.html`, haz `git commit` y `git push` — Vercel vuelve a desplegar solo.

**Opción B — con la CLI de Vercel (sin GitHub):**

```bash
npm install -g vercel
cd vitanord-fisio-vercel
vercel login
vercel --prod
```

Sigue las preguntas en pantalla (acepta los valores por defecto). Al terminar te da la URL pública.

## Dominio propio

Una vez desplegado, en el panel del proyecto en Vercel → **Settings → Domains** puedes añadir un dominio propio (p. ej. `vitanordfisio.com`) si lo compras en cualquier registrador. El certificado HTTPS se configura automáticamente y sigue siendo gratis (solo pagas el dominio en sí, unos 10-15€/año).
