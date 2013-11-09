/**
 * @author <akash6190[at]gmail[dot] com>
 * @desc contains all the application files
 */

var ce = $('#codeEditor')[0];
CodeMirror.defaults.lineNumbers = true;
var wrsCE = CodeMirror.fromTextArea(ce);
// Setting default options:
wrsCE.setOption('lineWrapping',true);
var savebtns = $('button.update-btn')[0];
wrsCE.on('change', function(e) {
	//change the status of
	savebtns.disabled = false;
});
savebtns.onclick = function(){
	$('#fileList li.active').attr('data-wrs-content',wrsCE.getValue()).removeClass('active');
	savebtns.disabled = true;
};
$('li[data-wrs-mime]').on('click', function() {
	//verify if the save button is enabled, if enabled ,as k to save
	if (!savebtns.disabled)
		if(confirm("Do you want to save the file contents")){
			savebtns.click();
		}else{
			return ;
		}
	
		var that = $(this);
		$('#fileList li.active').removeClass('active');
		that.addClass('active');
		wrsCE.setValue(that.attr('data-wrs-content'));
		wrsCE.setOption('mode', that.data('wrs-mime'));
		wrsCE.setOption('readOnly', !that.data('wrs-editable'));
		savebtns.disabled = true;
});
$('button.test-btn').on('click', function(e) {
	//depoy the code but doesno't update the code in db.
});
