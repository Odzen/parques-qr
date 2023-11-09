import { redirect } from '@sveltejs/kit';
import AuthService from '../../../services/auth/AuthService.js';

export const load = async () => {
	throw redirect(302, '/');
};

export const actions = {
	default({ cookies }) {
		const authService = new AuthService();

		cookies.set(authService.accessTokenCookieName, '', {
			path: '/',
			expires: new Date(0)
		});

		throw redirect(302, '/login');
	}
};
