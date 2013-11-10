var ParseREST = require('../lib/parse');
var email = require('../lib/email');

// authentication middleware
exports.auth = function(req, res, next) {
	req.WRSUser = null;
	if(req.cookies.WebRockStar) {
		var info = JSON.parse(req.cookies.WebRockStar);
		var parse = ParseREST.connect(info.token);
		parse.getCurrentUser(function(error, response, user, success){
			if(error) {
				console.log(error);
				next();
				return;
			}
			console.log(info);
			console.log(user);
			if(user && (info.id != user.objectId || info.email != user.email)) {
				console.log("Invalid cookie data! Unsetting user...");
				console.log(user);
				user = null;
			}
			req.WRSUser = user;
			next();	
		});
	}
	else {
		next();	
	}
};

exports.problems = function(req, res){
	res.render('company_problems', {PAGE: 'company_problems', COMPANY_USER: req.WRSUser ? req.WRSUser.email : null});
};	

exports.sendInviteMail = function(req, res) {
	var inviteId = req.param('inviteId');
	var parse = ParseREST.connect();
	console.log(inviteId);
	parse.getObject('Invite', inviteId, function(error, response, body, success) {
		console.log(error);
		console.log(body);
		var mailOptions = {
		    from: "WebRockStar <admin@arkene.com>", 
		    to: body.email, 
		    subject: "WebRockStar: Invitation for a challenge!", 
		    html: "Howdy, <br/>You have been invited to take a web developer programming challenge on the WebRockStar platform. To proceed, simply click <a href='http://ec2-54-251-31-4.ap-southeast-1.compute.amazonaws.com:3000/candidate?id=" + inviteId + "'>here</a>.<br/>Regards,<br/>WebRockStar"
		}

		email.transport.sendMail(mailOptions, function(error, response){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + response.message);
		        return "ok";
		    }
		});
	});
};

exports.invites = function(req, res){
	var parse = ParseREST.connect();
	parse.getObjects('Problem', function(error, response, problems, success) {
		var EASY_PROBLEMS=[], MODERATE_PROBLEMS=[], HARD_PROBLEMS=[];
		if(error) {
			console.log(error);
			problems= [];
		}
		console.log(problems);

		for(var i=0; i<problems.length; i++){
			if(!problems[i].hasOwnProperty('problemDetails')) {
				continue;
			}
			if(problems[i].problemDetails.difficulty == 'HARD') {
				HARD_PROBLEMS.push({id:problems[i].objectId, name:problems[i].problemDetails.name});
			}
			if(problems[i].problemDetails.difficulty == 'MODERATE') {
				MODERATE_PROBLEMS.push({id:problems[i].objectId, name:problems[i].problemDetails.name});
			}
			if(problems[i].problemDetails.difficulty == 'EASY') {
				EASY_PROBLEMS.push({id:problems[i].objectId, name:problems[i].problemDetails.name});
			}
		}

		parse.getObjects('Invite', function(error, response, invites, success) {
			if(error) {
				invites = [];
			}
			console.log(invites);

			res.render('company_invites', {
					EASY_PROBLEMS: EASY_PROBLEMS, 
					MODERATE_PROBLEMS: MODERATE_PROBLEMS,
					HARD_PROBLEMS: HARD_PROBLEMS,
					PAGE: 'company_invites', INVITES: invites, COMPANY_USER: req.WRSUser ? req.WRSUser.email : null});
			
		})
	});

};	

exports.analytics = function(req, res){
	var parse = ParseREST.connect();
	parse.getObjects('Solution', function(error, response, candidates, success) {
		if(error) {
			console.log(error);
			candidates = [];
		}
		console.log(candidates);
		res.render('company_analytics', {CANDIDATES: candidates, PAGE: 'company_analytics', COMPANY_USER: req.WRSUser ? req.WRSUser.email : null});
	});
};	