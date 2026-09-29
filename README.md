# Informática Resolutiva

Sitio web estático profesional desarrollado con HTML, CSS y JavaScript.

## Estructura
- `index.html` — Inicio
- `servicios.html` — Servicios + catálogo interactivo
- `sobre-nosotros.html` — Sobre Nosotros
- `resenas.html` — Reseñas
- `contacto.html` — Contacto
- `css/styles.css` — Estilos globales y responsive
- `js/main.js` — Menú móvil, WhatsApp y catálogo

## WhatsApp
El número configurado es `+54 9 11 6559-0532`.

## Importante antes de publicar
Las imágenes actualmente usan URLs de Unsplash para que la demo tenga fotografías profesionales. Para una versión definitiva conviene reemplazarlas por fotografías/logos autorizados del cliente.

No requiere servidor ni base de datos: se puede publicar directamente en cualquier hosting estático.


## Reseñas
La página `resenas.html` ahora permite que los usuarios escriban nombre, servicio, puntuación y reseña. Se pueden ordenar por **mejor valoradas** o **más recientes**.

Esta versión frontend guarda las reseñas en `localStorage`, por lo que funciona sin servidor pero las reseñas quedan guardadas únicamente en el navegador/dispositivo donde se publican. Para que todos los visitantes vean las mismas reseñas y exista moderación real, el siguiente paso es conectar este módulo a una base de datos/API (por ejemplo PHP + MySQL o Supabase).
