export function splitCodePassport(qrText) {
	console.log('qrText', qrText);

	let code = qrText.split('-')[0];
	let pass = qrText;

	return { code, pass };
}
