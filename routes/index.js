var ParseREST = require('../lib/parse');

exports.index = function(req, res){
	res.render('home', {PAGE: 'home', COMPANY_USER: req.WRSUser ? req.WRSUser.email : null});
};	