const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const {Pool} = require('pg');

const regNumberFactory = require('./reg_number-factory');

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
	useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registrations';

const pool = new Pool({
	connectionString,
	ssl : {
		rejectUnauthorized:false
	}
});

const app = express();
const registrationNumber = regNumberFactory(pool);

app.use(express.static('public'));

const handlebarSetup = exphbs({
	partialsDir: './views/partials',
	viewPath:  './views',
	layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// initialise session middleware - flash-express depends on it
app.use(session({
	secret : 'flash my mesaages',
	resave: false,
	saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get('/', async function(req, res){
	res.render('index', {
		regNumb: await registrationNumber.getTable()
	});
});

app.post('/action', async function(req, res) {
	if (req.body.enterReg == '') {
		req.flash('info', 'Please enter a registration number');
		
	} else {
		await registrationNumber.addReg(req.body.enterReg);

	}
	res.redirect('/');
});

app.post('/reg_numbers', function(req, res) {
	registrationNumber.selectedTown(req.body.towns);

	res.redirect('reg_numbers');
});

app.get('/reg_numbers',  async function(req,res) {
	let inTown = registrationNumber.getTown();
	if (inTown != '') {
		let displayReg = await registrationNumber.filterRegNo(inTown);
		if (displayReg == []) {
			req.flash('info', 'No Registration number(s) yet');
		}

		res.render('filtered', {displayReg});
	}

	res.render('filtered');
	// console.log(displayReg)
});

app.get('/allTown', function(req, res) {
	res.redirect('/');
});

// app.get('/reg_numbers/:find', async function(req, res) {
// 	let findReg = req.params.find;
// 	console.log(findReg);

// 	res.render('search');
// 	, {
// 		theResult: await registrationNumber.specificReg(findReg)
// 	}
// });

app.get('/reset', async function(req, res) {
	await registrationNumber.resetData();
	
	res.redirect('/');
});

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
	console.log('App starting on port', PORT);
});
