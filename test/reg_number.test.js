const assert = require('assert');
const regNumberFactory = require('../functions/reg_number-factory');
const {Pool} = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registrations_test';

const pool = new Pool({
	connectionString,
	ssl : {
		rejectUnauthorized:false
	}
});

describe('Registration number exercise' , function(){
	beforeEach(async function(){
		// clean the tables before each test run
		await pool.query('DELETE FROM reg_numbers;');
	});

	it('Should be able to add a registration number to the database', async function(){
		let registrationNumber = regNumberFactory(pool);

		await registrationNumber.addReg('cj 123456');

		assert.deepEqual([{regnumber: 'CJ 123456', town_id: 3}], await registrationNumber.getTable());
	});

	it('Should not add duplicates of registration numbers to the database', async function(){
		let registrationNumber = regNumberFactory(pool);

		await registrationNumber.addReg('cj 123456');
		await registrationNumber.addReg('Cj 123456');
		await registrationNumber.addReg('cA 123456');

		assert.deepEqual([{regnumber: 'CJ 123456', town_id: 3}, {regnumber: 'CA 123456', town_id: 1}], await registrationNumber.getTable());
	});

	it('Should be able to filter registration numbers based on the selected town', async function(){
		let registrationNumber = regNumberFactory(pool);

		await registrationNumber.addReg('Cj 123456');
		await registrationNumber.addReg('cA 123456');

		registrationNumber.selectedTown('capetown');

		assert.deepEqual([{regnumber: 'CA 123456', town_id: 1}], await registrationNumber.filterRegNo('CA'));
	});

	it('Should be able to reset the database', async function(){
		let registrationNumber = regNumberFactory(pool);

		await registrationNumber.addReg('Cj 123  456');
		await registrationNumber.addReg('cA 123 456');

		await registrationNumber.resetData();

		assert.deepEqual([], await registrationNumber.getTable());
	});

	after(function(){
		pool.end();
	});
});

