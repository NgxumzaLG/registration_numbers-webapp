const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const regNumberFactory = require('./reg_number-factory');


const app = express();

const registrationNumber = regNumberFactory();



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

app.get('/', function(req, res){
	res.render('index', {
		regNumb: registrationNumber.regNoAdded()
	});
});

app.post('/reg_numbers', function(req, res){
	registrationNumber.addRegNo(req.body.enterReg);
	console.log(registrationNumber.regNoAdded());
	res.redirect('/');
});

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
	console.log('App starting on port', PORT);
});
