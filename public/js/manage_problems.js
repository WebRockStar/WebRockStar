  var problemJson = {problemDetails:{
	  name:'',
	  desc: '',
	  constraints: '',
	  examples: ''
	  },template:{fileStruct:[],testSet:[]}};


  //<li><a href="#"><span class="glyphicon glyphicon-file">TestCase00</span></a></li>
var testCases = $('#test-case-list');
var counters = [testCase:0,]
  $('#new-test-case').on('click',function(){
	  //insert test case in uias will as in json
	  testCases.append('<li><a href="#"><span class="glyphicon glyphicon-file">Test'+ counter.testCase++ +'</span></a></li>');
	  problemJson.templates.testSet.push({id: counter.testCase, value: {}});
	  });
  //this will be added once problemJson.template.testSet has some key value pairs
  
  function addRow(section, initRow) {
    var newRow = initRow.clone().removeAttr('id').addClass('new').insertBefore(initRow),
        deleteRow = $('<a class="rowDelete"><img src="images/delete.png"></a>');
   
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


