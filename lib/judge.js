//takes in callback function which is called when port is available
var findLocalPort = function(_cb) {
	var server = require('http').createServer();
	server.listen(0, function() {
		var port = server.address().port;
		server.close();
		_cb(port);
	})
}

exports.judge = function(questionId){
	//get the template
	//deploy the application according to template
	//get the tests and run them
}
