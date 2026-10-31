# edu-hub · hackatón

Repositorio: <https://github.com/ampalmaj/presente-stark> · Prototipo en `presente/` · Ruta y documentos en `docs/`

Prototipo que usa datos abiertos de Argentina vía el MCP oficial de [OpenArg](https://openarg.org).

## Conectar el MCP de OpenArg

1. Generá tu clave gratis en <https://openarg.org/desarrolladores> (login con Google). Se muestra una sola vez, empieza con `oarg_sk_` y solo puede haber una activa: generar otra revoca la anterior.
2. Registrá el servidor en tu config de usuario de Claude Code (vale para todos los proyectos):

   ```bash
   claude mcp add --transport http --scope user openarg https://mcp.openarg.org/mcp --header "Authorization: Bearer oarg_sk_TU_CLAVE"
   ```

3. Verificá con `claude mcp list` que `openarg` figure como Connected. Si cambiás la clave, primero `claude mcp remove openarg -s user` y repetí el paso 2.

Cada integrante del equipo usa su propia clave: la cuota es por persona.

## Herramientas que expone (solo lectura)

| Tool | Para qué |
|---|---|
| `listar_fuentes()` | Portales indexados (38 portales, 33.000+ datasets) |
| `buscar_datasets(texto, portal?, limite?)` | Buscar tablas por texto |
| `describir_tabla(tabla)` | Columnas y tipos de una tabla |
| `obtener_datos(tabla, columnas?, desde?, hasta?, filtros?, orden?, limite?)` | Filas crudas, hasta 500 por llamada |
| `agregar_datos(tabla, operacion, columna?, agrupar_por?, ...)` | suma / promedio / conteo / minimo / maximo |
| `consultar_datos_publicos(pregunta)` | Respuesta en lenguaje natural con fuentes |

## Cuotas (por persona, se renuevan el 1° de cada mes)

- Modo datos: 200 requests/mes, 30/min.
- Modo respuestas (`consultar_datos_publicos`): 10 preguntas/mes, 2/min. Usarla con cuidado.
- 402 = cuota agotada, 429 = rate limit.

## API HTTP equivalente

Base `https://api.openarg.org`, mismo header `Authorization: Bearer oarg_sk_...`:

- `GET /api/v1/catalogo/buscar?q=...`
- `GET /api/v1/catalogo/tabla?nombre=...`
- `POST /api/v1/catalogo/datos` `{"tabla": "...", "desde": "AAAA-MM", "limite": 100}`
- `POST /api/v1/catalogo/agregar` `{"tabla": "...", "operacion": "suma", "columna": "...", "agrupar_por": ["..."]}`
- `POST /api/v1/ask` `{"question": "..."}`

Docs: <https://mcp.openarg.org> · <https://mcp.openarg.org/herramientas.html> · <https://mcp.openarg.org/limites.html>
