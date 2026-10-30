# Bloque 4 · Prototipo

**Equipo:** Stark · **Horario:** viernes 16:30 a 19:00 (2 h 30) y sábado 9:45 a 12:00 (2 h 15). Total: **4 h 45 de construcción**.

Meta: una demo que funcione en lo esencial. Listo cuando alguien de afuera puede usarla sin que le expliquen. Regla de la organización: un usuario, una tarea, de punta a punta. Lo que no llega se simula con datos fijos y se dice en el pitch.

Escrito antes de la votación del Bloque 3, sobre la idea recomendada "Presente". Si gana otra, cambia la sección 1 y el resto se adapta.

## 0. Estado al viernes 30, 16:30

**Construido y probado en local, de punta a punta**, en la carpeta `presente/`:

- Landing con los datos de OpenARG.
- `/emitir`: crear actividad (emisor, tipo, nombre) y pantalla de QR rotativo con contador de presentes en vivo.
- `/p/[id]?t=…`: registro del participante y emisión de constancia firmada (Ed25519) con anclaje real en Bitcoin vía OpenTimestamps (el envío a los calendarios tarda unos 3 segundos y quedó en estado "enviada").
- `/c/[code]`: tarjeta de la constancia con QR verificable.
- `/v/[code]`: verificador en el navegador. Probado con la constancia real (válida), leída desde el QR sin servidor (válida) y adulterada (no válida).
- `/mi`: historial local. `/emisores`: registro público de claves.
- Token vencido rechazado con mensaje claro. `next build` compila sin errores, lint limpio.

**Falta para que el link funcione desde cualquier computadora:** cuentas de Supabase, GitHub y Vercel, y las tres variables de entorno. Guía paso a paso en `presente/README.md` y esquema en `presente/supabase/schema.sql`. Sin Supabase, en Vercel se pierden los datos entre llamadas.

**Primera tarea del sábado, propuesta:** probar el flujo completo en el deploy de Vercel con dos celulares reales y anotar fallos.

## 1. El único camino que la demo tiene que mostrar

**La historia de la persona 3, resuelta.** Tres pantallas, dos celulares y una laptop:

| Paso | Quién | Pantalla | Qué pasa |
|---|---|---|---|
| 1 | Organizador (laptop, proyectada) | `/emitir` | Crea la actividad "LABITCONF 2026 · EDU HUB · Día 2" y aparece un QR grande que cambia cada 30 segundos, con un contador de presentes en vivo. |
| 2 | Cami (celular 1) | `/p/[código]` | Escanea con la cámara del celular, pone nombre y mail una sola vez, toca "Estoy acá". En 5 segundos ve su constancia: emisor, actividad, fecha y hora, código único, estado "anclada en Bitcoin". |
| 3 | Jefa de carrera (celular 2 o la laptop) | `/v/[código]` | Escanea el QR de la constancia de Cami o pega el código. Ve "Válida": firma del emisor correcta, emisor registrado, hora anclada, sin alteraciones. Sin mail, sin llamar a nadie. |

Cierre de la demo: Cami abre `/mi` y se ve la constancia de hoy junto a la de "Informática II · clase 12" de ayer. Misma pieza para el aula y para el evento.

La landing `/` muestra el dato de OpenARG (2.730.800 estudiantes universitarios, 811.448 beneficiarios Progresar que certifican regularidad cada año) y los tres botones de la demo. Es lo primero que ve el jurado cuando abre el link.

### Qué es real y qué está simulado (lo decimos en el pitch)

| Real | Simulado o fijo |
|---|---|
| Crear actividad, QR rotativo, registro de presentes en tiempo real | Registro de emisores: dos emisores precargados ("Universidad Demo" y "EDU HUB · LABITCONF"), sin alta institucional |
| Constancia firmada digitalmente por la clave del emisor | Identidad del participante: nombre y mail sin verificación, sin login institucional |
| Verificación de la firma y del emisor sin consultar al servidor del emisor | La constancia de "ayer" en el historial de Cami está precargada |
| Hash de la constancia enviado a Bitcoin vía OpenTimestamps | La confirmación en Bitcoin tarda horas: mostramos "anclaje enviado, confirmación pendiente" con la prueba descargable. Si falla la red, estado fijo y lo decimos |
| Dato de OpenARG en la landing, con fuente | Historial y alertas de regularidad (semilla G): no se construyen |

## 2. Arquitectura mínima

Lo más simple que sostiene el camino único y se despliega en una URL pública en la primera hora.

```
Celular (cámara nativa, sin app)  ──QR──▶  Web app (Next.js) en Vercel
                                              │
                                              ├── Supabase (Postgres): actividades, presentes, constancias, emisores
                                              ├── Firma Ed25519 de cada constancia con la clave del emisor (servidor)
                                              └── OpenTimestamps: hash de la constancia → calendarios → Bitcoin
```

- **Front y API:** Next.js (App Router) con rutas de API. Una sola base de código, despliegue en Vercel con un push. Claude Code lo genera rápido.
- **Base de datos:** Supabase gratis. Cuatro tablas: `emisores`, `actividades`, `presentes`, `constancias`. Realtime para el contador de presentes.
- **QR rotativo:** el QR codifica `https://<dominio>/p/<actividad>?t=<token>`; el token es un hash de (secreto de la actividad + ventana de 30 segundos). El servidor acepta la ventana actual y la anterior. Evita que alguien mande el QR por WhatsApp a quien no está. Esa es la respuesta a "¿cómo sabés que estaba ahí?".
- **Constancia:** JSON canónico `{emisor, actividad, participante_hash, fecha_hora, nonce}` firmado con Ed25519 (clave del emisor en variable de entorno del servidor). El código de la constancia es el hash SHA-256 de ese JSON.
- **Blockchain:** el hash se envía a OpenTimestamps (librería `javascript-opentimestamps`, sin cuenta, sin gas, sin billetera). Se guarda la prueba `.ots`. El verificador muestra firma válida, emisor registrado y estado del anclaje. **Plan B** si alguien del equipo maneja Ethereum: atestación en Ethereum Attestation Service sobre Base Sepolia, confirmación en segundos, link a easscan. Decidir hoy a las 16:45 y no volver atrás.
- **Verificación:** la página `/v/[código]` verifica la firma con la clave pública del emisor publicada en `/emisores`. Funciona aunque Supabase esté caído, porque la constancia viaja completa en el QR o el link.
- **Sin biometría, sin geolocalización, sin billetera para el estudiante.** Es lo que nos dijeron las entrevistas.

## 3. Roles (4 a 5 personas)

| Rol | Hace | Entrega |
|---|---|---|
| **Construye** (1 persona + Claude Code) | Esqueleto Next.js, Supabase, las 4 pantallas, API | Deploy en Vercel funcionando |
| **Diseña** (1) | Nombre final, logo simple, tarjeta de la constancia, pantalla del QR proyectada, landing con el dato OpenARG | Figma o HTML/CSS directo sobre el proyecto |
| **Datos y cadena** (1) | OpenTimestamps o EAS, registro de emisores, textos de verificación; también el JSON de OpenARG en la landing | Función de anclaje y verificación probada |
| **Pitch y validación** (1) | Guion de 60 s, video de respaldo de 20 s, entrevista al docente pendiente, coordinar las 3 pruebas del Bloque 5 | Guion ensayado, video subido |
| **QA y entrega** (1, o lo comparte quien diseña) | Probar con celulares reales (iPhone y Android), wifi del predio, lista de fallos, formulario de entrega a las 14:00 | Link que abre en cualquier computadora |

Si son 4, "QA y entrega" lo absorbe "Diseña".

## 4. Cronograma

### Viernes 16:30 a 19:00

| Hora | Qué | Quién |
|---|---|---|
| 16:30 | Cerrar votación del Bloque 3, confirmar camino único, nombre provisorio | Todos, 10 min |
| 16:45 | Decidir OpenTimestamps o EAS. Crear cuentas: GitHub (repo privado), Vercel, Supabase. Esqueleto Next.js desplegado con una landing vacía | Construye |
| 17:00 | Esquema de base de datos, tabla de emisores precargada, página `/emitir` con QR rotativo | Construye + Datos |
| 17:00 | Tarjeta de constancia y pantalla de QR en diseño; nombre y logo | Diseña |
| 17:00 | Primer borrador del guion de pitch; salir a buscar al docente para la entrevista | Pitch |
| 18:00 | Página `/p/[código]`: registro de presente y emisión de constancia firmada | Construye |
| 18:00 | Función de anclaje probada aparte, con un hash de prueba | Datos |
| 18:45 | Prueba con dos celulares del equipo sobre el deploy real. Anotar fallos | Todos |
| 19:00 | **Decidir la primera tarea del sábado y quién la hace.** Anotarla abajo. Retirarse a las 19:30 | Todos |

### Sábado 9:45 a 12:00

| Hora | Qué |
|---|---|
| 9:45 | Primera tarea del sábado (ver abajo). Página `/v/[código]` de verificación y `/mi` historial con la constancia precargada |
| 10:30 | Integrar anclaje a la emisión. Landing con dato OpenARG y botones de demo |
| 11:00 | Pulido visual, textos, estados de error ("QR vencido, pedile al organizador que lo muestre de nuevo") |
| 11:30 | Grabar el video de respaldo de 20 s sobre el deploy real. Congelar: no se agregan funciones después de las 11:45 |
| 12:00 | Bloque 5: validación con 3 personas ajenas |

**Primera tarea del sábado:** _______________________ · **La hace:** ______________

## 5. Lo que necesitamos

### Cuentas y accesos (crearlas hoy a las 16:45, con el mail de un integrante)

- [ ] GitHub: repo privado `presente`. No hace falta entregarlo, pero Vercel despliega desde ahí.
- [ ] Vercel: login con GitHub, proyecto conectado al repo. El dominio `presente-stark.vercel.app` o similar es suficiente.
- [ ] Supabase: proyecto gratuito, región São Paulo. Guardar URL y clave anónima en variables de entorno de Vercel.
- [ ] Clave de OpenARG: ya está (config de usuario de Claude Code).
- [ ] Nada que pagar. Todo en niveles gratuitos.

### Dispositivos

- [ ] Dos celulares con cámara, uno iPhone y uno Android si se puede, con datos móviles por si el wifi EduHUB falla.
- [ ] Una laptop para proyectar el QR en el pitch (o mostrarlo en pantalla grande).
- [ ] Cargadores.

### Decisiones que hay que tomar hoy y no volver a abrir

- [ ] Idea ganadora y nombre del producto (hoy: "Presente", provisorio).
- [ ] Anclaje: OpenTimestamps sobre Bitcoin o EAS sobre Base Sepolia.
- [ ] Identidad del participante: nombre y mail, sin login. Confirmar.
- [ ] Los dos emisores precargados y sus nombres.
- [ ] Quién hace cada rol.

### Contenido

- [ ] Frase de la entrega (una línea que describe el proyecto, la pide el formulario de mañana).
- [ ] Texto de la landing con el dato OpenARG y la fuente (ya en `data/openarg-respaldo.json`).
- [ ] Guion del pitch (Bloque 6, pero se empieza hoy).

## 6. Riesgos y qué hacemos

| Riesgo | Mitigación |
|---|---|
| Wifi del predio lento o caído durante el pitch | Celulares con datos; video de respaldo de 20 s grabado a las 11:30 |
| La cámara del iPhone no abre links sin https | Vercel da https por defecto. No usar IP local nunca |
| OpenTimestamps no responde | Estado "anclaje pendiente" fijo, declarado en el pitch. La firma del emisor sigue siendo verificable |
| El QR rotativo confunde en la demo | Ventana de 30 s con tolerancia de la anterior; mensaje claro si vence |
| Nos ponemos a construir funciones fuera del camino único | Lista de "la semana que viene" en el Bloque 3. Congelar a las 11:45 |
| Supabase o Vercel piden verificación de mail y se demoran | Crear cuentas a las 16:45, antes de necesitarlas |

## 7. Checklist del bloque

- [x] Camino único elegido y escrito arriba
- [ ] Roles repartidos
- [ ] Deploy público funcionando antes de irse el viernes, aunque sea con una pantalla
- [ ] Primera tarea del sábado decidida y asignada
- [ ] Alguien de afuera puede usar la demo sin explicación (se prueba en el Bloque 5)
