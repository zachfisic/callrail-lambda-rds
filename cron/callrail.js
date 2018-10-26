const fetch = require('node-fetch');
const qs = require('query-string');
const util = require('./util.js');

const BASE_URI = 'https://api.callrail.com';
const CALLRAIL_ACCESS_TOKEN = process.env.CALLRAIL_ACCESS_TOKEN
const CALLRAIL_ACCOUNT_ID_1 = process.env.CALLRAIL_ACCOUNT_ID_1


// Retrieves calls from API
async function getCalls(uri) {
	let options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token token=${CALLRAIL_ACCESS_TOKEN}`
		}
	};
	try {
		let response = await fetch(uri, options);
		let data = await response.json();
		return data;
	}
	catch (err) {
		console.log('error in calls promise: ', err);
		throw new Error('call promise error');
	}
}

// Builds URI for fetching calls
function buildUri(account, uriParams) {
	let path = `/v2/a/${account}/calls.json`;
	let uri = BASE_URI + path;
	if (uriParams) {
		uri += '?' + qs.stringify(uriParams);
	}
	return uri;
}

// Binds Callrail URI based on account and param settings
function bindUri(account, uriParams) {
	return function(page) {
		if (uriParams && page) {
			uriParams.page = page;
		}
		return buildUri(account, uriParams);
	}
}

// Keeps parallel requests from firing all at once
async function parallelLimit(uris, limit = 10) {
  let inFlight = new Set();
  
  return uris.map(async (uri, i) => {
    // Hold the loop by another loop
    // while the next promise resolves
    while(inFlight.size >= limit) {
      await Promise.race(inFlight);
    }

    let promise = getCalls(uri);
    // Add promise to inFlight Set
    inFlight.add(promise);
    // Delete promise from Set when it is done
    let r = await promise;
    inFlight.delete(promise);
    return r;
  });
};


function transformData(records) {
	let transformed = records.map((obj, i, arr) => {
		delete obj.customer_name;
		delete obj.customer_phone_number;
		delete obj.customer_country;
		delete obj.recording;
		delete obj.recording_duration;
		delete obj.recording_player;
		delete obj.keywords;
		delete obj.direction;

		obj.answered = obj.answered ? 1 : 0;
		obj.voicemail = obj.voicemail ? 1 : 0;
		obj.first_call = obj.first_call ? 1 : 0;

		obj.id = +obj.id;
		obj.duration = +obj.duration;
		obj.prior_calls = +obj.prior_calls;
		obj.company_id = +obj.company_id;
		obj.total_calls = +obj.total_calls;

		obj.business_phone_number = obj.business_phone_number ? parseInt(obj.business_phone_number, 10) : 0;
		obj.tracking_phone_number = obj.tracking_phone_number ? parseInt(obj.tracking_phone_number, 10) : 0;

		obj.customer_city = obj.customer_city || "";
		obj.customer_state = obj.customer_state || "";
		obj.company_name = obj.company_name || "";
		obj.device_type = obj.device_type || "";
		obj.lead_status = obj.lead_status || "";
		obj.source_name = obj.source_name || "";
		obj.medium = obj.medium || "";
		obj.referring_url = obj.referring_url || "";
		obj.landing_page_url = obj.landing_page_url || "";
		obj.last_requested_url = obj.last_requested_url || "";
		obj.referrer_domain = obj.referrer_domain || "";
		obj.utm_source = obj.utm_source || "";
		obj.utm_medium = obj.utm_medium || "";
		obj.utm_term = obj.utm_term || "";
		obj.utm_content = obj.utm_content || "";
		obj.utm_campaign = obj.utm_campaign || "";

		return obj;
	});
	return transformed;
}

module.exports.calls = async () => {

	//let { today, yesterday } = util.getTimeframe();
	let uriParams = {
		"date_range": "today",
		"per_page": 250,
		"fields": "company_id,company_name,device_type,first_call,prior_calls,lead_status,source_name,total_calls,medium,referring_url,landing_page_url,last_requested_url,referrer_domain,utm_source,utm_medium,utm_term,utm_content,utm_campaign"
		// "start_date": today,
		// "end_date": yesterday
	};

	// Bind params for FIRST ROUND of requests.
	buildRbUri = bindUri(CALLRAIL_ACCOUNT_ID_1, uriParams);
	rbUri = buildRbUri();

	// Fetch initial records
	let firstPageResults = await getCalls(rbUri);
	let records = [...firstPageResults.calls];

	// If JSON response has more pages...
	if (firstPageResults.total_pages > 1) {
		remainingUris = [];
		for (let i = 2; i <= firstPageResults.total_pages; i++) {
			remainingUris.push(buildRbUri(i))
		}
		let promises = await parallelLimit(remainingUris, 3);
	  let responses = await Promise.all(promises);
	  responses.forEach((elem, i, arr) => {
	  	let calls = [...elem.calls]
	  	records = records.concat(calls);
	  });
	}
  
  // Coerce data types
  let callData = transformData(records);
  console.log("calls retrieved: ", callData.length);
  return {
  	calls: callData
  }
}
