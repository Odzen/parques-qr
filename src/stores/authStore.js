import { writable } from 'svelte/store';
import { firebaseAuth } from '../lib/firebase/firebase.client';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

export const authStore = writable({
	isLoading: true,
	currentUser: null
});

export const authHandlers = {
	login: async (email, password) => {
		await signInWithEmailAndPassword(firebaseAuth, email, password);
	},
	logout: async () => {
		await firebaseAuth.signOut();
	},
	resetPassword: async (email) => {
		if (!email) throw new Error('Email is required');

		await sendPasswordResetEmail(firebaseAuth, email);
	}
};
