const AWS = require('aws-sdk');
const fetchCalls = require('./callrail.js').calls;

const REGION = process.env.REGION;
const lambda = new AWS.Lambda({  
  region: REGION
});


module.exports.run = async (event, context) => {
	try {
			let callObj = await fetchCalls();
			
			let params = {
				FunctionName: 'cron-dev-connect',
				InvocationType: 'RequestResponse',
				LogType: 'Tail',
				Payload: JSON.stringify(callObj)
			};
			let mysqlData = await lambda.invoke(params).promise()
				.then((res) => { console.log('response', res); return res; })
				.catch((err) => { console.log('error caught', err); return err; });
			return mysqlData;
	} catch(err) {
		console.log(err);
		return err;
	}
};
