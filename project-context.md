# Contexto del Proyecto: App RSVP "Amira"

## Stack Tecnológico
- Framework Front/Back: SvelteKit
- Lenguaje: TypeScript (<script lang="ts">)
- Estilos: Tailwind CSS
- Base de Datos: Google Sheets API (vía endpoints)

## Arquitectura de Directorios
- `src/routes/+page.svelte`: Landing principal (Layout + Hero + Formulario).
- `src/routes/admin/+page.svelte`: Dashboard de administración.
- `src/routes/api/rsvp/+server.ts`: Endpoint POST para guardar en Google Sheets.
- `src/lib/components/`: Carpeta de componentes de interfaz (Hero.svelte, RsvpForm.svelte).

## Especificaciones de Diseño (UI Tokens)
- Fondo General: `bg-gradient-to-b from-[#E3F2FD] to-[#EDE7F6]`
- Glassmorphism (Tarjetas): `bg-white/50 backdrop-blur-[12px] border border-white/40 shadow-xl rounded-[2rem]`
- Textos: `text-slate-800` para lectura, `text-[#D4AF37]` (Dorado) para acentos.
- Tipografía: `font-playfair` para títulos, `font-montserrat` para cuerpo.
- Botones (CTA): `bg-[#E11D48] text-white rounded-full font-bold shadow-[0_0_15px_rgba(225,29,72,0.4)]`.

## Reglas de Código para el Agente
- Todos los componentes de UI deben crearse en `src/lib/components/`.
- Usa la sintaxis de Svelte 4/5 estándar.
- No uses librerías externas de UI, construye todo con HTML semántico y Tailwind CSS.
