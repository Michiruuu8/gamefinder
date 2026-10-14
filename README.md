# GameFinder

Explorador de videojuegos hecho con React que consume la API de [RAWG](https://rawg.io/apidocs). Permite buscar juegos, filtrar por género y plataforma, ver la ficha de cada uno con sus capturas en un carrusel WebGL y guardar favoritos.

**Demo en vivo:** _pendiente de publicar_

<!--
Capturas: guarda 2 o 3 imágenes en docs/screenshots/ y agrégalas aquí, por ejemplo:
![Inicio](docs/screenshots/home.png)
-->

## Funcionalidades

- Búsqueda por nombre con filtros por género y plataforma, y paginación con "Load more"
- Juegos populares al abrir la app, sin necesidad de buscar primero
- La búsqueda y los filtros se conservan al abrir un juego y regresar
- Ficha del juego con descripción resumida, plataformas, carrusel de capturas y enlaces a tiendas
- Favoritos guardados en el navegador (persisten al recargar), mostrados en un carrusel de tarjetas
- Portada a pantalla completa con efecto de píxeles al pasar el cursor, navegación flotante, scroll suave y animaciones de entrada
- Diseño responsive

## Tecnologías

- React 19 + Vite
- React Router
- Axios
- Framer Motion (animaciones y transiciones)
- Lenis (scroll suave)
- OGL (WebGL para el carrusel de capturas)
- CSS puro (Grid, Flexbox, variables CSS)
- [RAWG API](https://rawg.io/apidocs)

## Detalles técnicos

- **Estado de búsqueda con Context:** la búsqueda, los filtros y los resultados viven en un contexto por encima de las rutas, así no se pierden al navegar al detalle y volver.
- **Favoritos con `localStorage`:** el hook `useFavorites` carga el estado con una inicialización perezosa de `useState`, para evitar que un efecto de guardado sobrescriba los datos guardados al montar.
- **Estados de carga y error:** cada petición maneja `loading`, `success` y `error`, con tarjetas esqueleto mientras carga y mensajes claros si la API falla.
- **Resumen de descripciones:** `shortenDescription` limpia el HTML que devuelve RAWG, quita los subtítulos sueltos y arma el resumen con oraciones completas, sin cortar a media frase.
- **Capturas sin romper la página:** las capturas se piden aparte del detalle; si fallan, la ficha se muestra igual.
- **Rutas en producción:** `vercel.json` redirige todas las rutas a `index.html`, para que recargar en `/favorites` o `/game/:id` no dé 404.

## Cómo correrlo localmente

```bash
git clone https://github.com/Michiruuu8/gamefinder.git
cd gamefinder
npm install
```

Crea un archivo `.env` en la raíz con tu propia API key de RAWG (se obtiene gratis en [rawg.io/apidocs](https://rawg.io/apidocs)):

```
VITE_RAWG_API_KEY=tu_api_key_aqui
```

Luego inicia el servidor de desarrollo:

```bash
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Estructura

```
src/
  components/   Piezas reutilizables (tarjetas, nav, carrusel, PixelSwap, footer)
  context/      Contexto de búsqueda
  hooks/        useFavorites
  lib/          Scroll suave y resumen de descripciones
  pages/        Búsqueda, detalle y favoritos
  services/     Llamadas a la API de RAWG
```

## Créditos

- Datos e imágenes de videojuegos: [RAWG](https://rawg.io)
- Los componentes `PixelSwap` y `FlexCarousel` están adaptados de [React Bits](https://reactbits.dev)

## Autora

Michel Cortes Resendiz — [GitHub](https://github.com/Michiruuu8)
