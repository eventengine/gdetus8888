
/* global angular */

/**
 * Класс пользователя.
 */
angular.module("app")
	.factory("User", [function() {
		
		function User(user) {
			angular.extend(this, user);
		}
		
		User.prototype.getHref = function() {
			return this.useruri ? this.useruri : "id" + this.id;
		};
		
		User.prototype.getAvatarHref = function() {
			return this.avatar_id ? "/file/" + this.avatar_id : null;
		};
		
		User.prototype.getAvatarBackgroundHref = function() {
			return this.avatar_bg_id ? "/file/" + this.avatar_bg_id : null;
		};
		
		return User;
		
	}]);