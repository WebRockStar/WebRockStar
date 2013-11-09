exports.login = function(req, res,next) {
	//verify sessions//
	
	if(req.query.id=='test'){
		next();
	}else{

		res.render('index', {
			title : 'Wrong password'
		});

	}
	// next();
};

exports.test = function(req, res) {
	// check if the user is loggedin
	console.log(req.query.id);
	res.render('problem', {
		probDesc : 'Some Problem Description',
		fileList : [{
			name : 'routes',
			type : 'folder', //can be folder/file
			children : [{
				name : 'index.js',
				type : 'file',
				mime : 'javascript',
				contents:'exports.index=function(e,t){t.render("index",{title:"Express"})}',
				editable: 'true'
			}]
		}, {
			name : 'views',
			type : 'folder', //can be folder/file
			children : [{
				name : 'index.ejs',
				type : 'file',
				mime : 'xml',
				contents:'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content=""><meta name="author" content=""><link rel="shortcut icon" href="../../docs-assets/ico/favicon.png"><title>Jumbotron Template for Bootstrap</title><link href="/css/bootstrap.css" rel="stylesheet"><link href="/css/style.css" rel="stylesheet"><!--[if lt IE 9]><script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script><script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script><![endif]--></head><body><div class="navbar navbar-inverse navbar-fixed-top" role="navigation"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="#">WebRockStar</a></div><div class="navbar-collapse collapse"><form class="navbar-form navbar-right"><div class="form-group"><input type="text" placeholder="Email" class="form-control"></div><div class="form-group"><input type="password" placeholder="Password" class="form-control"></div><button type="submit" class="btn btn-success">Sign in</button></form></div></div></div><div class="jumbotron"><div class="container"><h1>Hello, world!</h1><p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p><p><a class="btn btn-primary btn-lg" role="button">Learn more &raquo;</a></p></div></div><div class="container"><div class="row"><div class="col-md-4"><h2>Heading</h2><p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p><p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p></div><div class="col-md-4"><h2>Heading</h2><p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p><p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p></div><div class="col-md-4"><h2>Heading</h2><p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p><p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p></div></div><hr><footer><p>&copy;Company 2013</p></footer></div><!-- Bootstrap core JavaScript==================================================--><script src="https://code.jquery.com/jquery-1.10.2.min.js"></script><script src="/js/bootstrap.min.js"></script></body></html>',
				editable: 'false'
			}]
		}, {
			name : 'app',
			type : 'file', //can be folder/file
			mime : 'javascript',
			contents:'exports.index=function(e,t){t.render("index",{title:"Express"})}',
			editable: 'true'
		}, {
			name : 'package.json',
			type : 'file', //can be folder/file
			mime : 'javascript',
			contents:'{name:"WebRockStar",version:"0.0.1","private":true,scripts:{start:"node app.js"},dependencies:{express:"3.3.4",ejs:"*",mysql:"~2.0.0-alpha9"}}',
			editable: 'false'
		}]
	});
};
// example.submit