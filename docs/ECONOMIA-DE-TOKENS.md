# Economía de tokens OKN · versión 2

Los documentos del proyecto (`OceanOS_Plan_Startup-MVP.pdf`, `OceanOS - De que se
trata.pdf`, la encuesta de validación y el flujo de n8n del MER) describen la tabla
de recompensas con la que arrancó el diseño. La plataforma implementa una versión
corregida. Este documento deja escrito qué cambió y por qué, para que la diferencia
no se lea como un error de implementación.

## Qué cambió

| Acción | v1 (documentos) | v2 (implementada) | |
|---|---|---|---|
| Reporte básico | +15 OKN | **0 OKN** | el pago se corre a la verificación |
| Foto verificada por IA | +25 OKN | **+15 OKN** | recalibrado |
| Racha semanal (7 días) | +50 OKN | **+33 OKN** | 65% del bono original |
| Verificación de otro usuario | +10 OKN | +10 OKN | sin cambios |
| Primer reporte de zona nueva | +100 OKN | **+65 OKN** | 65% del bono original |

Lo que no cambió: el umbral del 80% de confianza de la IA, los 3 votos ponderados
por reputación, los 30 días que definen una zona nueva, los 7 días de racha y la
reputación (+5 al verificarse, −10 al rechazarse, tope 1000).

## Por qué

**El reporte crudo no vale, el verificado sí.** El propio documento fundacional lo
dice en la sección de verificación de datos: *dato verificado = dato vendible al
SaaS*. Un reporte sin clasificar no se le puede vender a nadie hasta que la
comunidad lo valide. Pagar +15 OKN por el reporte crudo premia el volumen, que es
exactamente el incentivo equivocado: conviene cargar muchos reportes flojos antes
que uno bueno. En la v2 el reporte entra gratis y cobra cuando queda verificado.

**La emisión por reporte bajó de 40 a 15 OKN.** Sumando las dos filas viejas, un
reporte verificado emitía 40 OKN. Con los canjes cargados (el café del muelle sale
150 OKN, la inmersión guiada 1200), eso significaba llegar al primer canje con
cuatro reportes. Con 15 OKN hacen falta diez, que es una relación más razonable entre lo
que cuesta un canje real y lo que el usuario tiene que aportar para conseguirlo.

**Los bonos bajaron al 65%.** La racha y la zona nueva son bonos de arranque:
sirven para que el mapa se llene y para que alguien se anime a reportar donde no
hay nadie. Con +50 y +100 pesaban más que el trabajo sostenido de reportar y
validar. Al 65% siguen siendo el premio más alto del sistema sin dominar el saldo.

**El voto no se tocó.** Verificar el reporte de otro es el trabajo que convierte un
dato crudo en un dato vendible, y es lo que más cuesta sostener en una comunidad
chica. Sigue pagando +10 OKN.

## Qué hay que actualizar en los documentos

- `OceanOS_Plan_Startup-MVP.pdf`, sección 4.3 · tabla de tokens
- `OceanOS - De que se trata.pdf`, sección 3 · tabla de tokens
- El flujo de n8n del MER acredita `+25` en el nodo de base de datos: ahora acredita
  el valor de `foto_verificada` y recién cuando el reporte queda verificado
- Encuesta de validación, preguntas 15 y 16: preguntan por 25 OKN por foto
  verificada y por 100 OKN = 10% de descuento en un tour de $50.000 ARS

Sobre la encuesta: las respuestas ya obtenidas siguen sirviendo, porque lo que
miden es si el mecanismo de tokens incentiva a reportar, no si el monto exacto es
el correcto. Si se vuelve a salir a campo, conviene actualizar los dos montos.

## Dónde vive el número

En un solo lugar por implementación, y la interfaz nunca lo escribe a mano:

- `frontend/src/services/demo/servidor.js` → `PREMIOS` (demo en el navegador)
- `backend/src/services/sightings.service.js` → `PREMIOS` (API real)

Las dos lo publican en `GET /tokens/reglas`, y de ahí lo leen la página que explica
el sistema (`/app/tokens`), el formulario de reporte, la billetera, la cola de
verificación y el recorrido de la página de funciones. Cambiar un premio cambia
todo el sitio y su explicación al mismo tiempo: no hay un segundo lugar donde el
número pueda quedar viejo.
