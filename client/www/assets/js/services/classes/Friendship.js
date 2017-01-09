
/* global angular */

/**
 * Класс Дружба 
 * Хранит информацию о связи пользователя с его друзьями, 
 * например список друзей, куда входит конкретный друг.
 */
angular.module("app")
	.factory("Friendship", [function() {
		
		function Friendship(friendshipData) {
			angular.extend(this, friendshipData);
		}
		
		Friendship.prototype.method = function() {
			
		};
		
		return Friendship;
		
	}]);