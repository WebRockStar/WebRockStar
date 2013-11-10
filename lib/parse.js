var Kaiseki = require('kaiseki');
var APP_ID = "FySKlmI271DtIh7G0LVjtPBPLIYN2S7mVEu5BlCi";
var REST_API_KEY = "CUN0Q0CPFVHhMKfGD4Sd5L10kuD3L1DmSmx3fOYQ";

exports.connect = function(sessionToken) {
	return new Kaiseki(APP_ID, REST_API_KEY, sessionToken);	
};