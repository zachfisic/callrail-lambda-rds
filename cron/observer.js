const AWS = require('aws-sdk');

const REGION = process.env.REGION;
const lambda = new AWS.Lambda({  
  region: REGION
});

module.exports.notify = (event, context) => {
	let params = {
		FunctionName: 'cron-dev-run',
		InvocationType: 'Event'
	}
	lambda.invoke(params, (err, data) => {
		if (err) {
			callback(err)
		} else {
			callback(null, data);
		}
	});
};