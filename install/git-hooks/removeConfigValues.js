// Fetch and store the config values in configValues
var configValues = require('./config');
/**
 * removes all the string values from the JSON passed
 */
removeValues =function(test) {
	if(typeof test == 'string'){
		return '';
	}
	for(i in test){
		if(typeof test[i] == 'object'){
			test[i] = removeValues(test[i]);
		}else if(typeof test[i] == 'string'){
			test[i]='';
		}
	}
	return test;
};

removeValues(configValues);

/**
 * Save the newly generated config file to the system.
 */


//This will convert the JSON into a pretty JSON string
process.stdout.write(JSON.stringify(configValues,null,4));
