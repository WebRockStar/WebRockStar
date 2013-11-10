var _WRS_CORE = function() {
	this._ui = new _WRS_UI(this);
	this._user = null;
	console.log("WRS initialized!");
};

_WRS_CORE.prototype.setCurrentUser = function(user) {
	this._user = user;

	if(user) {
		var info = {
			token: user._sessionToken,
			email: user.get("email"),
			id: user.id
		};

		this.setCookie('WebRockStar', JSON.stringify(info));
		console.log("Current user: " + user.get("email"));	
	}
};

_WRS_CORE.prototype.getCurrentUser = function() {
	var user = Parse.User.current();
	this.setCurrentUser(user);
	return user;
};

_WRS_CORE.prototype.login = function(email, pass, successCallback, errorCallback) {

	if(this.getCurrentUser()) {
		this._ui.showError("You are already logged in!");
		errorCallback("Already logged in");
		return;
	}

	var wrs = this;
	Parse.User.logIn(email, pass, {
		success: function(user) {
			wrs.setCurrentUser(user);
			console.log("Log in successful for user: " + user.get("email"));
			wrs._ui.showInfo("Welcome, " + user.get("email") + "!");

			successCallback(user)
		},
		error: function(user, error) {
			console.log("Login failed...");
			console.log(error);

			wrs._ui.showError("Login failed! Please check your credentials or try Signing Up!");
			errorCallback(error);	
		}
	});
};

_WRS_CORE.prototype.register = function(email, pass, successCallback, errorCallback) {
	
	if(this.getCurrentUser()) {
		this._ui.showError("You are already logged in!");
		errorCallback("Already logged in");
		return;
	}

	var wrs = this;
	var user = new Parse.User();
	user.set("username", email);
	user.set("email", email);
	user.set("password", pass);
	user.signUp(null, {
		success: function(user) {
			console.log("User created: " + user.get("email"));
			console.log(user);
			wrs._ui.showInfo("You are registered! Now go ahead and log in.");

			successCallback(user);
		},
		error: function(user, error) {
			console.log("Unable to create user: " + email);
			console.log(error);
			wrs._ui.showError("Looks like the email " + email + " is already registered! Please try logging in or register with a different email.");
			
			errorCallback(error);
		}
	});
};

_WRS_CORE.prototype.logout = function() {
	Parse.User.logOut();
	this.setCookie('WebRockStar','');
	this._user = null;
	console.log("User logged out.");
};

_WRS_CORE.prototype.getCookie = function(name) {	
	console.log("Getting cookie value for: " + name);
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
		return null;
	}

	if ( start == -1 ) return null;

	var end = document.cookie.indexOf( ';', len );
	if ( end == -1 ) end = document.cookie.length;

	return unescape( document.cookie.substring( len, end ) );
};

_WRS_CORE.prototype.setCookie = function(name, value, expires, path, domain, secure) {
	console.log("Setting cookie value for " + name + " with value:" + value);
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}

	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name+'='+escape( value ) +
		( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
		( ( path ) ? ';path=' + path : '' ) + 
		( ( domain ) ? ';domain=' + domain : '' ) +
		( ( secure ) ? ';secure' : '' );
};

_WRS_CORE.prototype.showProblem = function(problemId, modalId) {
	// get problem info
	problemInfo = {
		"title": "Login Page",
		"desc": "WTF",
		"difficulty": "Hard"
	};
	this._ui.showProblemModal(modalId, problemInfo);
};