export function validateEmailPattern(email) {
	let emailMatch = email.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

	if (emailMatch) return { message: 'Email válido', isValid: true };
	else return { message: 'Escribe una dirección de correo válida', isValid: false };
}

export function validateString(
	value,
	minLength = 3,
	maxLength = 50,
	required = false,
	successMessage = 'valor válido'
) {
	if (value && value.length > 0) {
		if (value.length < minLength)
			return {
				message: `Mínimo ${minLength} caracteres`,
				isValid: false
			};
		else if (maxLength && value.length > maxLength)
			return {
				message: `Máximo ${maxLength} caracteres`,
				isValid: false
			};

		return {
			message: successMessage,
			isValid: true
		};
	}

	return required
		? { message: 'Este valor es obligatorio', isValid: false }
		: { message: successMessage, isValid: true };
}
