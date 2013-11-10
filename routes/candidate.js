var os = require('os'), fs = require('fs'), cheerio = require('cheerio'), exec = require('child_process').exec;

exports.login = function(req, res, next) {
	//verify sessions//

	if (req.query.id == 'test') {
		next();
	} else {

		res.render('index', {
			title : 'Wrong password'
		});

	}
	// next();
};

var problemDescription = "Implement authentication module \
<br> <strong>Constraints </strong>: a form to register users ,\
 a form containing user performance \
 Company will provide test case sin the format of input and expected output\
 for eg in case of login we have two steps \
 create a registration form so will provide all various types of combinations of email addresses\
 and expected output as http error codes/ specific error in a divtag";

var template = [{
	objid : '1',
	name : 'routes',
	type : 'folder', //can be folder/file
	children : [{
		objid : '11',
		name : 'index.js',
		type : 'file',
		mime : 'javascript',
		contents : 'exports.index=function(e,t){t.render("index",{title:"Express"})}',
		editable : 'true'
	}]
}, {
	objid : '2',
	name : 'views',
	type : 'folder', //can be folder/file
	children : [{
		objid : '21',
		name : 'index.ejs',
		type : 'file',
		mime : 'xml',
		contents : '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content=""><meta name="author" content=""><link rel="shortcut icon" href="../../docs-assets/ico/favicon.png"><title>Jumbotron Template for Bootstrap</title><link href="/css/bootstrap.css" rel="stylesheet"><link href="/css/style.css" rel="stylesheet"><!--[if lt IE 9]><script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script><script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script><![endif]--></head><body><div class="navbar navbar-inverse navbar-fixed-top" role="navigation"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="#">WebRockStar</a></div><div class="navbar-collapse collapse"><form class="navbar-form navbar-right"><div class="form-group"><input type="text" placeholder="Email" class="form-control"></div><div class="form-group"><input type="password" placeholder="Password" class="form-control"></div><button type="submit" class="btn btn-success">Sign in</button></form></div></div></div><div class="jumbotron"><div class="container"><h1>Hello, world!</h1><p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p><p><a class="btn btn-primary btn-lg" role="button">Learn more &raquo;</a></p></div></div><div class="container"><div class="row"><div class="col-md-4"><h2>Heading</h2><p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p><p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p></div><div class="col-md-4"><h2>Heading</h2><p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p><p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p></div><div class="col-md-4"><h2>Heading</h2><p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p><p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p></div></div><hr><footer><p>&copy;Company 2013</p></footer></div><!-- Bootstrap core JavaScript==================================================--><script src="https://code.jquery.com/jquery-1.10.2.min.js"></script><script src="/js/bootstrap.min.js"></script></body></html>',
		editable : 'true'
	}]
}, {
	objid : '3',
	name : 'app.js',
	type : 'file', //can be folder/file
	mime : 'javascript',
	contents : 'exports.index=function(e,t){t.render("index",{title:"Express"})}',
	editable : 'true'
}, {
	objid : '4',
	name : 'package.json',
	type : 'file', //can be folder/file
	mime : 'javascript',
	contents : '{  "name": "WebRockStar",    "version": "0.0.1",    "private": true,    "scripts": {        "start": "node app.js"    },    "dependencies": {        "express": "3.3.4",        "ejs": "*","ejs-locals": "~1.0.2",	        "mysql": "~2.0.0-alpha9"   }}',
	editable : 'true'
}];
exports.test = function(req, res) {
	// check if the user is loggedin
	console.log(req.query.id);
	if(req.query.ansId){
		//get the details:
		//send the whole details related to all the small testcases
		res.render('testing',{success:});
	}
	res.render('problem', {
		probDesc : problemDescription,
		fileList : template
	});
};

exports.testfunc = function(req, res, next) {
	var tmpId = 'wrs-' + Date.now();
	var tmpPrefix = os.tmpDir() + '/' + tmpId;
	// var cwd = process.cwd();
	fs.mkdirSync(tmpPrefix);
	// fs.writeFileSync(filename, data

	console.log("Create" + tmpPrefix + " and cd into it");
	$ = cheerio.load(req.body.flist);

	var createFiles = function(ft, pt) {
		console.log(ft.editable);
		if (ft.editable == 'true') {
			console.log("fetch the updated data for " + pt + '/' + ft.name + " " + ft.objid);
			fs.writeFileSync(pt + '/' + ft.name, $('li#' + ft.objid).attr('data-wrs-content'));
		} else {
			console.log("create file " + pt + '/' + ft.name);
			fs.writeFileSync(pt + '/' + ft.name, ft.contents);
		}
	};

	var createChildren = function(p, fl) {
		console.log('cd to ' + p);
		fl.forEach(function(v, i) {
			if (v.type == 'folder') {
				console.log('Create folder ' + p + '/' + v.name);
				fs.mkdirSync(p + '/' + v.name);
				createChildren(p + '/' + v.name, p.children);
			} else {
				createFiles(v, p);
			}
		});
		console.log('cd ..');
	};
	for (var f in template) {
		var relPath = tmpPrefix;
		if (template[f].type == 'folder') {
			//create folder template[f].name
			console.log('Create folder ' + relPath + '/' + template[f].name);
			fs.mkdirSync(relPath + '/' + template[f].name);
			createChildren(relPath + '/' + template[f].name, template[f].children);
		} else {
			createFiles(template[f], relPath);
		}
	}
	//send the request, this is to prevent network timeout for long operations.
	//start node js installation and than change current directory back to original
	//have to create a csv based tes
	//make the application ready
	console.log('./getLocalPort.py '+tmpId+" "+req.query.id + " "+req.body.test);
	exec('./getLocalPort.py '+tmpId+" "+req.query.id + " "+req.body.test,function (error, stdout, stderr) {
		/** comment this because testing is taken care by answer Id and results will be updated by the same. **/
		if(!!error || stderr){
			//verify if it is not already saved in the db and then save

			console.log("ERROR::",error);
			console.log("STDOUT::",stdout);
			console.log("STDERR::",stderr);
			//update the result in db as there wull be one script which will be checking 
			//wether the process was complete and also evaluating accordingly
		//Kick off selenium scripts here.
	});
	//fetch all the test cases according to the function and test it.
	res.render('testing', {
		"success" : tmpId
	});
};
// example.submit
