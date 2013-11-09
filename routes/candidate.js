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
				name : 'index',
				type : 'file',
				ext : 'js',
				contents:'indexjs contents',
				editable: 'true'
			}]
		}, {
			name : 'views',
			type : 'folder', //can be folder/file
			children : [{
				name : 'index',
				type : 'file',
				ext : 'ejs',
				contents:'indexejs contents',
				editable: 'false'
			}]
		}, {
			name : 'app',
			type : 'file', //can be folder/file
			ext : 'js',
			contents:'appjs contents',
			editable: 'true'
		}, {
			name : 'package',
			type : 'file', //can be folder/file
			ext : 'json',
			contents:'package.json contents',
			editable: 'false'
		}]
	});
};
