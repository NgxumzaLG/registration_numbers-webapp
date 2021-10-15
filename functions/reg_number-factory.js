module.exports = function(data) {
	const pool =  data;
	let regCode = '';
	var message = '';
	const regExp1 = /^((CA|CY|CJ|CL)\s([0-9]){6})$/;
	const regExp2 = /^((CA|CY|CJ|CL)\s([0-9]){3}\s([0-9]){3})$/;
	const regExp3 = /^((CA|CY|CJ|CL)\s([0-9]){3}-([0-9]){3})$/;

	function getMessage(){
		return message;
	}

	function selectedTown(regTown) {
		regCode = '';

		if (regTown === 'capetown') {
			regCode = 'CA';
			
		}  else if (regTown === 'bellville') {
			regCode = 'CY';

		}  else if (regTown === 'paarl') {
			regCode = 'CJ';

		} else if (regTown === 'stellenbosch') {
			regCode = 'CL';

		}
	}

	async function addReg(reg) {
		if (reg !== '') {
			let regNo = reg.toUpperCase();
			let strReg = regNo.substring(0,2);

			if (regNo.match(regExp1) || regNo.match(regExp2) || regNo.match(regExp3)) {
				const getRow = await pool.query('SELECT * FROM reg_towns WHERE code = $1', [strReg]);
				const getCode = getRow.rows;
				const refId = getCode[0].id;

				await regCheck(regNo, refId);
			}else {
				message = 'Error! Invalid registration number format entered';

			}
		} else {
			message = 'Error! Registration number not entered';

		}
	}

	async function regCheck(theReg, theId) {
		const regDuplicates = await pool.query('SELECT * FROM reg_numbers WHERE regNumber = $1', [theReg]);

		if (regDuplicates.rows.length == 0) {
			await pool.query('INSERT INTO reg_numbers (regNumber, town_id)  VALUES ($1, $2)', [theReg, theId]);
			message = 'Registration number has been succcesfully added';

		} else {
			message = 'Registration number already exists';

		}
	}

	async function getTable() {
		const theTable = await pool.query('SELECT regNumber, town_id FROM reg_numbers');

		return theTable.rows;
	}

	async function filterRegNo(useTown) {
		if (useTown != '') {
			const townCode = useTown;
			const getRow = await pool.query('SELECT * FROM reg_towns WHERE code = $1', [townCode]);
			const getTown = getRow.rows;
			const refId = getTown[0].id;

			const getFiltered = await pool.query('SELECT regNumber, town_id FROM reg_numbers WHERE town_id = $1', [refId]);

			return getFiltered.rows;
		} else {
			message = 'Error! town not selected';
			return [];

		}
	}

	function getTown() {
		return regCode;
	}

	async function resetData() {
		return pool.query('DELETE FROM reg_numbers');
	}

	function addClass() {
		if (message == 'Registration number has been succcesfully added') {
			return 'proceed';

		} else {
			return 'error';

		}
	}

	function clearMessage() {
		message = '';
	}

	return {
		selectedTown,
		getMessage,
		addReg,
		regCheck,
		getTable,
		filterRegNo,
		getTown,
		resetData,
		addClass,
		clearMessage
        
	};
};