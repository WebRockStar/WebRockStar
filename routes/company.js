var ParseREST = require('../lib/parse');

// authentication middleware
exports.auth = function(req, res, next) {
	req.WRSUser = null;
	if(req.cookies.WebRockStar) {
		var info = JSON.parse(req.cookies.WebRockStar);
		var parse = ParseREST.connect(info.token);
		parse.getCurrentUser(function(error, response, user, success){
			console.log(info);
			if(info.id != user.objectId || info.email != user.email) {
				console.log("Invalid cookie data! Unsetting user...");
				console.log(user);
				user = null;
			}
			req.WRSUser = user;
			next();	
		});
	}
};

exports.problems = function(req, res){
	res.render('manage_problems', {COMPANY_USER: req.WRSUser ? req.WRSUser.email : null});
};	