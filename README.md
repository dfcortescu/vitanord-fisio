# VitaNord Fisio — sitio web

Sitio estático (sin dependencias ni build) listo para desplegar gratis en Vercel, disponible en 4 idiomas:

- `/` → Inglés (idioma por defecto)
- `/es/` → Español
- `/sv/` → Sueco
- `/no/` → Noruego

Cada idioma es una página independiente (mejor para SEO) que comparte los mismos estilos y script en `assets/style.css` y `assets/script.js`. El selector de idioma (EN · ES · SV · NO) está en la cabecera de cada página.

## Contenido pendiente

Todo el texto entre corchetes (`[Teléfono de contacto]`, testimonios, horario, etc.) es un placeholder. Aparece en las 4 páginas (`index.html`, `es/index.html`, `sv/index.html`, `no/index.html`) — hay que sustituirlo por los datos reales de la clínica, en cada idioma, antes de anunciar el sitio. La dirección real ya está puesta en los 4 idiomas.

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
5. Para futuras actualizaciones: edita el/los archivo(s) que corresponda, haz `git commit` y `git push` — Vercel vuelve a desplegar solo.

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
