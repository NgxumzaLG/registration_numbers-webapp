module.exports = function(registrationNumber) {

	async function defualt(req, res){
		res.render('index', {
			regNumb: await registrationNumber.getTable()

		});
	}

	async function action(req, res, next) {
		try {
			if (req.body.enterReg == '') {
				req.flash('info', 'Please enter a registration number');
                
			} else {
				await registrationNumber.addReg(req.body.enterReg);
        
			}
    
			res.redirect('/');
            
		} catch (error) {
			next(error);
            
		}
	}

	function regNumbersPost(req, res, next) {
		try {
			registrationNumber.selectedTown(req.body.towns);
    
			res.redirect('/reg_numbers');
            
		} catch (error) {
			next(error);
            
		}
	}

	async function regNumbersGet(req, res, next) {
		try {
			let inTown = registrationNumber.getTown();
			let displayReg = await registrationNumber.filterRegNo(inTown);

			if (displayReg.length == 0) {
				req.flash('info', 'No Registration number(s) yet');

			} 
			res.render('filtered', {displayReg});
            
		} catch (error) {
			next(error);
            
		}
	}

	function allTown(req, res) {

		res.redirect('/');
	}

	async function reset(req, res) {
		await registrationNumber.resetData();
        
		res.redirect('/');
	}

	return {
		defualt,
		action,
		regNumbersPost,
		regNumbersGet,
		allTown,
		reset

	};
};