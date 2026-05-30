# Especificaciones de Diseño Estrictas - App RSVP "Amira"

## 1. Estilos Globales (UI Tokens) - USO OBLIGATORIO
- **Fondo General:** `bg-gradient-to-b from-[#E3F2FD] to-[#EDE7F6]`
- **Glassmorphism (Tarjetas):** EXACTAMENTE `bg-white/65 backdrop-blur-[12px] border border-white/30 shadow-xl rounded-3xl`
- **Textos Base:** `text-slate-800`
- **Acentos Dorados:** `text-[#D4AF37]`
- **Tipografía:** - Títulos: `.font-playfair`
  - Cuerpo: `.font-montserrat`
- **Botón Principal (CTA):** EXACTAMENTE `bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] text-white font-bold py-4 rounded-full shadow-[0_0_15px_rgba(167,139,250,0.5)] transition-transform active:scale-95`

## 2. Estructura Exacta de Componentes

### Hero.svelte (Pantalla 1)
- Contenedor principal con la clase Glassmorphism.
- Título principal: "¡Mis 3 años!" (Usa .font-playfair).
- Subtítulo: "¡Te invitamos a celebrar el 3º cumpleaños de nuestra princesita!" (Usa .font-montserrat).
- Cajas de detalles (Fondo blanco semitransparente, bordes redondeados):
  - Caja 1: "24 DE NOVIEMBRE | 3:00 PM"
  - Caja 2: "Palacio de Cristal | C. del Hielo 12, Ciudad"
- Texto suelto: "Trae tu mejor sonrisa y mucha alegría"
- Botón inferior: "Confirmar Asistencia" (Usa la clase Botón Principal).

### FraseEspiritual.svelte (Pantalla 2)
- Contenedor con la clase Glassmorphism.
- Texto centrado y en color dorado (#D4AF37): "'Jesús dijo: dejen que los niños vengan a mí, porque de ellos es el reino de los cielos'"
- Texto inferior: "Celebrando el Cumpleaños de Amira".

### RsvpForm.svelte (Pantalla 3)
- Título: "Confirma asistencia" (.font-playfair, color dorado).
- Input de texto: Placeholder "Tu nombre completo / Escribe tu nombre". Fondo blanco sólido, borde tenue.
- Opciones de asistencia (Radio buttons grandes o tarjetas seleccionables):
  - Opción 1: "Sí, asistiré" (Borde o acento verde esmeralda al seleccionar).
  - Opción 2: "No podré" (Borde o acento rojo suave al seleccionar).
- Selector (Dropdown): "Número de personas / ¿Cuántos vendrán? / 1 Persona".
- Botón de envío: "Enviar confirmación" (Usa la clase Botón Principal).

