function createEmployeeRecord(employeeArray) {
	const records = {
		firstName: employeeArray[0],
		familyName: employeeArray[1],
		title: employeeArray[2],
		payPerHour: employeeArray[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
	return records;
}
function createEmployeeRecords(employeeArray) {
	const records = employeeArray.map((data) => createEmployeeRecord(data));
	return records;
}
function createTimeInEvent(dateStamp) {
	let [date, hour] = dateStamp.split(" ");
	this.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(hour, 10),
		date,
	});
	return this;
}
function createTimeOutEvent(dateStamp) {
	let [date, hour] = dateStamp.split(" ");
	this.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(hour, 10),
		date,
	});
	return this;
}
function hoursWorkedOnDate(specificDate) {
	let timeInEvent = this.timeInEvents.find(
		(event) => event.date === specificDate
	);
	let timeOutEvent = this.timeOutEvents.find(
		(event) => event.date === specificDate
	);
	let totalTimeWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
	return parseInt(totalTimeWorked);
}
function wagesEarnedOnDate(specificDate) {
	return parseInt(
		hoursWorkedOnDate.call(this, specificDate) * this.payPerHour.toString()
	);
}
function findEmployeeByFirstName(srcArray, firstName) {
	return srcArray.find((findFirst) => findFirst.firstName === firstName);
}
function calculatePayroll(employeeRecord) {
	let empRecords = employeeRecord.reduce((allInfo, datesRecords) => {
		return allInfo + allWagesFor.call(datesRecords);
	}, 0);
	return parseInt(empRecords);
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

