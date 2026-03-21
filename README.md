# Franco Castro — Desarrollador Full Stack

Portafolio personal en [fcastro.dev](https://fcastro.dev). Dark brutalist aesthetic con Screaming Architecture.

## Stack

- **Astro 6** — Framework, output estatico
- **React 18** — Islas interactivas
- **TypeScript** — Strict mode
- **Tailwind CSS 3** — Utilidades via PostCSS
- **React Spring** — Animaciones fluidas

## Requisitos

- Node.js 22+
- npm

## Inicio rapido

```bash
git clone https://github.com/FrancoCastro1990/landing.git
cd landing
npm install
npm run dev
```

## Comandos

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de produccion (dist/) |
| `npm run preview` | Preview del build |

## Arquitectura

Screaming Architecture — el codigo esta organizado por feature de negocio, no por capa tecnica.

```
src/
  app/
    types.ts              Interfaces TypeScript para toda la data del portafolio
    data.ts               Fuente unica de verdad — todos los datos personales y contenido
    index.ts              Barrel: re-exporta data y tipos
  features/
    hero/                 Hero principal (titular serif, badge)
    navigation/           Header con glassmorphism, menu mobile
      hooks/              useHeaderVisibility, useMobileMenu, useNavigation
    about/                Bio, stats animados, chips de tecnologias
    experience/           Timeline laboral con tonal layering
    projects/             Grid de proyectos con cards
    contact/              CTA con email y links sociales
    layout/               Footer
    background/           Animacion de red de nodos (canvas)
    theme-customizer/     Personalizador de colores con presets
  shared/
    ui/                   Componentes reutilizables (Card, Button, Badge, Reveal, SectionTitle)
    hooks/                useScrollProgress, useScrollReveal, useCountUp
    styles/               global.css (Tailwind directives, fonts)
  pages/
    index.astro           Pagina unica, importa datos y pasa props a todas las islas
```

**Datos centralizados:** Todo el contenido personal (nombre, email, experiencia, proyectos, skills, URLs) vive en `src/app/data.ts`. Los componentes son pura logica de rendering — reciben datos via props. Para actualizar contenido, solo editar `data.ts`.

Cada feature exporta a traves de un barrel file (`index.ts`). Los imports usan path aliases: `@features/*`, `@shared/*`, `@app/*`.

## Islas Astro

Los componentes React se hidratan selectivamente:

```
client:load     Header (siempre interactivo)
client:idle     NodeNetwork, ThemeCustomizer (se hidratan cuando el browser esta idle)
client:visible  Hero, About, Experience, Projects, Contact (lazy, al entrar en viewport)
(ninguno)       Footer (estatico, sin JavaScript)
```

## Sistema de diseno

**Dark mode unico** — fondo negro puro `#000`, sin tema claro.

- **Tipografia:** Newsreader (italic serif) para titulares, Manrope (sans-serif) para cuerpo
- **Color primario:** Amarillo `#FACC15` sobre negro
- **Bordes:** 0px en todo (brutalist). Solo `rounded-full` para pills
- **Separadores:** Sin lineas divisorias — se usan cambios de fondo (tonal layering)
- **Labels:** Siempre uppercase con tracking amplio
- **Nav:** Glassmorphism (`bg-surface-low/80 backdrop-blur-xl`)

Los tokens de color estan en CSS custom properties (`global.css`) y mapeados en `tailwind.config.cjs`. El Theme Customizer permite cambiar colores en runtime con persistencia en localStorage.

## SEO y accesibilidad

- Meta tags: Open Graph, Twitter Card, canonical URL
- Structured data: JSON-LD (Person schema)
- Sitemap automatico via `@astrojs/sitemap`
- `robots.txt`
- Imagen OG (`public/og-image.png`, 1200x630)
- Landmarks semanticos: `header`, `main`, `footer`, `nav`
- Jerarquia de headings: h1 > h2 > h3
- Focus indicators en todos los elementos interactivos
- Cierre con Escape en menus y modales
- `aria-live` en estadisticas animadas
- `prefers-reduced-motion` respetado

## Deploy

El sitio se despliega automaticamente en **Vercel** al pushear a `main`. Output estatico, sin servidor.

## Contacto

- Web: [fcastro.dev](https://fcastro.dev)
- Email: franco.castro.villanueva.90@gmail.com
- GitHub: [FrancoCastro1990](https://github.com/FrancoCastro1990)
- LinkedIn: [Franco Castro Villanueva](https://www.linkedin.com/in/franco-castro-villanueva-035905174/)

## Licencia

MIT
