# Nuestra primera ronda

Guía pública didáctica para Jonathan, Aitor y Miguel. HTML, CSS y JavaScript sin dependencias de producción, formularios externos ni datos operativos de clientes.

Fuente: hoja de ruta ARZ/Urus v3, 01/10/2026. Web: 03/10/2026. Nueve partidas, tres tramos de 500 EUR. Los simuladores son educativos: no modifican presupuestos, anuncios ni cuentas.

Incluye ocho pasos, calendario orientativo, presupuesto y capacidad interactivos, simulación de cortes C33, margen por pedido, herramientas, responsabilidades, preguntas de comprensión, glosario, 58 referencias del curso, 32 fuentes oficiales y los dos PDFs vigentes.

## Uso y verificación

`python -m http.server 8766 --directory dist` desde esta carpeta. `node tests/verify.cjs` verifica finanzas y archivos. Abrir `dist/index.html` también permite usar las calculadoras sin conexión, salvo fuentes externas.

Los datos y las copias PDF/CSV se exportan desde el proyecto padre ejecutando `scripts/build_investor_web.py`. Este repositorio contiene exclusivamente la guía pública, no las transcripciones completas, credenciales ni registros del negocio.

GitHub Pages publica `dist` con el workflow incluido. No añade una cuota de membresía al piloto. El acceso público se acordó con Jonathan al pedir el mismo formato de las demos de clientes. `noindex` pide no indexar; no es un control de acceso.

Consultar PROGRESS.md para publicación y validación.
