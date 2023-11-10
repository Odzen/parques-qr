export function splitCodePassport(qrText) {
	let code = qrText.split('-')[0];
	let pass = qrText;

	return { code, pass };
}
