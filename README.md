# CloudCode Landing

Landing page corporativa para CloudCode enfocada en servicios de desarrollo web, apps moviles y automatizacion con IA.

## Tecnologias

- HTML5 semantico
- CSS3 (variables, grid/flex, media queries)
- JavaScript vanilla
- i18n con archivos JSON (`es` y `en`)
- Three.js para fondo visual del hero

## Estructura del proyecto

```text
cloud-code/
  index.html
  assets/
    styles/
      normalize.css
      styles.css
    js/
      main.js
      lang.js
    i18n/
      es.json
      en.json
    images/
      *.webp, *.svg
    fonts/
      *.woff2
```

## Mejoras aplicadas

- Boton de idioma con icono SVG (sin emojis).
- Hero con mejor jerarquia tipografica, propuesta de valor directa y CTAs mas visibles.
- Portafolio con placeholders claros (`Demo privada`) en lugar de enlaces genericos.
- Mejor presentacion de proyectos con highlights de impacto.
- Ajustes de responsividad movil, contraste, foco visible y navegacion.
- Animaciones mas suaves y respeto de `prefers-reduced-motion`.

## Mejoras futuras

- Integrar formulario de contacto con validacion y backend.
- Agregar casos de estudio reales con enlaces activos.
- Incorporar pruebas visuales y chequeos automáticos de accesibilidad.
- Mejorar SEO tecnico (schema, sitemap, open graph con imagen).
