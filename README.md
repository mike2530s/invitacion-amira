# ❄️ Invitación Mágica Interactiva - Amira's 3rd Birthday

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Sheets](https://img.shields.io/badge/Google_Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)

Una aplicación web moderna y altamente interactiva desarrollada con **SvelteKit** para gestionar las invitaciones y confirmaciones de asistencia (RSVP) de una fiesta de cumpleaños infantil. 

Diseñada con un enfoque "Mobile-First", esta app no solo es una invitación digital bonita con temática de hielo/Frozen, sino un sistema completo de gestión de invitados.

## ✨ Características Principales

* **🎨 UI/UX Premium:** Diseño moderno utilizando *Glassmorphism*, gradientes suaves, sombras complejas y tipografías elegantes (Great Vibes, Playfair Display, Montserrat).
* **💫 Animaciones Fluidas:** Implementación de la **View Transitions API** nativa del navegador para transiciones suaves entre pantallas, complementada con efectos de partículas de nieve ambiental creadas con CSS puro.
* **📝 Flujo RSVP Dinámico:** Formulario de confirmación paso a paso con validación de datos, estados de carga (loading) y manejo de errores de red.
* **📊 Panel de Administración Secreto:** Ruta `/admin` protegida por contraseña para los organizadores de la fiesta.
* **📈 Base de Datos Serverless:** Integración con **Google Sheets** a través de Google Apps Script como base de datos en tiempo real, totalmente gratuita y fácil de usar para el cliente.
* **📥 Exportación de Datos:** Capacidad de descargar la lista de invitados confirmados en formato CSV directamente desde el dashboard de administración.

## 🛠️ Arquitectura Técnica

El proyecto utiliza SvelteKit como framework full-stack:
* **Frontend:** Componentes reactivos Svelte 5 (`$state`, `$derived`), Tailwind CSS para el estilizado y animaciones CSS optimizadas.
* **Backend (API Routes):** Endpoints server-side (`+server.ts`) para actuar como proxy seguro entre el frontend y la base de datos, ocultando credenciales y evitando problemas de CORS.
* **Almacenamiento:** Google Apps Script configurado para recibir y servir datos en formato JSON desde una hoja de cálculo.

## 🚀 Instalación y Ejecución Local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/mike2530s/invitacion-amira.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tus variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto basándote en la configuración necesaria:
   ```env
   GOOGLE_SCRIPT_URL=tu_url_de_google_apps_script
   ADMIN_PASSWORD=tu_contraseña_segura
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 🔐 Seguridad
Las credenciales sensibles (como la URL del endpoint de Google y la contraseña de administrador) están manejadas de forma segura a través de variables de entorno privadas (`$env/static/private`) y validadas del lado del servidor, asegurando que ningún dato confidencial sea expuesto en el código cliente.

---
*Desarrollado con ♥️ para crear momentos inolvidables.*
