  var problemJson = {problemDetails:{
	  name:'',
	  desc: '',
	  constraints: '',
	  examples: ''
	  },template:{fileStruct:[],testSet:[]}};

//action to add file
//action to view file
//action to add folder
var currParr = '/';
$('.filestruct-panel').closest('.col-md-9').hide();
var fileStruct = problemJson.template.fileStruct;
$('#wrs-tab-question').on('click','.glyphicon-plus',function(){
//	currParr = $(this).siblings('span.glyphicon-folder-open');
	//set the current folder 
	$(this).closest('li').attr('data-obj-id');
	$('#wrs-tab-question .panel-heading >h4').text()
	$('.filestruct-panel').closest('.col-md-9').show();
});

//get info
var getObjInfo = function() {
	var retVal = {};
	retVal.objid = (Date.now()).toString(36);
	retVal.type = $('[name="wrs-file-type"][checked]').val();
	if(retVal.type == 'file'){
		retVal.mime = $("#wrs-file-mime").val();
		retVal.contents = $("#wrs-file-content").val();
		retVal.editable = $("#wrs-file-editable").val();
	}else {
		retVal.children = []
	}

	retVal.name= $('#wrs-file-name').val()
	return retVal;
}

var addToFolder = function(ob){
	//get current objId
	var tempId = $('#current-obj').attr('data-current-obj-id');
	var ancestors = [] ;

	while(tempId != 'ROOTOBJ'){
		ancestors.push(tempId);
	 tempId = $('#'+tempId).closest("[data-obj-type='folder']").attr('id');
	}
	var tempParent = fileStruct;
	var lastParent = ancestors.pop();
		for(var i=0; i< tempParent.length; i++){
			if(lastParent == tempParent[i].objid){
				tempParent = tempParent[i].children;
				if(lastParent = ancestors.pop()){
					continue;
				}else{
					break;
				}
			}
		}
tempParent.push(ob);


}

var getHtml = function(ob){
	if(ob.type=='file'){
		return '<li ><a href="#"><span class="glyphicon glyphicon-file">'+ob.name+'</span></a></li>';
	}else{
		return '<li data-obj-type="folder" id="'+ob.objid+'"><a href="#"><span class="glyphicon glyphicon-folder-open">'+ob.name+'</span></a><a clas="btn btn-xs btn-danger"><span class="glyphicon glyphicon-plus"></span></a></li><ul class='+ob.objid+'> </ul>';
	}
}
//add Folder to location
//add File to Location
//search for the object in 
$('.filestruct-save').on('click',function(){
	var ob = getObjInfo();
	addToFolder(ob);
	//once added show it on the screen
	//save all the folders
	 $('ul.' + $('#current-obj').attr('data-current-obj-id')).append(getHtml(ob));
	$('.filestruct-panel').closest('.col-md-9').hide();
});

  //<li><a href="#"><span class="glyphicon glyphicon-file">TestCase00</span></a></li>
var testCases = $('#test-case-list')[0];
var counters = {testCase:0}

  $('#new-test-case').on('click',function(e){
	  console.log(counters.testCase)
	  //insert test case in uias will as in json
	  var t = $('<li class="wrs-test-case" data-wrs-case="'+counters.testCase++ +'"><a href="#"><span class="glyphicon glyphicon-file">Test'+ counters.testCase +'</span></a></li>');
	  console.log(counters.testCase);
	  $(testCases).append(t);
	  problemJson.template.testSet[counters.testCase] = {input:[],output:[],targetUrl:'',weight:1}; });
  //this will be added once problemJson.template.testSet has some key value pairs
 $('body').on('click','.wrs-test-case',function(e){
	var that = $(this);
	console.log(that);
	var testSet = problemJson.template.testSet[parseInt(that.attr('data-wrs-case')) +1];
$('.panel-heading h4').text('Test' + (parseInt(that.attr('data-wrs-case'))+1));
$('.panel-heading').attr('data-wrs-case',that.attr('data-wrs-case')); 
$('.rowDelete').click();
testSet.input.forEach(function(val){
	for(var a in val){
		$('#initInput input[type="text"].wrs-key').val(a);
		$('#initInput input[type="text"].wrs-val').val(val[a]).focus();
	}
	});
testSet.input.forEach(function(val){
	for(var a in val){
		$('#initInput input[type="text"].wrs-key').val(a);
		$('#initInput input[type="text"].wrs-val').val(val[a]).focus();
	}
	});
testSet.output.forEach(function(val){
	for(var a in val){
		$('#initOutput input[type="text"].wrs-key').val(a);
		$('#initOutput input[type="text"].wrs-val').val(val[a]).focus();
	}
	});
$('#target-url').val(testSet.targetUrl);
	 }); 
  function addRow(section, initRow) {
    var newRow = initRow.clone().removeAttr('id').addClass('new').insertBefore(initRow),
        deleteRow = $('<a class="rowDelete"><span class="glyphicon glyphicon-trash" > </span></a>');
	initRow.find('input[type="text"]').val('');
  deleteRow.on('click',function(){
	  $(this).closest('div.row.new').remove();
	  }); 
    newRow
        .append(deleteRow)
        .on('click', 'a.rowDelete', function() {
            removeRow(newRow, initRow);
        })
        .slideDown(300, function() {
            $(this)
                .find('input.wrs-key').focus();
        })
}
        
function removeRow(newRow, initRow) {
    newRow
        .slideUp(200, function() {
            $(this)
                .next('div:not(initRow)')
                    .find('input').focus()
                    .end()
                .end()
                .remove();
        });
}

$(function () {
    var initInput = $('#initInput'),
        section = initInput.parent('section');
    
    initInput.on('focus', 'input', function() {
        addRow(section, initInput);
    });
});
$(function () {
    var initOutput = $('#initOutput'),
        section = initOutput.parent('section');
    
    initOutput.on('focus', 'input', function() {
        addRow(section, initOutput);
    });
});

//code to save all the info
$('.test-case-save').on('click', function(){
	var testcaseNo = $('.panel-heading').attr('data-wrs-case');
	var testSet = problemJson.template.testSet[parseInt(testcaseNo)+1];
	testSet.input = [];
	testSet.output = [];
$('#wrs-inp-val div.row').each(function(){
var x = $(this);
var tkey = x.find('.wrs-key').val();
	var t = JSON.parse('{"'+tkey+'":"'+x.find('.wrs-val').val()+'"}')
//	var t = JSON.parse("{"+tkey+":"+x.find('.wrs-val').val()+"}")
	testSet.input.push(t)
	});
	
$('#wrs-out-val div.row').each(function(){
var x = $(this);
var tkey = x.find('.wrs-key').val();
	var t = JSON.parse('{"'+tkey+'":"'+x.find('.wrs-val').val()+'"}')
	//var t = JSON.parse("{'"+tkey+"':'"+x.find('.wrs-val').val()+"'}")	
	testSet.output.push(t);
	});

testSet.targetUrl = $('#target-url').val();
console.log(testSet);
//save problem data

problemJson.problemDetails.name = $('wrs-file-problem')
problemJson.problemDetails.desc = $('wrs-file-problem-statement')
});
