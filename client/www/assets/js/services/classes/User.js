
/* global angular */

/**
 * Класс пользователя.
 */
angular.module("app")
	.factory("User", [function() {
		
		function User(user) {
			angular.extend(this, user);
		}
		
		User.prototype.getCalculatedUseruri = function() {
			return this.useruri ? this.useruri : "id" + this.id;
		};
		
		User.prototype.getAvatarHref = function() {
			return this.avatar_id ? "/file/" + this.avatar_id : "/assets/img/profiles/avatar.jpg";
		};
		
		User.prototype.getAvatarBackgroundHref = function() {
			return this.avatar_preview_id ? "/file/" + this.avatar_preview_id : null;
		};
		
		User.prototype.getCoord = function() {
			return this.location_lat && this.location_lon ? [this.location_lat, this.location_lon] : null;
		};
		
		User.prototype.getFullName = function() {
			return `${this.firstname} ${this.lastname}`;
		};
		
		return User;
		
	}]);