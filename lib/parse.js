var Kaiseki = require('kaiseki');
var APP_ID = "J5v0o2xUAaXvxziD26kzLauhmu6oajOKCmnwUMMw";
var REST_API_KEY = "rKw6N9vy6KnlHx9lw6slxgxKcpAFqsvFJmPYl1Cc";

exports.connect = function(sessionToken) {
	return new Kaiseki(APP_ID, REST_API_KEY, sessionToken);	
};