
/* global angular */

/**
 * Ошибки службы $http.
 */
angular.module("app")
	.factory("HttpError", [function() {
		
		function HttpError(res) {
			Error.call(this, res.data.message);
			this.errors = res.data.errors;
			this.responce = res;
		}
		
		HttpError.prototype = Object.create(Error.prototype);
		HttpError.prototype.constructor = HttpError;
		
		return HttpError;
		
	}]);