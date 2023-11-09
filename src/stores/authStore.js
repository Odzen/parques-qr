import { writable } from 'svelte/store';
import { firebaseAuth } from '../lib/firebase/firebase.client';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export const authStore = writable({
	isLoading: true,
	currentUser: null
});

export const authHandlers = {
	signup: async (email, password) => {
		await createUserWithEmailAndPassword(firebaseAuth, email, password);
	},
	logout: async () => {
		await firebaseAuth.signOut();
	},
	resetPassword: async (email) => {
		await sendPasswordResetEmail(firebaseAuth, email);
	}
};
