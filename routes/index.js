var ParseREST = require('../lib/parse');

exports.index = function(req, res){
	console.log(req.cookies);

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
			res.render('index', {USER: user, DOMAIN: "localhost:3000"});
		});

	}
	else {
		res.render('index', {USER: null, DOMAIN: "localhost:3000"});
	}

};