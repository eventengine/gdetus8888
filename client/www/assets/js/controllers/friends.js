
"use strict";

/* global angular */

/**
 * Контроллер страницы friends.
 */
angular.module("app")
	.controller("FriendsCtrl", ["$q", "$scope", function($q, $scope) {

		$q.all([
			$scope.authenticated.loadFriends(),
			$scope.authenticated.loadFriendRequestUsers("in"),
			$scope.authenticated.loadFriendRequestUsers("out")
		]).then(function(result) {
			$scope.friends = result[0].friends;
			$scope.inFriendRequestUsers = result[1].users;
			$scope.outFriendRequestUsers = result[2].users;
		});
		
		$scope.removeFriend = function(user) {
			var $index = this.$index;
			$scope.authenticated.removeFriend(user).then(function() {
				$scope.friends.splice($index, 1);
			});
		};
		
		$scope.unsubscribeFriend = function(user) {
			var $index = this.$index;
			$scope.authenticated.removeFriend(user).then(function() {
				$scope.outFriendRequestUsers.splice($index, 1);
			});
		};
		
		$scope.confirmFriend = function(user) {
			var $index = this.$index;
			$scope.authenticated.confirmFriend(user).then(function() {
				$scope.inFriendRequestUsers.splice($index, 1);
			});
			$scope.friends.push(user);
		};
		
	}]);