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
	else {
		next();	
	}
};

exports.problems = function(req, res){
	res.render('company_problems', {PAGE: 'company_problems', COMPANY_USER: req.WRSUser ? req.WRSUser.email : null});
};	

exports.invites = function(req, res){
	res.render('company_invites', {PAGE: 'company_invites', COMPANY_USER: req.WRSUser ? req.WRSUser.email : null});
};	

exports.analytics = function(req, res){
	var candidates = [{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'ti.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	},
	{
		id: '123',
		email: 'i.abhi27@gmail.com',
		problemId: '94854',
		problemName: 'Login Page',
		problemDifficultyLevel: '3',
		score: '10',
		attemptedTime: '2013-10-13 4:58 PM GMT',
		submissionTime: '2013-10-13 5:58 PM GMT',
		duration: '59.65',
		solutionId: '45453'
	}];
	res.render('company_analytics', {CANDIDATES: candidates, PAGE: 'company_analytics', COMPANY_USER: req.WRSUser ? req.WRSUser.email : null});
};	