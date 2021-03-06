
/**
 * Module dependencies.
 */

// load initial configuration
// Setting global Config Value
global.config = require('./lib/config');


var express = require('express') 
  , engine = require('ejs-locals')
  , home = require('./routes')
  , candidate = require('./routes/candidate')
  , company = require('./routes/company')
  , http = require('http')
  , path = require('path');
  

//  , Parse =  require('kaiseki');

//var PARSE_APP_ID = 'J5v0o2xUAaXvxziD26kzLauhmu6oajOKCmnwUMMw'
//  , PARSE_REST_API_KEY='rKw6N9vy6KnlHx9lw6slxgxKcpAFqsvFJmPYl1Cc';

//var parse = new Parse(PARSE_APP_ID,PARSE_REST_API_KEY);
var app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.compress());
app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('WebRockStar is awesome!'));
app.use(express.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/problem',candidate.login2,candidate.probs);
app.get('/', company.auth, home.index);
app.get('/company/problems', company.auth, company.problems);
app.get('/company/invites', company.auth, company.invites);
app.get('/company/analytics', company.auth, company.analytics);
app.get('/ajax/sendinvite', company.sendInviteMail);

app.get('/login', candidate.login);
app.post('/candidate/mysql',candidate.mysql);
app.get('/candidate', candidate.login,candidate.test);
app.post('/candidate',candidate.login,candidate.testfunc);
//Configure application for parse

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
