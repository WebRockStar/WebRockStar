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
	//deploy the code but doesno't update the code in db.
	//get the data and send it to the backend
	savebtns.click();
	var verifyTestCases = function(testId){
	$.ajax({
		url:'candidate/'+testId,
		type: 'GET',
//		data{
//			ansId : testId
//		},
		success: function(resData){
			console.log("Some result data",resData);
		},error: function(err){
			console.log('Some Error..');
		}
		});	
	};
	$.ajax({
		url:'',
		type:'POST',
		data: {
			test: '1',
			flist: $('#fileList').html()
			},
		success: function(d){
			verifyTestCases(d);
			//send another request to check if the code is tested;
			// verify if the code is tested				
		}
	});
});
$('button.submit-btn').on('click',function(e){
	savebtns.click();
	$.ajax({
		action:'.',
		type: 'POST',
		data: {
			test:'2',
			flist: $('#fileList')
		},
		success: function(d){
			//Send a confirmation message on his registered no.
			}
		});
	});
$('.sql-toggle-btn').on('click',function(e){
	$('.sql-editor').toggleClass('show-editor');
	$('#fileList li').removeClass('active')
	//get user credentials
	//change the mode of
	savebtns.click();
	wrsCE.setValue('');
	wrsCE.setOption('mode','sql');

});
$('.sql-editor .play-button').on('click', function(e){
	//take the query run the query and show the output.
	$.ajax({
		url:'/candidate/mysql',
		type:'POST',
		data:{
			'query':wrsCE.getValue(),
			'user':$('#username').text(),
			'password':$('#password').text()
			},
		success: function(data){
			//show the data in json format, and they can utilize that details.
			if(data.ERR){
				$('#wrs-sqldata').text(data.ERR);
				return;
			}
			//take out keys for theads 
			//run query in the array to generate the table;
			var tableData = '<table class="table table-bordered"><thead><tr>';
			var ks = Object.keys(data.ROWS[0]);
			console.log(ks);
			ks.forEach(function(val){
				tableData += "<th>"+val+"</th>"
				})
			tableData +="</tr></thead><tbody>";
			data.ROWS.forEach(function(val){
				tableData += "<tr>";
				ks.forEach(function(v){
					tableData += "<td>"+val[v]+"</td>";
					})
				tableData += "</tr>";
			});
			tableData+='</tbody></table>';
			$('#wrs-sqldata').html(tableData);

		}
		});
	});
