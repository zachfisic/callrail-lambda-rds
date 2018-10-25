const mysql = require('mysql')

const RDS_HOST = process.env.RDS_HOST;
const RDS_USER = process.env.RDS_USER;
const RDS_PASS = process.env.RDS_PASS;
const RDS_DB = process.env.RDS_DB;

// Initiate pool. Credentials should come from config.yml
let pool = mysql.createPool({
	host: RDS_HOST,
	user: RDS_USER,
	password: RDS_PASS,
	database: RDS_DB
});


async function executeQuery(sql, params) {

	// 'await' on pool not (yet) supported.
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			connection.query(sql, params, (err, results) => {
	      if (err){
					reject(err);
	      }
	      connection.release();
	      resolve(results);
	    });
		});
	})
}


module.exports.connect = async (event, context) => {
	let result = {};
  try {
    let sql = "SELECT * FROM calls";
    result = await executeQuery(sql,0);
  } catch (err){
     throw new Error(err);
  }
  return {
  	statusCode: 200,
  	body: JSON.stringify(result)
  };
}
