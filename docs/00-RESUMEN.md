# Presente · una idea, un cliente, un beneficio

**Equipo Stark · Track Nueva Educación · viernes 30 de octubre, 19:00.** Esta es la única versión del proyecto. Si algo no está acá, no va al pitch.

## La idea en una frase

> Presente es la constancia de que estuviste en una clase, un curso o un evento: nace en el aula, la firma la institución, queda en tu celular y cualquiera la verifica sin pedirle nada a nadie.

## El problema, magnificado con datos

Argentina paga becas condicionadas a que la persona siga estudiando, y no puede medir la condición.

- **Progresar** tiene **811.448 beneficiarios** (oct 2025, OpenARG) en cuatro líneas: secundaria, universidad y terciarios, formación profesional y enfermería. En todas, la condición es asistir.
- La condición se verifica **tres veces al año**, con una carga manual que hace cada institución en una plataforma. Entre certificación y certificación, el Estado paga el 80% mensual sin saber si la persona sigue yendo.
- Esa carga la hace un intermediario: quien carga decide, demora o se equivoca, y el beneficiario no ve qué se cargó sobre él ni puede corregirlo.
- A escala del sistema: **2.730.800 estudiantes universitarios**, egresa el **5,8%**, la matrícula creció 36% en diez años y los egresos casi nada. Entre inscripción y egreso, nadie sabe quién está. OpenARG tiene 33.460 datasets y ninguno de asistencia.
- Lo escuchamos en cuatro conversaciones: una estudiante casi queda libre por venir a LABITCONF porque no tenía cómo probar que participó; un docente marca 50 estudiantes uno por uno en el sistema de su universidad y, si toma al principio, no puede volver a tomar.

## El cliente

**ANSES y el Ministerio de Capital Humano**, que administran y pagan Progresar.

- **Por qué pagan:** hoy gastan el 100% del programa contra una verificación que ocurre tres veces al año y la carga un tercero. Compran condicionalidad medible: pagar solo a quien cumple, saberlo el mismo mes, auditar sin visitar instituciones y tener por primera vez el mapa de dónde se abandona.
- **Quién usa y no paga:** la institución emite (ya está obligada a certificar) y el estudiante recibe (es suyo).
- **Caja chica mientras el Estado decide:** academias y organizadores de formación que ya pagan por certificar (por constancia emitida) y universidades privadas que pierden cuotas por abandono y están obligadas por reglamento al 75% de asistencia (por estudiante por año, unos $3.000, el 0,1% de la cuota anual).
- **Camino:** piloto con una jurisdicción, provincia o universidad nacional con muchos beneficiarios, un cuatrimestre, midiendo filtración y demora contra el método actual. Con ese número, a nación.

## Otros stakeholders y qué ganan

| Quién | Qué gana |
|---|---|
| Beneficiario de Progresar | Cobra en fecha, sin depender de quién carga, y ve su propio registro |
| Institución (escuela, universidad, centro de formación) | Deja de cargar a mano tres veces al año; el docente deja de marcar uno por uno; cumple el reglamento de asistencia con dato real |
| Docente | Toma de asistencia en un minuto, varias veces por clase, sin marcar a nadie |
| Universidades privadas | Retención: ven la ausencia antes de que sea abandono |
| Empleadores y terceros | Verifican una constancia sin escribirle a la institución |
| Sociedad y OpenARG | Por primera vez, un dato agregado y anónimo de asistencia, publicado como dato abierto |

## Cómo llega a todo el universo, incluida la escuela rural

Quien marca es **la institución**, no el beneficiario. Tres capas:

1. Docente con celular o computadora abre la toma: quienes tienen celular se marcan solos por QR, a quienes no, el docente los marca con un toque. En ambos casos la constancia sale firmada y nominal.
2. La constancia le llega al beneficiario en **Mi Argentina**, que ya tiene el 100% de los inscriptos en Progresar porque es requisito. Sin app propia, sin billetera.
3. Sin conectividad: la toma se hace igual en el celular del docente, se firma localmente y se sube cuando hay red. El anclaje en Bitcoin es asíncrono por diseño.

## Antifraude, dicho con honestidad

- El QR cambia cada pocos segundos y la persona tiene que leerlo **en vivo con la cámara** al confirmar: una foto reenviada no sirve. Para engañar hace falta una videollamada en curso.
- Versión Progresar: la institución escanea el **DNI digital de Mi Argentina** de la persona. Identidad fuerte, inclusivo, sin instalar nada.
- Tomas múltiples en la misma clase: el que llega tarde o se va temprano queda registrado así.
- Ningún método sin biometría elimina que un presente marque a un amigo ausente. Lo hacemos caro y rastreable: identidad, tomas múltiples y muestreo. Es infinitamente más que lo que hay hoy, que es nada entre certificación y certificación.

## Por qué blockchain, en una frase

Porque la prueba tiene que valer aunque la institución, nosotros o el gobierno de turno no estén: la constancia va firmada por la institución y su huella se ancla en Bitcoin con OpenTimestamps, sin token, sin gas, sin billetera, y sin ningún dato personal en la cadena.

## Qué existe hoy y por qué esto es mejor

Sistemas de asistencia de cada institución donde el docente marca uno por uno, una vez por clase, y el dato queda encerrado. PDFs que nadie puede validar. Y POAP, que emitió 7,6 millones de badges y **cerró en agosto de 2026** porque nunca encontró quién pagara: coleccionables transferibles con historial público. Presente es nominal, no transferible, firmado por la institución, privado, y tiene un cliente que ya paga por lo que no puede medir.

## El mayor riesgo

Vender al Estado tarda. Por eso el piloto es provincial y mientras tanto facturamos a academias y privadas con el mismo producto.

## Lo que ya funciona (prototipo en `presente/`)

QR rotativo con contador en vivo, constancia firmada Ed25519 con anclaje real en Bitcoin, verificador en el navegador que detecta adulteraciones, historial en el celular, registro público de emisores, landing con los datos de OpenARG. Probado de punta a punta en local. Falta el deploy público (Supabase, GitHub, Vercel) y las tres mejoras de esta noche: lectura en vivo del QR, tomas múltiples, tarjeta Mi Argentina simulada.
