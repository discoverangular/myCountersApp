// Module dependencies.
var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	morgan = require('morgan'),
	methodOverride = require('method-override'),
	router = require('./server/config/routes'),
	config = require('./server/config/config');

var app = express();

// Connect to database
var db = require('./server/db/mongo').db;

var clientFolder = process.argv[2]?process.argv[2]:'client_step5';

// App Configuration
app.use(express.static(path.join(__dirname, clientFolder)));
app.set('views', __dirname + '/'+clientFolder+'/views'); 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));


// bodyParser should be above methodOverride
// this will let us get the data from a POST
app.use(bodyParser());
// simulate DELETE and PUT
app.use(methodOverride());

//all routes prefixed with /api goes to the api router
app.use(router);

//set our port then launch the server
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
