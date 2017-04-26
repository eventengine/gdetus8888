'use strict';

/* global angular */

angular.module('app')
	.controller('UserCtrl', ['$scope', 'ngMeta', 'user', 
		function($scope, ngMeta, user) {
			$scope.user = user;
			
			// Меняем заголовок страницы на имя пользователя.
			ngMeta.setTitle(user.firstname + " " + user.lastname, "");
			
			// Подстановка аватара на фон.
			$scope.user.avatarBackgroundStyle = {
				backgroundImage: "url(" + user.getAvatarBackgroundHref() + ")",
				transform: "translateY(0px)"
			};
			
			
			// Склонение числительных.
			// http://htmler.ru/2013/11/22/sklonenie-chislitelnah-na-javascript/
			function numeralDecline(n, titles) {  
				titles = [].slice.call(arguments, 1);
			    var cases = [2, 0, 1, 1, 1, 2];  
			    return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];  
			}
			
			
			
			
			
			$scope.user.loadFriends({
				limit: 6
			}).then(function(result) {
				var friends = result.data;
				var countFriends = result.total;
				$scope.countFriends = (countFriends ? countFriends : "ещё нет") + " " + numeralDecline(countFriends, 'друг', 'друга', 'друзей');
				$scope.friends = friends;
			});
			
			
			refresh();
			
			function refresh() {
				$scope.authenticated.loadFriendship(user).then(function(friendship) {
					$scope.friendship = friendship;
				});
			}
			
			
			$scope.onAddFriendButtonClick = function(user) {
				$scope.authenticated.createFriendRequest(user).then(refresh);
			};
			
			
			$scope.onRemoveFriendButtonClick = function() {
				$scope.authenticated.removeFriend(user).then(refresh);
			};
			
			$scope.getAddFriendButtonVisibled = function(status) {
				return user.id != $scope.authenticated.id && !$scope.friendship;
			};
			
			$scope.getRemoveFriendButtonVisibled = function(status) {
				return user.id != $scope.authenticated.id && $scope.friendship && $scope.friendship.status == status;
			};
			
		}
		
	]);