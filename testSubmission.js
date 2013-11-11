//var cwd = process.cwd();
//process.chdir(__dirname);
var MongoClient = require(__dirname + '/node_modules/mongodb').MongoClient;
var ParseREST = require(__dirname+'/lib/parse');
var client = require('webdriverjs').remote({
  desiredCapabilities:{
    cssSelectorsEnabled: true,
    browserName: 'phantomjs'
  }
});
client.init();
var parse = ParseREST.connect();

//get all the test values from mongo db
//this file will be called by the python script hence we need to accept arguments as server name and port
//get all the test values from mongo db
//this file will be called by the python script hence we need to accept arguments as server name and port

//it should be called like this nodejs testSubmission.js <server> <port> <ansId> <quesId> <testSet>
var server_name = '127.0.0.1', //provides which server it is listening to
        server_port = process.argv[3], //provides the info about open port
        answerId = process.argv[4], //provides the info about answer location
        questionId = process.argv[5], //question information
        testSet = process.argv[6]; //this gives info about whith testsuite to run small/big/custom


//the below set will come from mongodb
var testSet = [
{'input':[{'#username':'<asd'},{'#password':'password'}],
'output': [{'#msg':'test'},{'#op':'some message'}],
'weight':1,
'testUrl' : '/',
}];
//start the APP
//Fetch the testcases
process.env.PORT = server_port;
//process.chdir(cwd);
var app = require('/tmp/'+answerId+'/app.js');
//this will start the application
//fetch the testcases for the application
console.log('will call'+server_name+':'+server_port);

parse.getObject("Problem",questionId,function(err,res,body,success){
	var resultJSON = {
		answerId : answerId,
		problemDifficultyLevel: body.problemDifficultyLevel,
		problemId:questionId,
		problemName:body.problemName,
		userEmail:'i.abhi27@gmail.com'};

	var testStatus = new Array();
	testSet.forEach(function(ts,i){
	client.url('http://'+server_name+":"+server_port+ ts.testUrl)
		//var tcid = v.tcid;
		try{
			ts.input.forEach(function(v){
				for(var x in v){
					client.setValue(x,v[x]);
				}
			});
		client.submitForm('form',function(){
			ts.output.forEach(function(j){
				for(var y in j){
					client.getText(y,function(err,val){
						if(val != j[y]){
							testStatus.push({tcid:'','status':'Failed'});
						}
					});

				}
			})
		});
			resultJSON['testCases'] = testStatus;
		
	}catch (e){
		testStatus.push({'tcid':tcid,'status':'Runtime Error..:\'('})
			resultJSON['testCases'] = testStatus;
	//	process.exit(1);
		}
	});
	parse.createObject('Solution',resultJSON,function(err,res,body,success){
		
		});	
	//save data
	//need to store answer as AnswerID
	//process.exit(0);

});
