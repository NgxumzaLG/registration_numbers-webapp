module.exports = function() {
	var storeRegNo = [];
	var checkedTown = [];
	var message = '';
	const regExp1 = /^((CA|CY|CJ|CL)\s([0-9]){6})$/;
	const regExp2 = /^((CA|CY|CJ|CL)\s([0-9]){3}\s([0-9]){3})$/;
	const regExp3 = /^((CA|CY|CJ|CL)\s([0-9]){3}-([0-9]){3})$/;

	function addRegNo(regNo) {
		var regNumber = regNo.toUpperCase();
		if (regNumber !== '') {      
			if (regNumber.match(regExp1) || regNumber.match(regExp2) || regNumber.match(regExp3)) {
				
				if (storeRegNo.length == 0) {
					storeRegNo.push({regNo: regNumber});
					message = 'Registration number has been succcesfully added';

				} else {
					if (!storeRegNo.some(storeRegNo => storeRegNo.regNo === regNumber)){
						storeRegNo.push({regNo: regNumber});
						message = 'Registration number has been succcesfully added';

					} else {
						message = 'Registration number already exists';
                        
					}
				}
			}  
		}
	}

	function regNoAdded() {
		return storeRegNo;

	}

	function getMessage(){
		return message;
	}

	function showRegNo(regTown) {
		checkedTown = [];
		let regCode = '';

		if (regTown === 'capetown') {
			regCode = 'CA';
			
		}  else if (regTown === 'bellville') {
			regCode = 'CY';

		}  else if (regTown === 'paarl') {
			regCode = 'CJ';

		} else if (regTown === 'stellenbosch') {
			regCode = 'CL';

		}

		storeRegNo.forEach(element => {
			if (element.regNo.startsWith(regCode)) {
				checkedTown.push(element.regNo);
				// {regNo: element.regNo}
			}
            
		});
	}

	function showTown() {
		return checkedTown;
	}

	return {
		addRegNo,
		regNoAdded,
		showRegNo,
		showTown,
		getMessage
        
	};
};