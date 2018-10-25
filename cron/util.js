// Returns values for start and end times for query
module.exports.getTimeframe = (setting) => {

	// Determine how much to remove from ISO string
	// "2018-01-01"
	let sliceNum = -14;
	
	// "2018-01-01T05:00"
	if (setting === 'hour') {		
		sliceNum = -8;
	}

	let today = new Date();
	let yesterday = new Date(today);
	let oneWeekAgo = new Date(today);
	let thirtyDaysAgo = new Date(today);

	yesterday.setDate(today.getDate() - 1);
	oneWeekAgo.setDate(today.getDate() - 7);
	thirtyDaysAgo.setDate(today.getDate() - 30);

	today = today.toISOString().slice(0, sliceNum)
	yesterday = yesterday.toISOString().slice(0, sliceNum);
	oneWeekAgo = oneWeekAgo.toISOString().slice(0, sliceNum);
	thirtyDaysAgo = thirtyDaysAgo.toISOString().slice(0, sliceNum);

	return { today, yesterday, oneWeekAgo, thirtyDaysAgo };
}