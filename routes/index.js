var ParseREST = require('../lib/parse');

exports.index = function(req, res){
	res.render('index', {COMPANY_USER: req.WRSUser ? req.WRSUser.email : null});
};	