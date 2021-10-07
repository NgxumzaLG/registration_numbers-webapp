const assert = require('assert');
const regNumberFactory = require('../reg_number-factory');

describe('Registration number exercise' , function(){
	describe('Add registration number' , function(){
		it('Should return "{regNo: "CA 123456"}" once the registration number has been entered from the textbox' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('CA 123456');

			assert.deepEqual([{regNo: 'CA 123456'}], registrationNumber.regNoAdded());
			assert.equal('Registration number has been succcesfully added', registrationNumber.getMessage());

		});
		it('Should return "{regNo: "CL 123-456"}", once the registration number has been entered from the textbox' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('cL 123-456');

			assert.deepEqual([{regNo: 'CL 123-456'}], registrationNumber.regNoAdded());
			assert.equal('Registration number has been succcesfully added', registrationNumber.getMessage());

		});
		it('Should return "{regNo: "CY 123 456"}", once the registration number has been entered from the textbox' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('cy 123 456');

			assert.deepEqual([{regNo: 'CY 123 456'}], registrationNumber.regNoAdded());
			assert.equal('Registration number has been succcesfully added', registrationNumber.getMessage());

		});
		it('Should return an empty array if the registration number format entered is invalid' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('CJ 123456789');

			assert.deepEqual([], registrationNumber.regNoAdded());

		});
	});

	describe('Show registration numbers' , function(){
		it('Should return registration numbers from Cape Town only "CA 123 456 & CA 123456", if Cape Town is the selected town' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('CA 123 456');
			registrationNumber.addRegNo('CA 123456');
			registrationNumber.addRegNo('CJ 123-456');
			registrationNumber.addRegNo('CL 123456');
			registrationNumber.showRegNo('capetown');

			assert.deepEqual([ 'CA 123 456', 'CA 123456' ], registrationNumber.showTown());

		});
		it('Should return registration numbers from Bellville only "CY 123-456 & CY 123-123", if Bellville is the selected town' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('CA 123 456');
			registrationNumber.addRegNo('CY 123-456');
			registrationNumber.addRegNo('CL 123456');
			registrationNumber.addRegNo('CY 123-123');
			registrationNumber.showRegNo('bellville');

			assert.deepEqual([ 'CY 123-456', 'CY 123-123' ], registrationNumber.showTown());

		});
		it('Should return registration numbers from Paarl only "CJ 456 789, CJ 456 456 & CJ 990610", if Paarl is the selected town' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('CJ 456 789');
			registrationNumber.addRegNo('CJ 456 456');
			registrationNumber.addRegNo('CJ 990610');
			registrationNumber.addRegNo('CL 123-123');
			registrationNumber.showRegNo('paarl');

			assert.deepEqual([ 'CJ 456 789', 'CJ 456 456', 'CJ 990610' ], registrationNumber.showTown());

		});
		it('Should return an empty array if there is no registration number from Paarl' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('CA 123 456');
			registrationNumber.addRegNo('CA 123456');
			registrationNumber.addRegNo('CJ 123-456');
			registrationNumber.addRegNo('CY 123456');
			registrationNumber.showRegNo('stellenbosch');

			assert.deepEqual([], registrationNumber.showTown());

		});
	});

	describe('Show the message' , function(){
		it('Should return the message of "Registration number has been succcesfully added" once the registration number has been added' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('CA 123456');

			assert.deepEqual([{regNo: 'CA 123456'}], registrationNumber.regNoAdded());
			assert.equal('Registration number has been succcesfully added', registrationNumber.getMessage());

		});
		it('Should return the message of "Registration number already exists", if the registration number entered already exists' , function(){
			let registrationNumber = regNumberFactory();

			registrationNumber.addRegNo('cL 123-456');
			registrationNumber.addRegNo('CL 123-456');

			assert.deepEqual([{regNo: 'CL 123-456'}], registrationNumber.regNoAdded());
			assert.equal('Registration number already exists', registrationNumber.getMessage());

		});
	});
});