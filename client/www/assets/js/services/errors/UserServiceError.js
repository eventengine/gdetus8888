
/* global angular */

/**
 * Ошибки службы userService.
 */
angular.module("app")
	.factory("UserServiceError", ["HttpError", function(HttpError) {
		
		function UserServiceError() {
			HttpError.apply(this, arguments);
		}
		
		UserServiceError.prototype = Object.create(HttpError.prototype);
		UserServiceError.prototype.constructor = UserServiceError;
		
		return UserServiceError;
		
	}]);