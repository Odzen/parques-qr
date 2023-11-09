import axios from 'axios';
import RequestError from './RequestError';

const API_URL = import.meta.env.VITE_API_URL;

export default class RequestService {
	constructor() {}

	get URL() {
		return new URL(`${API_URL}`);
	}

	get baseHeaders() {
		return {
			'Content-Type': 'application/json'
		};
	}

	get authPrefix() {
		return 'Bearer';
	}

	get accessTokenCookieName() {
		return import.meta.env.VITE_SESSION_NAME_TOKEN;
	}

	async _fetch({ url, config = {}, accessToken = '' }) {
		config = {
			validateStatus: null, // Axios resolve all the promises
			...config
		};

		config.headers = { ...this.baseHeaders, ...config.headers };

		if (accessToken)
			config.headers = {
				...config.headers,
				Authorization: `${this.authPrefix} ${accessToken}`
			};

		let response = await axios(url, config);

		return response;
	}

	async get({
		endpoint,
		headers = {},
		body = {},
		params = {},
		accessToken = '',
		external = false
	}) {
		const RequestURL = this.URL;
		RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

		const response = await this._fetch({
			url: external ? endpoint : decodeURIComponent(RequestURL.href),
			config: {
				method: 'GET',
				headers,
				body,
				params
			},
			accessToken: accessToken
		});

		const responseData = response.data;

		if (response.status >= 200 && response.status < 300) {
			return responseData;
		} else {
			throw new RequestError({
				status: response.status,
				message: responseData
			});
		}
	}

	async post({
		endpoint,
		headers = {},
		data = {},
		params = {},
		accessToken = {},
		external = false
	}) {
		const RequestURL = this.URL;
		RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

		const response = await this._fetch({
			url: external ? endpoint : RequestURL.href,
			config: {
				method: 'POST',
				data,
				headers,
				params
			},
			accessToken: accessToken
		});

		const responseData = response.data;

		if (response.status >= 200 && response.status < 300) {
			return responseData;
		} else {
			throw new RequestError({
				status: response.status,
				message: responseData
			});
		}
	}

	async put({ endpoint, headers = {}, data = {}, accessToken = {}, external = false }) {
		const RequestURL = this.URL;
		RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

		const response = await this._fetch({
			url: external ? endpoint : RequestURL.href,
			config: {
				method: 'PUT',
				data,
				headers
			},
			accessToken: accessToken
		});

		const responseData = response.data;

		if (response.status >= 200 && response.status < 300) {
			return responseData;
		} else {
			throw new RequestError({
				status: response.status,
				message: responseData
			});
		}
	}

	async patch({ endpoint, headers = {}, data = {}, accessToken = {}, external = false }) {
		const RequestURL = this.URL;
		RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

		const response = await this._fetch({
			url: external ? endpoint : RequestURL.href,
			config: {
				method: 'PATCH',
				data,
				headers
			},
			accessToken: accessToken
		});

		const responseData = response.data;

		if (response.status >= 200 && response.status < 300) {
			return responseData;
		} else {
			throw new RequestError({
				status: response.status,
				message: responseData
			});
		}
	}

	async delete({ endpoint, headers = {}, accessToken = {}, external = false }) {
		const RequestURL = this.URL;
		RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

		const response = await this._fetch({
			url: external ? endpoint : RequestURL.href,
			config: {
				method: 'DELETE',
				headers
			},
			accessToken: accessToken
		});

		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			throw new RequestError({
				status: response.status,
				message: response
			});
		}
	}
}