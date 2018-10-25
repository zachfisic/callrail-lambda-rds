const fetch = require('node-fetch');
const qs = require('query-string');
const util = require('./util.js');

const BASE_URL = 'https://api.callrail.com';
const CALLRAIL_ACCESS_TOKEN = process.env.CALLRAIL_ACCESS_TOKEN
const CALLRAIL_ACCOUNT_ID_1 = process.env.CALLRAIL_ACCOUNT_ID_1


async function getCalls(account, urlParams) {

	let path = `/v2/a/${account}/calls.json`;
	let url = BASE_URL + path;
	if (urlParams) {
		url += '?' + qs.stringify(urlParams);
	}
	let options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token token=${CALLRAIL_ACCESS_TOKEN}`
		}
	};
	try {
		let response = await fetch(url, options);
		let data = await response.json();
		return data;
	}
	catch(err) {
		return err;
	}
}

module.exports.calls = async (event, context) => {

	let { today, yesterday } = util.getTimeframe();

	let urlParams = {
		"start_date": today,
		"end_date": yesterday
	};

	let result = await getCalls(CALLRAIL_ACCOUNT_ID_1, urlParams);
	return result.total_pages;
}