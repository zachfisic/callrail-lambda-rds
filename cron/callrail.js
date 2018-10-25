const fetch = require('node-fetch');
const qs = require('query-string');
const util = require('./util.js');

const BASE_URI = 'https://api.callrail.com';
const CALLRAIL_ACCESS_TOKEN = process.env.CALLRAIL_ACCESS_TOKEN
const CALLRAIL_ACCOUNT_ID_1 = process.env.CALLRAIL_ACCOUNT_ID_1



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
	catch(err) {
		return err;
	}
}


function buildUri(account, uriParams) {
	let path = `/v2/a/${account}/calls.json`;
	let uri = BASE_URI + path;
	if (uriParams) {
		uri += '?' + qs.stringify(uriParams);
	}
	return uri;
}


function bindUri(account, uriParams) {
	return function(page) {
		if (uriParams && page) {
			uriParams.page = page;
		}
		return buildUri(account, uriParams);
	}
}


async function parallelLimit(uris, limit = 10) {
  let inFlight = new Set();
  
  return uris.map(async (uri, i) => {
    // Hold the loop by another loop
    // while the next promise resolves
    while(inFlight.size >= limit) {
      await Promise.race(inFlight);
    }
    
    console.log(`STARTING ROUND->${i} SIZE->${inFlight.size}`);

    const promise = getCalls(uri);

    // Add promise to inFlight Set
    inFlight.add(promise);
    // Delete promise from Set when it is done
    await promise;
    inFlight.delete(promise);

    console.log(`ENDING ROUND->${i} SIZE->${inFlight.size}`);
  });
};



module.exports.calls = async (event, context) => {

	let { today, yesterday } = util.getTimeframe();

	let dateParams = {
		"start_date": today,
		"end_date": yesterday
	};

	buildRbUri = bindUri(CALLRAIL_ACCOUNT_ID_1, dateParams);
	rbUri = buildRbUri();

	let firstPageResults = await getCalls(rbUri);
	
	remainingUris = [];
	for (let i = 2; i <= firstPageResults.total_pages; i++) {
		remainingUris.push(buildRbUri(i))
	}

	let promises = await parallelLimit(remainingUris, 3);
  let results = await Promise.all(promises);

  return results.length;
}
