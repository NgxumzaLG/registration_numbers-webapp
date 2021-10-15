module.exports = function(registrationNumber) {

	async function defualt(req, res){
		req.flash('info', registrationNumber.getMessage());

		res.render('index', {
			regNumb: await registrationNumber.getTable(),
			color: registrationNumber.addClass()

		});
	}

	async function action(req, res, next) {
		try {
			await registrationNumber.addReg(req.body.enterReg);

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
			let displayReg = [];
			let color = registrationNumber.addClass();

			if (inTown !== '') {
				displayReg = await registrationNumber.filterRegNo(inTown);

				if (displayReg.length == 0) {
					req.flash('success', 'No Registration number(s) from this town yet');

				} 
			} else {
				req.flash('info', 'Error! town not selected');

			}
			res.render('filtered', {displayReg, color});
            
		} catch (error) {
			next(error);
            
		}
	}

	function allTown(req, res) {
		registrationNumber.clearMessage();

		res.redirect('/');
	}

	async function reset(req, res) {
		await registrationNumber.resetData();

		req.flash('success', 'The database has been succesfully reset!');
		registrationNumber.clearMessage();
        
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