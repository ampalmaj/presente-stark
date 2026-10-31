# Presente

Constancia de participación que la persona recibe en su celular al asistir a una clase, un curso o un evento, firmada por el emisor y anclada en Bitcoin. Cualquier tercero la verifica sin pedirle nada a quien la emitió.

Prototipo del equipo Stark · Hackathon EDU HU₿ · LABITCONF 2026 · Track Nueva Educación.

## Correr en local

```bash
npm install
npm run dev
```

Abre en <http://localhost:3000>. Sin variables de entorno usa almacenamiento en memoria y claves de emisor de desarrollo: alcanza para probar el flujo completo. Para probar con un celular en la misma red, usar la URL de red que imprime `next dev` (el QR la toma del navegador que lo muestra).

## El camino de la demo

1. `/emitir`: quien dicta crea la actividad y proyecta el QR, que rota cada 30 segundos.
2. `/p/[id]?t=…`: quien asiste escanea, pone nombre y mail, toca "Estoy acá" y recibe la constancia en `/c/[code]`.
3. `/v/[code]#payload`: quien necesita comprobar escanea el QR de la constancia. Se verifica en el navegador: hash, firma Ed25519 contra el registro de `/emisores`, anclaje en Bitcoin.
4. `/mi`: historial guardado en el celular de la persona.

## Deploy en Vercel (15 minutos)

1. **Supabase**: crear proyecto gratuito (región São Paulo). En SQL Editor pegar y ejecutar `supabase/schema.sql`. En Project Settings → API copiar la URL del proyecto y la **service_role** key.
2. **Claves de emisor**: generar dos semillas de 32 bytes:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   Armar el JSON `{"uni-demo":"<hex1>","eduhub":"<hex2>"}`.
3. **GitHub**: el repo es <https://github.com/ampalmaj/presente-stark> (la app está en la subcarpeta `presente/`).
4. **Vercel**: New Project → importar el repo → Root Directory `presente` si el repo es el de la hackatón completa. Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `EMISOR_KEYS` (el JSON del paso 2)
5. Deploy. La URL `https://<proyecto>.vercel.app` es el link de la entrega.

Sin Supabase la app en Vercel pierde los datos entre invocaciones: la demo no funciona. Es la única pieza obligatoria del deploy.

## Qué es real y qué está simulado

| Real | Simulado |
|---|---|
| QR rotativo con token HMAC por ventana de 30 s | Dos emisores precargados, sin alta institucional |
| Constancia firmada con Ed25519 por la clave del emisor | Identidad del participante: nombre y mail sin verificación |
| Verificación en el navegador, sin consultar al emisor | Constancia "de ayer" en el historial, marcada como ejemplo |
| Hash enviado a Bitcoin vía OpenTimestamps (calendarios públicos) | La confirmación en bloque tarda horas: se muestra "enviada, confirma en horas" |
| Dato de OpenARG en la landing | |

## Estructura

```
app/            páginas y rutas de API (Next.js App Router)
lib/crypto.ts   sha256, Ed25519, JSON canónico, HMAC
lib/token.ts    token rotativo del QR
lib/constancias.ts emisión y payload verificable
lib/anchor.ts   OpenTimestamps
lib/store.ts    memoria (local) o Supabase (producción)
lib/emisores.ts registro de emisores y claves
supabase/schema.sql
data/openarg.json  datos de respaldo del problema
```
