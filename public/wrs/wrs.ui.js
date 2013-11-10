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


