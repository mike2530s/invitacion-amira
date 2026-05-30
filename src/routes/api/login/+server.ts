import { json } from '@sveltejs/kit';
import { ADMIN_PASSWORD } from '$env/static/private';

export async function POST({ request }) {
	try {
		const { password } = await request.json();
		
		if (password === ADMIN_PASSWORD) {
			return json({ success: true });
		}
		
		return json({ success: false }, { status: 401 });
	} catch (error) {
		return json({ success: false }, { status: 500 });
	}
}
