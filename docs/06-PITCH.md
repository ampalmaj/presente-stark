# Bloque 6 · Pitch

**Equipo:** Stark · **Producto:** Presente · **Track:** Nueva Educación · 60 segundos de pitch + 60 de preguntas. El jurado corta en 60.

## Guion (unas 160 palabras, entra en 58 segundos a ritmo normal)

**0–12 s · El problema** *(sin pantalla, una sola persona habla, mirando al jurado, pausa después de "libre")*

> Esta semana una estudiante viajó desde el interior para estar acá, en LABITCONF. Faltó a dos materias. Para que no la dejaran libre mandó un mail y esperó. Zafó, nos dijo, "por la buena onda del profe". Vino a aprender, y su única prueba era la buena onda de alguien.
>
> Como ella, 811 mil personas cobran Progresar, y su beca depende de que alguien, en alguna oficina, cargue a mano tres veces al año que siguen yendo.

**12–20 s · La solución**

> Presente es la constancia de que estuviste. Nace en el aula, la firma la institución, queda en tu celular, y cualquiera la verifica sin pedirle nada a nadie.

**20–43 s · La demo** *(en vivo, pantalla y dos celulares, el que narra no toca nada)*

> [Pantalla] El profesor abre la clase: un código que cambia cada diez segundos.
> [Celular 1] Ella escanea, "Estoy acá", apunta la cámara a la pantalla para demostrar que está ahí, no en una foto. Cinco segundos: constancia firmada, anclada en Bitcoin.
> [Celular 2] La secretaría académica, o ANSES, escanea su constancia: válida, emitida por la universidad, hoy, 15:10. Sin mail. Sin esperar. Sin buena onda.

**43–55 s · Por qué funciona y quién paga**

> Hablamos con cuatro personas, incluido un profesor que marca a 50 alumnos uno por uno. Argentina tiene 2,7 millones de estudiantes universitarios y ningún dato público de asistencia: OpenARG tiene 33 mil datasets y ninguno dice quién está.
> Nuestro cliente es el Estado: ANSES y Capital Humano pagan 811 mil becas condicionadas a asistir sin poder medir la asistencia. Compran eso: pagar solo a quien cumple, saberlo el mismo mes, sin intermediarios. Y mientras el Estado decide, cobramos por constancia a quienes ya pagan por certificar.

**55–60 s · El cierre**

> Argentina sabe cuántos estudiantes entran y cuántos egresan. Con Presente, por primera vez, sabe cuántos están. Sin exponer a ninguno.

### Las tres emociones del guion, en orden

1. **Injusticia concreta** (0–12 s): una persona, una decisión que dependió de otro. No "el sistema", sino "la buena onda del profe". El jurado tiene que sentir la arbitrariedad antes de ver un solo botón.
2. **Alivio visible** (20–43 s): la demo es la misma escena resuelta. Por eso el verificador es "la secretaría o ANSES", no "un tercero": el jurado tiene que ver a la misma estudiante del principio dejando de esperar.
3. **Escala con dueño** (43–60 s): 811 mil personas, un cliente con nombre que ya gasta esa plata, y un cierre que es una frase, no una promesa.

### Lo que no decir

- Ni "blockchain" ni "Bitcoin" antes del segundo 35. La tecnología aparece una vez, dentro de la demo, como un hecho.
- Ni "disruptivo", ni "revolucionar", ni "ecosistema". Los datos y la persona hacen el trabajo.
- No nombrar al equipo ni la stack. Si preguntan, se contesta.

## Quién dice qué

| Bloque | Quién habla | Quién maneja |
|---|---|---|
| Problema y solución | Persona A | Nadie: pantalla en negro o con el logo, mirar al jurado |
| Demo | Persona A narra | Persona B en la laptop (QR), Persona C celular 1, Persona D celular 2 |
| Por qué funciona y cierre | Persona A (o B) | B deja en pantalla la verificación "Constancia válida" |

Ensayar tres veces con el timer de la app. Si la demo en vivo puede fallar por wifi, tener el **video de 20 segundos** listo en la laptop y pasarlo sin pedir disculpas.

## Las 8 preguntas del jurado, con respuesta de 15 segundos

**1. ¿Qué dato de OpenARG respalda el problema?**
> Dos. 2.730.800 estudiantes universitarios en 2023, el 78% en públicas, y la tasa de egreso cayó de 6,7% a 5,8% mientras la matrícula creció 36%: el sistema tiene cada vez más gente de la que sabe poco hasta que deja de ir. Y Progresar paga a 811.448 personas en todas sus líneas; a las de nivel superior, la institución les certifica regularidad tres veces al año. Fuente: datos.gob.ar vía OpenARG.

**2. ¿Con cuántas personas hablaron y qué les dijeron?**
> Cuatro, incluido un docente universitario que toma lista a 50 estudiantes uno por uno en el sistema de su universidad, y que si la toma al principio ya no puede volver a tomarla. Tres personas que asisten, hoy, acá. Una estudiante: "lo peor es que el profe no me nombre". Un trabajador con reconocimiento facial que falla: "marqué tarde cuando llegué a hora". Y la estudiante del interior que casi queda libre por venir. Lo que nos sorprendió: estar en un evento educativo no le sirve a nadie como prueba.

**3. ¿Por qué blockchain y no una base de datos común?**
> Porque la base de datos la tendría la institución, y ese es el problema de hoy: la prueba es de ellos, no tuya. La constancia va firmada por el emisor y su huella se ancla en Bitcoin con OpenTimestamps: sin token, sin gas, sin billetera. Se verifica aunque la institución o nosotros desaparezcamos. Datos personales en la cadena: ninguno.

**4. ¿Qué parte de la demo funciona de verdad y qué está simulado?**
> Funciona: el QR rotativo, la firma, la verificación en el navegador y el envío a Bitcoin. Simulado: los dos emisores están precargados, la identidad es nombre y mail sin verificar, y la confirmación en bloque tarda horas, por eso dice "enviada". Lo construimos en 24 horas con Claude Code y el MCP de OpenARG.

**5. ¿Qué existe hoy y por qué esto es mejor?**
> Sistemas de asistencia de cada universidad donde el docente marca uno por uno, una sola vez por clase, y el dato queda encerrado ahí. PDFs de extensión que nadie puede validar. Y POAP. POAP emitió 7,6 millones de badges y cerró en agosto porque nunca encontró quién pagara; los badges quedaron huérfanos y se pueden vender. Lo nuestro es nominal, no transferible, firmado por la institución y gratis para la persona.

**6. ¿Cómo se sostiene en el tiempo? ¿Quién paga?**
> Pagan los que ya hoy certifican y pagan por hacerlo: quien vende formación, como Humai, por constancia emitida, porque el certificado es parte de su producto; y universidades privadas que pierden cuotas por abandono, por estudiante. Para la persona y para quien verifica es gratis siempre. Primer emisor: el EDU HUB. Primer cliente: una academia.

**7. ¿Cuál es el mayor riesgo?**
> El mismo que mató a POAP: el modelo de negocio. Por eso no empezamos por la universidad pública, que tarda años, sino por quienes ya pagan por certificar y por docentes que entran gratis. La institución llega cuando los estudiantes ya tienen constancias en el celular y las piden.

**8. ¿Qué harían la semana que viene si ganan?**
> Emitir con Presente las constancias de esta hackatón para los equipos, con el EDU HUB como primer emisor real. Llevar eso a una facultad privada como piloto. Y golpear la puerta de Progresar: 811 mil personas cuya beca depende de que alguien cargue a mano, tres veces al año, que siguen yendo. Con esto la certificación nace en el aula, firmada, y el Estado la verifica sin intermediarios.

## Lenguaje para el tema Progresar

Decir **"sin intermediarios"** o **"sin discrecionalidad"**, no "sin punteros". En el jurado hay un funcionario (Augusto Ardiles, GCBA) y la idea es que el Estado se vea como aliado, no como acusado. El punto técnico es el mismo: la certificación deja de depender de quién la carga.

## Preguntas que pueden venir de costado

- **"¿Y el fraude? ¿Si alguien escanea desde su casa?"** El QR cambia cada 30 segundos con un código que solo sirve en esa ventana. Si te lo mandan por WhatsApp, ya venció. Y si alguien está presente y marca a otro, es el mismo fraude que firmar la hoja por un compañero: lo resolvemos después con identidad institucional, no es el problema de hoy.
- **"¿Por qué Bitcoin y no Ethereum?"** Porque no necesitamos un contrato ni un token, solo un sello de tiempo que nadie pueda cambiar. OpenTimestamps es gratis y lleva diez años. Si una universidad prefiere otra red, la firma del emisor no cambia.
- **"¿Qué pasa con los datos personales?"** En la cadena hay solo un hash. Nombre y mail quedan con la persona y el emisor. La persona decide a quién le muestra la constancia. Un historial público de asistencia sería ilegal y no lo queremos.
- **"¿Cómo se integra con SIU Guaraní?"** Hoy no. Es el paso siguiente: que la asistencia alimente la regularidad. Primero tiene que existir el dato, y hoy no existe.

## Frase de la entrega (campo "frase" del formulario del sábado)

> Presente: la constancia de que estuviste, en tu celular, firmada por quien dicta y verificable por cualquiera sin pedirle nada a nadie.

## Checklist del bloque

- [ ] Guion ensayado 3 veces con el timer, entra en 60 s
- [ ] Roles asignados (quién habla, quién maneja laptop y celulares)
- [ ] Video de respaldo de 20 s grabado sobre el deploy real
- [ ] Link de la demo entregado a las 14:00 en el espacio EDU HUB
