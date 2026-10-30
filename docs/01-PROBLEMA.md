# Bloque 1 · Problema

**Track:** Nueva Educación. **Fecha:** viernes 30 de octubre de 2026.

## 1. Cinco problemas concretos del eje que conocemos de cerca

1. Tomar lista en clase consume tiempo de cursada y el registro termina en papel o planillas que después nadie puede verificar.
2. Un estudiante no puede demostrar que cursó, asistió o participó de algo (una materia, un curso de extensión, una charla) sin pedirle un certificado a la institución y esperar días.
3. Las universidades no saben en tiempo real quién está asistiendo, así que detectan el abandono cuando ya pasó.
4. Los cursos y eventos de extensión universitaria entregan certificados en PDF fáciles de falsificar y difíciles de validar por un tercero.
5. Los estudiantes con beca (Progresar, becas provinciales, SUBE estudiantil) tienen que certificar regularidad cada año con trámites que dependen de que la institución emita un papel.

## 2. El problema elegido

¿Le pasa a alguien de verdad, hoy? Sí: a cualquier docente que toma lista, a cualquier estudiante que necesita un certificado de asistencia o regularidad, y a cualquier área de extensión que entrega constancias.

### En una frase, sin tecnología

> En las universidades argentinas registrar quién asistió a una clase, un curso o un evento es lento y poco confiable, y después ni el estudiante ni la institución pueden demostrarlo a un tercero sin un trámite.

## 3. Los 5 porqués

1. **¿Por qué es lento y poco confiable registrar asistencia?** Porque se hace a mano (lista, firma, planilla) y depende de que el docente la cargue después.
2. **¿Por qué se hace a mano?** Porque los sistemas académicos registran inscripción y notas, no presencia en cada encuentro, y menos en actividades de extensión.
3. **¿Por qué no registran presencia?** Porque la asistencia nunca fue un dato de valor para la institución más allá del control, entonces no se invirtió en capturarla bien.
4. **¿Por qué no se la consideró de valor?** Porque el único que la necesita después es el estudiante (para una beca, un certificado, una regularidad) y la institución es la única que puede emitirla y validarla.
5. **¿Por qué la institución es la única que puede validarla?** Porque la prueba de asistencia vive en registros internos a los que ningún tercero accede. **Problema de fondo: la evidencia de participación es propiedad del registro de una institución, no de la persona que participó.**

## 4. Datos de OpenARG que respaldan el problema

Todos obtenidos vía el MCP de OpenARG el 30 de octubre de 2026. Detalle y tablas en `data/openarg-respaldo.json`.

### A cuánta gente afecta

| Dato | Valor | Fuente OpenARG |
|---|---|---|
| Estudiantes universitarios en Argentina (2023) | **2.730.800** | Educación superior, datos.gob.ar |
| De ellos en universidades públicas | 2.130.160 (78%) | ídem |
| Egresados en 2023 | 159.730, el **5,8%** de los estudiantes | ídem |
| Crecimiento de la matrícula 2014 a 2023 | de 2,0 M a 2,7 M (+36%), con egresados casi planos (134 mil a 160 mil) | ídem |
| Beneficiarios Progresar que deben certificar regularidad cada año | **811.448** (octubre 2025); pico de 1,87 M en 2023 | Prestaciones de la seguridad social, datos.gob.ar |

Lectura para el pitch: la asistencia la toman docentes para 2,7 millones de estudiantes todas las semanas, y 800 mil de ellos necesitan además probar regularidad para cobrar una beca. La matrícula creció un tercio en diez años mientras la tasa de egreso bajó de 6,7% a 5,8%: el sistema tiene cada vez más gente adentro de la que sabe poco hasta que deja de venir.

### El problema existe también en extensión y capacitación

Plan anual de capacitaciones de Entre Ríos (88 cursos a mayo 2023, varios dictados con UNER y UADER): casi todos registran inscriptos, pero la columna "participantes por año" está en 0 en la gran mayoría. Ejemplo: Comunicación Escrita (FTS-UNER) 70 inscriptos, 0 participantes registrados. El dato de quién efectivamente cursó y terminó no se consolida ni siquiera en el portal oficial.

### Qué no encontramos en OpenARG

No hay un dataset nacional de asistencia a clases universitarias ni de certificados de extensión emitidos. Ese vacío es parte del problema: la asistencia no es un dato público porque hoy ni siquiera es un dato estructurado dentro de las instituciones. Vale decirlo en el pitch si preguntan.

### Nota técnica sobre los datos

El dataset "Educación superior" usa punto como separador de miles y OpenARG lo lee como decimal en algunas celdas, así que las sumas directas desde el MCP dan valores en unidades mezcladas. Los totales de este documento fueron recalculados desde el CSV oficial que OpenARG referencia. Si Dante D'Agostino (creador de OpenARG, mentor) está en el HUB, vale avisarle.

## 5. Checklist del bloque

- [x] 5 problemas del eje anotados
- [x] Uno elegido, le pasa a alguien hoy
- [x] Escrito en una frase sin tecnología
- [x] Dato de OpenARG que muestra que existe y a cuánta gente afecta
