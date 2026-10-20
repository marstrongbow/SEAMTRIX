# SEAMTRIX

Prototipo funcional de análisis territorial para el Hackathon INE. Aplicación estática modular sin dependencias de JavaScript externas. Proyecto independiente del equipo; no es una herramienta oficial del INE.

## Publicar con GitHub Pages

1. Crear un repositorio llamado `seamtrix`. Con GitHub Free, usar un repositorio público para habilitar Pages.
2. Descomprimir el ZIP y subir su contenido al repositorio. `index.html` debe quedar directamente en la raíz, junto a `app.js`, `model.js` y `style.css`. No subir solamente el ZIP ni una carpeta exterior que contenga los archivos.
3. Abrir **Settings > Pages**.
4. En **Build and deployment > Source**, elegir **Deploy from a branch**.
5. Elegir **main**, carpeta **/(root)** y pulsar **Save**.
6. Esperar a que termine la publicación y abrir el enlace que muestre GitHub Pages.

El sitio publicado se abre directamente en un navegador. No requiere servidor de aplicación ni credenciales. Los archivos usan rutas relativas compatibles con una página de proyecto.

Documentación oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Ejecutar

Servir esta carpeta con cualquier servidor HTTP estático (por ejemplo `python3 -m http.server 8080 --directory .`) y abrir su URL. Requiere HTTP porque usa módulos ES; no abrir el HTML con file://. Las fuentes de Google son opcionales y tienen fuentes de sistema de respaldo.

## Funciones

- 32 entidades en cartograma esquemático, filtro territorial y dos horizontes.
- Serie histórica con tipos electorales diferenciados.
- Estimación de persistencia usando la última elección comparable anterior al horizonte.
- Clasificación relativa con tercios de la distribución de referencia y umbrales fijos entre escenarios.
- Comparación de escenarios con cobertura y mejora hipotéticas explícitas.
- Carga local CSV validada, persistencia local y exportación de consulta con origen y supuestos.
- Prueba retrospectiva sobre 2024, con cobertura de pares disponibles.

## Datos

La demostración inicial usa cifras sintéticas, identificadas en pantalla y descargas. No debe utilizarse para obtener conclusiones electorales. El archivo de ejemplo también es sintético. Importar un CSV normalizado con `entidad_id,anio,participacion,lista_nominal`. Una fila por entidad y elección; porcentajes entre cero y cien; lista nominal opcional, positiva y compatible con la tasa. No cargar registros personales ni mezclar totales con desgloses.

La importación no verifica autenticidad de origen. Antes de usar datos oficiales hay que descargar, auditar y normalizar CCPC; documentar cartografía, faltantes y denominadores. No existe todavía cobertura municipal, geometría oficial, modelo multivariable entrenado ni inferencia causal.

## Verificar

`node --test tests/*.test.js`

Las pruebas cubren cortes temporales, tipos electorales, ponderación, validación CSV y límites del simulador.

## Siguientes incrementos

Integrar y documentar una extracción real CCPC; añadir cartografía oficial compatible; comparar la referencia con regresión regularizada bajo particiones temporales; publicar errores y límites; preparar entregables del Reto 2. La licencia del proyecto se definirá con el equipo y conforme a la convocatoria antes de redistribuir datos o componentes.
