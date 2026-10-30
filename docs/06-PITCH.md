# Bloque 6 · Pitch

**Equipo:** Stark · **Producto:** Presente · **Track:** Nueva Educación · 60 segundos de pitch + 60 de preguntas. El jurado corta en 60.

## Guion (unas 150 palabras, hablado a ritmo normal entra en 55 segundos)

**0–10 s · El problema** *(mirando al jurado, sin pantalla)*

> Una estudiante del interior vino esta semana a LABITCONF. Faltó a dos materias. Para justificarlo mandó un mail, el profesor consultó a la jefa de carrera, y zafó de quedar libre, en sus palabras, "por la buena onda del profe". Vino a aprender y no tenía cómo probarlo.

**10–20 s · La solución**

> Presente es una constancia de participación que te queda en el celular cuando asistís a una clase, un curso o un evento, firmada por quien lo dicta, y que cualquiera verifica sin pedirle nada a nadie.

**20–45 s · La demo** *(en vivo, dos celulares y la pantalla)*

> [Pantalla] El organizador abre la actividad: un QR que cambia cada 30 segundos.
> [Celular 1] Ella escanea, pone su nombre, "Estoy acá". Cinco segundos: constancia firmada, anclada en Bitcoin.
> [Celular 2] La jefa de carrera escanea la constancia: válida, emitida por el EDU HUB, hoy a las 15:10. Sin mail. Sin llamar a nadie.

**45–55 s · Por qué funciona**

> Hablamos con tres personas: a las tres les pasó esta semana. Hay 2,7 millones de estudiantes universitarios y Progresar paga a 811 mil personas que dependen de que una institución certifique que siguen yendo, según OpenARG. Y la constancia es de la persona, no de la institución: en Bitcoin solo va la huella, así que se verifica dentro de cinco años aunque nosotros no existamos.

**55–60 s · El cierre**

> La semana que viene: el EDU HUB emite las constancias de esta hackatón con Presente, y vamos con eso a la primera facultad.

## Quién dice qué

| Bloque | Quién habla | Quién maneja |
|---|---|---|
| Problema y solución | Persona A | Nadie: sin pantalla, mirar al jurado |
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
