const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const {Pool} = require('pg');

const regNumberFactory = require('./functions/reg_number-factory');
const regRoutes = require('./routes/reg-routes');

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
const registrationRoutes = regRoutes(registrationNumber);

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

app.get('/', registrationRoutes.defualt);

app.post('/action', registrationRoutes.action);

app.post('/reg_numbers', registrationRoutes.regNumbersPost);

app.get('/reg_numbers', registrationRoutes.regNumbersGet);

app.get('/allTown', registrationRoutes.allTown);

app.get('/reset', registrationRoutes.reset);

// app.get('/reg_numbers/:find', async function(req, res) {
// 	let findReg = req.params.find;
// 	console.log(findReg);

// 	res.render('search');
// 	, {
// 		theResult: await registrationNumber.specificReg(findReg)
// 	}
// });

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
	console.log('App starting on port', PORT);
});
