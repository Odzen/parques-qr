import RequestService from '../RequestService.js';

export default class PassportsService extends RequestService {
	constructor() {
		super();
	}

	getValidatePassportPath() {
		return `/validarPasaporte`;
	}

	getInfoPassportPath() {
		return `/infoPasaporte`;
	}

	getCancelTransactionPath() {
		return `/cancelarTransaccion`;
	}

	async infoPassport({ code, pass }) {
		if (!code) throw new Error('code is required in PassportsService.infoPassport');

		if (!pass) throw new Error('pass is required in PassportsService.infoPassport');

		let requestBody = {};

		requestBody['code'] = code;
		requestBody['pass'] = pass;

		return await this.post({
			endpoint: this.getInfoPassportPath(),
			data: requestBody
		});
	}

	async validatePassport({ code, pass, email }) {
		if (!code) throw new Error('code is required in PassportsService.infoPassport');

		if (!pass) throw new Error('pass is required in PassportsService.infoPassport');

		if (!email) throw new Error('email is required in PassportsService.infoPassport');

		let requestBody = {};

		requestBody['code'] = code;
		requestBody['pass'] = pass;
		requestBody['email'] = email;

		return await this.post({
			endpoint: this.getValidatePassportPath(),
			data: requestBody
		});
	}

	async cancelTransaction({ code, pass, email }) {
		if (!code) throw new Error('code is required in PassportsService.infoPassport');

		if (!pass) throw new Error('pass is required in PassportsService.infoPassport');

		if (!email) throw new Error('email is required in PassportsService.infoPassport');

		let requestBody = {};

		requestBody['code'] = code;
		requestBody['pass'] = pass;
		requestBody['email'] = email;

		return await this.post({
			endpoint: this.getCancelTransactionPath(),
			data: requestBody
		});
	}
}
