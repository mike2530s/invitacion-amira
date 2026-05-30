import { json } from '@sveltejs/kit';
import { GOOGLE_SCRIPT_URL } from '$env/static/private';

// POST: Para guardar un nuevo invitado (se usa en el formulario)
export async function POST({ request }) {
	try {
		const data = await request.json();
		
		const response = await fetch(GOOGLE_SCRIPT_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				fecha: new Date().toLocaleString('es-MX'),
				nombre: data.name,
				asistencia: data.asistencia,
				personas: data.personas
			})
		});

		if (!response.ok) throw new Error('Error de Google Sheets');
		return json({ success: true });

	} catch (error) {
		console.error('Error al enviar RSVP:', error);
		return json({ success: false }, { status: 500 });
	}
}

// GET: Para leer todos los invitados (se usa en el Admin)
export async function GET() {
	try {
		const response = await fetch(GOOGLE_SCRIPT_URL);
		if (!response.ok) throw new Error('Error al leer de Google Sheets');
		
		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Error al leer RSVP:', error);
		return json({ error: 'No se pudieron cargar los datos' }, { status: 500 });
	}
}
