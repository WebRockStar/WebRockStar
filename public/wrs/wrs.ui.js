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

_WRS_UI.prototype.showProblemModal = function(modalId, problemInfo) {
	$(modalId).find('.modal-title').text(problemInfo.title + ' (' + problemInfo.difficulty + ')');
	$(modalId).find('.modal-body').text(problemInfo.desc);
	$(modalId).modal('show');
};	
