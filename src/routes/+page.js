import { redirect } from '@sveltejs/kit';

export const prerender = true;

export const load = async () => {
	throw redirect(302, '/login');
};
