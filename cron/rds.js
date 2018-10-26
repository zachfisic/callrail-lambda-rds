const mysql = require('mysql')
const util = require('util');

const RDS_HOST = process.env.RDS_HOST;
const RDS_USER = process.env.RDS_USER;
const RDS_PASS = process.env.RDS_PASS;
const RDS_DB = process.env.RDS_DB;

// Initiate pool. Credentials should come from config.yml
let pool = mysql.createPool({
	connectionLimit: 100,
	host: RDS_HOST,
	user: RDS_USER,
	password: RDS_PASS,
	database: RDS_DB
});

// Make query async
pool.query = util.promisify(pool.query);


function buildRowsFromJSON(data) {
	let values = [];
	if (data) {
		data.forEach((obj, i, arr) => {
			values.push([...Object.values(obj)])
		});
	}
	return values;
}


module.exports.connect = async (event, context) => {

	try {
		let rowValues = buildRowsFromJSON(event.calls);		
		var response = await pool.query('INSERT IGNORE INTO calls (answered, business_phone_number, customer_city, customer_state, duration, id, start_time, tracking_phone_number, voicemail, company_id, company_name, device_type, first_call, prior_calls, lead_status, source_name, total_calls, medium, referring_url, landing_page_url, last_requested_url, referrer_domain, utm_source, utm_medium, utm_term, utm_content, utm_campaign) VALUES ?', [rowValues], (err, rows, fields) => {
    		if (err) {
    			console.log('sql error ', err)
    			return err;
    		} else {
    			console.log('rows inserted: ', rows.affectedRows)
					context.succeed("done");
    		}
    	});
	}
	catch(e) {
		console.log('error caught from connect ', e);
		return e;
	}
	return {
		"query": response
	}
}
