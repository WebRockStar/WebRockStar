/**
 * @author <akash6190[at]gmail[dot] com>
 * @desc contains all the application files
 */

var ce = $('#codeEditor')[0];
CodeMirror.defaults.lineNumbers = true; 
var wrsCE = CodeMirror.fromTextArea(ce);
$('li[data-wrs-mime]').on('click',function(){
	var that = $(this);
	wrsCE.setValue(that.data('wrs-content'));
	wrsCE.setOption('mode',that.data('wrs-mime'));
	wrsCE.setOption('readOnly',!that.data('wrs-editable'));
});
