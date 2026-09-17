# Qué quedó distinto entre los documentos y la plataforma

Lista de las diferencias entre lo que dicen los archivos de `Material del proyecto`
y lo que la plataforma hace hoy. Ninguna es un error de implementación: son
decisiones posteriores a la redacción de los documentos. Sirve para corregir los
PDF antes de la próxima entrega y para no quedar en falso si el profesor cruza una
cosa con la otra.

## Tabla de tokens

| Dónde | Dice | Debería decir |
|---|---|---|
| `OceanOS_Plan_Startup-MVP.pdf` §4.3 | 15 / 25 / 50 / 10 / 100 | 0 / 15 / 33 / 10 / 65 |
| `OceanOS - De que se trata.pdf` §3 | 15 / 25 / 50 / 10 / 100 | 0 / 15 / 33 / 10 / 65 |
| `Entrega_MER_OceanOS_n8n.pdf` §6 | nodo Supabase acredita `+25` | acredita `+15`, y solo con el reporte ya verificado |
| Encuesta, preguntas 15 y 16 | 25 OKN por foto verificada; 100 OKN = 10% de descuento | 15 OKN; el equivalente con los montos nuevos |

El porqué está en [ECONOMIA-DE-TOKENS.md](ECONOMIA-DE-TOKENS.md).

## Equipo

`OceanOS - De que se trata.pdf` lista ocho integrantes: Lautaro Martinez, Gabriel
Maculus, Leandro Orozco, Kevin Castilla, Mariano Rasgido, Ezequiel Diaz, Samira Baz
y Jose Rodriguez. El sitio nombra cinco: Lautaro Martinez, Leandro Orozco, Gabriel
Maculus, Jose Rodriguez y Otar.

Hay que unificar el criterio, y **falta el apellido de Otar**, que no figura en
ningún documento. El plan fundacional dice "Fundador + 4 programadores", que sí
coincide con los cinco del sitio.

## Estado de la plataforma

`OceanOS - De que se trata.pdf` §6, *Qué está construido*:

| Dice | Está |
|---|---|
| 18 tablas y 3 vistas calculadas | **20 tablas** y 3 vistas: se sumaron `n8n_workflows` y `n8n_trigger_log` |
| Mapa: SVG propio, proyección equirectangular | **Leaflet + OpenStreetMap**, con el modo noche como filtro CSS |
| Autenticación, permisos por rol y por plan | El backend los conserva; **la demo no tiene login** y los planes no bloquean nada |

El Canvas (`Modelo Canvas - OceanOS.docx`) menciona **Mapbox** como recurso clave:
la plataforma usa OpenStreetMap, que no pide clave ni tarjeta. Vale la pena
cambiarlo, porque además baja la estructura de costos.

## Funciones del MVP todavía pendientes

Las lista el propio documento fundacional en *Falta para producción*, y siguen
igual:

- Subida de fotos (la columna `photo_url` existe, falta el almacenamiento)
- Clasificación de especies en el dispositivo (TensorFlow Lite)
- Notificaciones de avistamientos cercanos
- Exportación de informes para BID y GEF
- Cobro real en el marketplace
- Modo sin conexión
- App móvil nativa: hoy es una web que funciona bien en el teléfono
- Filtros del mapa por especie y por fecha (hoy filtra por zona y por tipo)

## Un archivo que no es del proyecto

`TP_OMNS_Luciano_Apolonia.pdf` es un trabajo práctico de Operación y Mantenimiento
de Software Naval, de otra escuela y otro alumno. No tiene relación con OceanOS:
conviene sacarlo de la carpeta antes de entregar.
