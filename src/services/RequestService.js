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

	get accessTokenCookieName() {
		return import.meta.env.VITE_SESSION_NAME_TOKEN;
	}

	get basicAuthToken() {
		return btoa(
			`${import.meta.env.VITE_FIREBASE_USERNAME}:${import.meta.env.VITE_FIREBASE_PASSWORD}`
		);
	}

	getAuthPrefix(isBearer = true) {
		return isBearer ? 'Bearer' : 'Basic';
	}

	async _fetch({ url, config = {}, accessToken = '', isBearer = true }) {
		config = {
			validateStatus: null, // Axios resolve all the promises
			...config
		};

		config.headers = { ...this.baseHeaders, ...config.headers };

		if (accessToken)
			config.headers = {
				...config.headers,
				Authorization: `${this.getAuthPrefix(isBearer)} ${accessToken}`
			};

		console.log('url', url);
		console.log('config', config);

		let response = await axios(url, config);

		return response;
	}

	async post({
		endpoint,
		headers = {},
		data = {},
		params = {},
		accessToken = '',
		external = false
	}) {
		const RequestURL = this.URL;
		RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

		let tokenAuth = accessToken;

		if (!accessToken) {
			tokenAuth = this.basicAuthToken;
		}

		const response = await this._fetch({
			url: external ? endpoint : RequestURL.href,
			config: {
				method: 'POST',
				data,
				headers,
				params
			},
			accessToken: tokenAuth,
			isBearer: accessToken.length > 0
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
}
