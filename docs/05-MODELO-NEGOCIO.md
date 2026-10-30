# Modelo de negocio y análisis de beneficio

**Equipo:** Stark · Viernes 30, tarde. Escrito a partir de la objeción de los mentores: "no vemos si la universidad pagaría por esto ni cómo se analiza el beneficio".

## 1. Qué dice exactamente la evaluación

Texto literal de la app de la hackatón:

> **Modelo de negocio · 20%.** Qué tan clara y sostenible es la forma en que la solución genera valor: cómo se monetiza, quién paga y cómo puede crecer en el tiempo.

Y entre las preguntas que "suele hacer el jurado":

> ¿Cómo se sostiene en el tiempo? ¿Quién paga?
> ¿Qué existe hoy y por qué esto es mejor?
> ¿Cuál es el mayor riesgo del proyecto?

Tres lecturas:

1. Piden **claridad**, no tamaño. Vale más "pagan los organizadores de cursos, por constancia emitida, y empezamos por el EDU HUB" que "el mercado de edtech en Latinoamérica vale miles de millones".
2. Piden **tres respuestas distintas**: cómo se monetiza (el mecanismo), quién paga (el cliente) y cómo crece (el camino). Hoy tenemos una respuesta vaga para las tres.
3. La organización vinculó este pilar con la charla de kick-off de **Fede Gir (Picante): qué busca un VC**. El primer premio incluye una semana de aceleración con Picante. El jurado va a mirar esto con ojos de inversor: problema real, cliente identificable, por qué ahora, por qué ustedes.

Quién evalúa: Augusto Ardiles (Subsecretario de Inversiones de CABA, fintech), Tomás Moreno (Product Manager y **profesor en UTDT**), Leonardo Suárez (Head of Design en Paisanos) y Federico Kohen (Tent Creator Summit, marketing). Dos de cuatro vienen de producto y negocio. Uno es docente universitario: es nuestro "Martín" sentado en el jurado.

Los otros cuatro pilares pesan igual (20% cada uno): impacto del problema, pitch, calidad del prototipo y uso de IA, innovación. El modelo de negocio es un quinto de la nota, no la nota. Pero "¿quién paga?" es la pregunta que más se repite en la lista del jurado.

## 2. Por qué los mentores tienen razón

Lo que teníamos escrito: "paga la institución que emite: universidad, facultad, organizador". El problema de esa respuesta:

- **El 78% de los estudiantes está en universidades públicas** (2.130.160 de 2.730.800, OpenARG 2023). Las públicas no compran software por suscripción con una tarjeta: hay licitaciones, consejos, convenios, y el sistema académico lo provee el consorcio SIU. Ciclo de venta de años. Si el modelo depende de que la UBA pague, no es sostenible en el horizonte de una startup.
- **"La universidad" no es una persona.** Nadie en una universidad tiene hoy un presupuesto llamado "asistencia". El dolor está repartido: el docente pierde tiempo, la secretaría emite constancias, extensión imprime certificados, el estudiante espera. Hay que elegir quién de ellos tiene plata y motivo.
- **No habíamos mostrado el beneficio en números.** Dijimos "menos trámites" sin decir cuántos ni cuánto cuestan.

## 3. Quién paga, en orden de certeza

Regla que no cambia: **la persona y quien verifica no pagan nunca.** Eso es lo que hace crecer la red: cada constancia que alguien muestra es una invitación a usar Presente.

| Orden | Quién paga | Por qué pagaría | Cómo se cobra | Ciclo de venta |
|---|---|---|---|---|
| 1 | **Organizadores de formación que ya certifican**: eventos educativos (el propio EDU HUB y LABITCONF), bootcamps y academias (Humai), institutos, programas de capacitación estatal (el plan de Entre Ríos tiene 88 cursos con UNER y UADER), colegios profesionales con actualización obligatoria | Hoy pagan herramientas de certificados o pagan horas de staff para hacer PDFs uno por uno, y después responden mails de "¿es real este certificado?". Un certificado verificable es además un diferencial para vender el curso. | Por constancia emitida, o plan mensual por organizador con un piso gratuito. | Semanas. Decide una persona. |
| 2 | **Universidades privadas** (600.640 estudiantes en 2023, OpenARG) | Compiten por retención y experiencia. Cada estudiante que abandona es una cuota que deja de entrar. La asistencia es el primer dato que anticipa el abandono, y hoy no lo tienen. Además, secretaría académica deja de emitir constancias a mano. | Por estudiante por año, vendido a Secretaría Académica o a Extensión. | Meses. Piloto por facultad. |
| 3 | **Universidades públicas** | Entran gratis por abajo: un docente abre una actividad sin pedir permiso a nadie, como pasó con Google Classroom. Lo institucional llega por convenio y por integración con SIU Guaraní. Extensión universitaria tiene presupuesto propio y cobra sus cursos: ahí sí hay plata. | Gratis para docentes. Extensión paga por constancia. Convenio institucional después. | Años para lo institucional. No depende de esto. |
| 4 | **Estado**: ANSES y Capital Humano (Progresar: 811.448 beneficiarios en las cuatro líneas, cada una con certificación periódica de asistencia o regularidad que carga la institución), becas provinciales, SUBE estudiantil | Hoy la certificación la carga alguien a mano, tres veces al año, y el Estado confía en quien la carga. Costo de auditoría, demora en los pagos, fraude y discrecionalidad. Con constancias firmadas por la institución y verificables, la certificación se genera sola y se audita sin intermediarios. Sirve para las cuatro líneas: escuela, universidad y formación profesional. | Por verificación, o licencia. | Largo. Es "la semana que viene", no el primer cliente. Pero es el mayor impacto. |

**Primer emisor y primer cliente no son el mismo.**

- **Primer emisor: el EDU HUB.** No paga, y no hace falta que pague. Su interés es que la participación de los estudiantes valga en sus universidades, tener métricas para sponsors y hacer más atractivo traer universidades el año que viene. Lo obtiene emitiendo gratis, y a cambio nos da caso real, credibilidad y acceso a las universidades acreditadas. La persona 3 de las entrevistas es la prueba de que lo necesita.
- **Primer cliente que paga: quien vende formación y entrega certificados como parte del producto.** Humai es el ejemplo en el edificio: dicta cursos, el certificado es parte de lo que vende, uno verificable lo diferencia y protege su marca de certificados truchos. Paga por constancia emitida, como hoy paga horas de staff o una plataforma. Segundo: el organizador de un evento pago como LABITCONF, para quien el certificado es una prestación del ticket (reembolso de la empresa, crédito en la universidad) que cuesta menos que la credencial impresa con cordón y elimina los mails de "¿me mandás el certificado?".

Si mañana Humai o LABITCONF dicen "pagaríamos por constancia", eso es tracción y se dice en el pitch. Si el EDU HUB dice "emitimos con esto", también, pero como emisor.

## 4. Cómo se analiza el beneficio

El método: para cada cliente, una fórmula con pocas variables, cada variable medible, y una fuente para cada número. Lo que no tenemos medido se declara como supuesto y se valida mañana con una entrevista.

### 4.1 Docente y cátedra: tiempo de clase

```
horas_ahorradas_año = minutos_lista_por_clase × clases_por_año × comisiones / 60
```

- `minutos_lista_por_clase`: medirlo. Persona 1 dijo que el presente es a voz. En una comisión de 60 a 120 son 5 a 10 minutos. Con Presente, 60 personas escanean en paralelo en menos de 1 minuto (lo medimos en la demo: 5 segundos por persona).
- `clases_por_año`: 2 por semana × 30 semanas = 60 (supuesto estándar).
- `comisiones`: preguntarle a un docente o a secretaría cuántas tiene la facultad.

Ejemplo con supuestos declarados: 7 minutos × 60 clases × 200 comisiones / 60 = **1.400 horas docentes por año en una facultad**. Equivale a la carga anual de varios cargos de dedicación simple. Y el dato que sale, hoy, no sirve para nada después.

### 4.2 Secretaría y extensión: constancias y certificados

```
costo_anual = (constancias_año × minutos_gestión / 60 × costo_hora_admin) + (certificados_año × costo_unitario_actual)
```

- `constancias_año`: cuántas constancias de alumno regular y de asistencia emite la facultad por año. **Pregunta clave para mañana.** Pista de escala: los beneficiarios de Progresar Superior necesitan tres certificaciones por año (el total de Progresar es 811.448, sin desglose por línea), además de las de obra social, SUBE y trabajo.
- `minutos_gestión`: pedido, búsqueda, firma, sello, entrega. Medir con una persona de secretaría.
- `certificados_año` y `costo_unitario_actual`: en extensión, cuánto cuesta hoy hacer y firmar cada PDF, o cuánto pagan a una plataforma de certificados.

Con Presente ambos tienden a cero: la constancia se emite sola al asistir y se verifica sin intervención.

### 4.3 Universidad privada: retención

```
ingreso_retenido_año = estudiantes × puntos_de_abandono_evitados × cuota_anual
```

- Dato de contexto (OpenARG): la matrícula creció 36% desde 2014 y los egresos casi nada; egresa el 5,8% por año. El sistema retiene mal.
- `puntos_de_abandono_evitados`: supuesto conservador de 1 punto porcentual gracias a alertas tempranas por asistencia. Con 10.000 estudiantes y 1 punto, son 100 estudiantes por año que siguen pagando cuota. El cliente pone su cuota y le da su número.
- Esto es lo que compra un rector privado. El ahorro administrativo es el argumento de secretaría; la retención es el de rectorado.

### 4.4 Estado: verificación y fraude

```
ahorro = verificaciones_año × costo_verificación_manual + fraude_evitado
```

Sin datos públicos para los costos unitarios; se plantea como oportunidad y se declara que no está cuantificado. OpenARG no tiene un dataset de constancias emitidas ni de fraude en becas. Decirlo con honestidad suma.

### 4.5 Lo que medimos en el prototipo (evidencia para el pitch)

| Métrica | Cómo | Objetivo para mañana |
|---|---|---|
| Segundos por presente | Cronómetro en la demo, desde escaneo hasta constancia | Menos de 10 s |
| Tiempo de lista a voz vs QR | Pedirle a un docente que estime, o simular con 10 personas | QR gana por 5× |
| Verificación por un tercero | Una persona ajena escanea la constancia y dice si es válida sin ayuda | 3 de 3 |
| Intención de uso | "¿Lo usarían en su próximo curso?" a EDU HUB y Humai | 1 sí |

## 5. Cómo crece

1. **Cada verificación es adquisición.** El tercero que verifica ve Presente por primera vez sin que le vendamos nada.
2. **Del evento al aula.** El estudiante que recibió una constancia en LABITCONF le pide al docente que use lo mismo en la cátedra. El docente entra gratis.
3. **Integraciones que destraban lo institucional**: SIU Guaraní y Moodle para que la asistencia alimente la regularidad; API de verificación para RR.HH. y organismos.
4. **Pasaporte de aprendizaje**: cuando una persona acumula constancias de varias instituciones, el valor está en la persona, y ninguna institución puede sacárselo. Ahí el modelo deja de depender de un cliente.

## 6. Mayor riesgo, dicho por nosotros antes de que lo pregunten

**Adopción institucional lenta.** Mitigación: no empezamos por la institución. Empezamos por quienes ya pagan por certificar y por docentes que entran solos. Lo institucional llega cuando los estudiantes ya tienen constancias en el celular y las piden.

## 7. Respuestas listas para el pitch

**Quién paga (10 segundos):**
> Pagan los que ya hoy certifican y pagan por hacerlo: quien vende formación, por constancia emitida, y universidades privadas que pierden cuotas por abandono. Para la persona y para quien verifica es gratis siempre. Primer emisor: el EDU HUB. Primer cliente: una academia como Humai.

**Cómo se mide el beneficio (10 segundos):**
> Tres números: minutos de clase que vuelven a ser clase, constancias que secretaría deja de emitir a mano, y estudiantes que una privada retiene porque vio la ausencia a tiempo. Los dos primeros los medimos mañana con un docente; el tercero lo pone cada universidad con su cuota.

**Por qué ahora:**
> Porque Progresar tiene 811 mil beneficiarios y a los de nivel superior la institución les certifica regularidad tres veces al año, a mano, y porque las constancias en PDF ya no le alcanzan a nadie para confiar.

## 8. Qué cambia en el prototipo (propuesta)

Una pantalla más, `/impacto`: una **calculadora de beneficio** donde el jurado o un rector pone sus números (comisiones, clases, constancias por año, estudiantes, cuota) y ve el ahorro anual, con los datos de OpenARG como valores por defecto. Convierte el pilar "modelo de negocio" en algo que se toca en la demo, y usa datos reales. Se construye en una hora el sábado a la mañana si el equipo lo aprueba.

## 9. Pendientes con mentores

- **Catalina de Paz** (economista, negocio): validar la fórmula de retención y el pricing por constancia.
- **Fede Gir** (Picante, VC): contarle el orden de clientes de la sección 3 y preguntarle qué le falta para creerlo.
- **EDU HUB (Ro Minvielle)**: ¿emitirían con Presente las constancias de esta hackatón? (emisor, gratis).
- **Humai (Charly Pérez Molero)**: ¿pagarían por constancia emitida en sus cursos? ¿Cuánto les cuesta hoy certificar? (cliente). Es la respuesta que falta.

## 10. "¿Esto no es POAP?" (objeción de los mentores)

Respuesta honesta: **sí, el gesto es el mismo.** POAP (Proof of Attendance Protocol, 2019) demostró que "el organizador muestra un QR, la persona escanea y recibe algo que prueba que estuvo" funciona. Incluso el QR rotativo existe en POAP (modo kiosco). Negarlo nos hace quedar mal; reconocerlo y marcar la diferencia nos hace quedar bien. Sobre "POAV": no lo conocemos como estándar distinto; probablemente sea POAP o una variante local. Preguntar al mentor qué es antes de contestar.

Lo que POAP no resuelve, y es exactamente lo que necesitaba la persona 3:

| | POAP | Presente |
|---|---|---|
| Qué prueba | Que una billetera tiene un token de un evento | Que **una persona con nombre** participó de una actividad emitida por **una institución identificada**, con fecha y hora |
| Quién emite | Cualquiera que cree un "drop" y pase la curaduría de POAP Inc. No dice nada de la autoridad del emisor | Solo emisores registrados con clave pública publicada. La jefa de carrera ve "lo emitió la Facultad", no "lo creó alguien" |
| Transferible | Sí: es un NFT, se puede regalar o vender. Hay mercados de POAPs | No: es nominal, va atada al nombre y a la huella del mail. Para una universidad una constancia transferible no vale nada |
| Privacidad | Todo público en la cadena: billetera + historial completo de eventos. Un historial de asistencia a clases público es inaceptable para una universidad (Ley 25.326) | En la cadena hay solo un hash. Nombre, mail y actividad quedan con la persona y el emisor. La persona decide a quién se la muestra |
| Requisitos para la persona | Billetera o cuenta POAP, entender qué es un NFT | Cámara del celular, nombre y mail |
| Dependencia | De POAP Inc. (curaduría, infraestructura) y de la red Gnosis | De nadie: la firma se verifica aunque Presente desaparezca; el sello de tiempo está en Bitcoin vía OpenTimestamps, sin token ni gas |
| Para qué se diseñó | Coleccionable de comunidad. Un badge | Justificar una falta, acreditar regularidad, certificar un curso. Lo que una secretaría acepta |
| Dónde encaja | Comunidades cripto | El aula, extensión, becas. Y el modelo de credencial verificable (W3C) que universidades y organismos ya están adoptando, no el de NFT coleccionable |

**La frase para el pitch (10 segundos):**
> POAP demostró que escanear y recibir funciona. Pero POAP es un coleccionable: lo emite cualquiera, se puede transferir y tu historial es público. Presente es una constancia nominal, firmada por la institución, privada y verificable sin billetera. Es lo que una facultad puede aceptar.

**Si insisten con "entonces es POAP para universidades":** aceptar la mitad. "Es la idea de POAP llevada a donde POAP no puede entrar: una secretaría académica. Lo que vendemos no es el token, es que la institución lo acepte." Y volver a la persona 3.

**Estado actual de POAP, verificado el 30 de octubre de 2026** (The Block, 3 ago 2026; Unchained, 4 ago 2026):

- **POAP cerró.** Entró en modo mantenimiento el 16 de marzo de 2026 (bloqueó nuevas altas de emisores) y el 3 de agosto de 2026 la cofundadora Isabel Gonzalez anunció el cierre definitivo.
- **Motivo declarado:** "los ciclos de financiamiento de cripto y la dinámica de distribución hicieron difícil construir una empresa sostenible sin canibalizar el ethos que hacía que POAP significara algo". Sin modelo de negocio sostenible.
- **Escala que dejó:** casi 7,6 millones de badges emitidos por más de 46.210 emisores. Los tokens siguen en la cadena y son **transferibles y comercializables** ("remain onchain and tradable"), lo que confirma el punto de la tabla.
- **Qué pasa con los usuarios:** nadie emite POAPs nuevos; los existentes quedaron sin la empresa que los sostenía. Las herramientas de colección siguen "con recursos reducidos" y sin fecha de fin.
- Mencionan "classrooms" entre los usos, pero ningún medio nombra una universidad ni un programa educativo.
- "POAV" no aparece en ninguna búsqueda como estándar o producto. Tratarlo como POAP salvo que el mentor aclare.

**Qué cambia en el pitch con este dato:** la objeción "esto ya existe, es POAP" se da vuelta.

> POAP existió, emitió 7,6 millones de badges y cerró en agosto de este año porque nunca encontró quién pagara. Los badges quedaron huérfanos y se pueden vender. Nosotros arrancamos por el otro lado: una constancia nominal, no transferible, que la institución firma y un tercero verifica aunque Presente no exista más, y un cliente que ya paga por certificar.

Es también la respuesta a "¿cuál es el mayor riesgo?": el mismo que mató a POAP, el modelo de negocio. Por eso el orden de clientes de la sección 3 empieza por quienes ya pagan.

Fuentes: [The Block](https://www.theblock.co/post/410482/proof-of-attendance-protocol-is-shutting-down-after-5-years) · [Unchained](https://unchainedcrypto.com/poap-winds-down-after-five-years-and-nearly-7-6-million-onchain-badges/)

## 11. ¿Pagarían las privadas? ¿Cuánto? (y ANSES)

### ANSES / Capital Humano: sí, por toda la línea

Para Progresar el que paga es el Estado, por las cuatro líneas a la vez: licencia anual o precio por certificación verificada. Es el cliente más grande (811 mil beneficiarios) y el más lento (licitación o convenio, meses o años). Hay una variante más rápida: que el Estado **exija** la certificación verificable como estándar y cada institución la emita gratis con Presente. Ahí el Estado no paga software, paga menos auditoría, y las instituciones entran porque es requisito. No es el primer cliente, es el que hace que la red sea obligatoria.

### Universidades privadas: sí, y acá va el por qué y el cuánto

**Por qué pagarían (tres motivos verificados hoy):**

1. **Ya están obligadas a tomar asistencia.** La UCA, por ejemplo, fija en su Ordenanza VII que la condición de alumno regular se conserva con una asistencia mínima del 75% de las clases. Es el umbral habitual en reglamentos argentinos (UNQ, UNLP, UNT lo tienen igual). Hoy lo cumplen con listas a mano. No les vendemos una necesidad nueva: les vendemos hacer bien algo que el reglamento ya les exige.
2. **Cada estudiante que abandona es una cuota que deja de entrar.** Las cuotas 2026 van de unos $220.000 a $600.000 por mes en UADE, UP, UCA e ITBA según calculadoras de referencia, y $1.300.000 en UCEMA (iProfesional, feb. 2026). Retener es el negocio.
3. **Ya compran software por suscripción**: campus virtual, CRM de admisiones, herramientas de examen. Deciden en Secretaría Académica o Rectorado, sin licitación.

**Cuánto.** Propuesta de precio, para validar con Catalina de Paz: **$3.000 por estudiante por año**, o su equivalente de unos $10 por constancia emitida. Con una cuota conservadora de $300.000 mensuales (× 10 meses = $3.000.000 por año por estudiante), el precio es el 0,1% de lo que el estudiante paga.

Dos frases para que el número se entienda sin planilla:

> Con una cuota mensual de un solo estudiante, la universidad paga Presente para 100 estudiantes durante un año.

> Si Presente le evita perder a un solo estudiante, pagó Presente para 1.000.

**El cálculo para una universidad de 10.000 estudiantes** (supuestos declarados):

| Concepto | Valor |
|---|---|
| Precio Presente | 10.000 × $3.000 = **$30 M por año** |
| Un punto porcentual menos de abandono | 100 estudiantes × $3.000.000 = **$300 M por año** |
| Relación valor / precio | 10 a 1, con un solo punto de retención |
| Ahorro administrativo (constancias, listas) | se suma, pero no hace falta para justificar el precio |

**Techo del segmento:** 600.640 estudiantes en privadas (OpenARG 2023) × $3.000 = unos **$1.800 M por año** si estuvieran todas. Es un techo, no una proyección.

**Objeción esperable:** "ya tenemos un sistema académico". Respuesta: el sistema registra inscripción y notas; la asistencia por clase la toma el docente a mano y no vuelve a ningún lado. Presente no reemplaza el sistema, le da el dato que hoy no tiene, y el estudiante se lleva la constancia.

**Cómo se vende:** piloto gratis en una facultad durante un cuatrimestre, medimos asistencia y abandono contra el cuatrimestre anterior, y la universidad decide con sus números.

Todos los valores en pesos son de octubre de 2026 y van a cambiar: en el pitch conviene usar las dos frases de proporción, no los montos.

Fuentes: [iProfesional, ranking de cuotas 2026](https://www.iprofesional.com/management/448026-revelan-el-ranking-de-universidades-mas-caras-de-argentina-y-el-valor-de-las-cuotas) · [hacecuentas, calculadora de cuota](https://hacecuentas.com/calculadora-costo-universidad-privada-cuota) · [UCA, Ordenanza VII sede Paraná](https://wadmin.uca.edu.ar/public/20180522/1526999168_2018-mayo-Ordenanza%20VII-Sede-Parana.pdf) · [UNQ, régimen de asistencia](https://www.unq.edu.ar/wp-content/uploads/migracion/documentos/63ee3849ea06e.pdf)
