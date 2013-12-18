var Kaiseki = require('kaiseki');
var APP_ID = config.ext.parse.APP_ID;
var REST_API_KEY = config.ext.parse.REST_API_KEY;

exports.connect = function(sessionToken) {
	return new Kaiseki(APP_ID, REST_API_KEY, sessionToken);	
};