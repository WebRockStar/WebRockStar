var _WRS_UI = function(core) {
	this._core = core;
	console.log("WRS UI initialized!");
};

_WRS_UI.prototype.showError = function(msg) {
	alertify.error(msg);
};

_WRS_UI.prototype.showInfo = function(msg) {
	alertify.success(msg);
};

_WRS_UI.prototype.showProblemModal = function(modalId, problemId, problemObject) {
	var problemInfo = problemObject.get("problemDetails");

	$(modalId).find('.problem-title').text(problemInfo.name + ' (' + problemInfo.difficulty + ')');
	$(modalId).find('.problem-desc').text(problemInfo.desc);
	$(modalId).find('.problem-constrains').text(problemInfo.constraints);
	$(modalId).find('.problem-examples').text(problemInfo.examples);
	$(modalId).data('problem-id', problemId);
	$(modalId).modal('show');
};	
