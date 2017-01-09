'use strict';

/* global angular */

angular.module('app')
	.controller('UserCtrl', ['$rootScope', '$scope', 'ngMeta', 'user', 
		function($rootScope, $scope, ngMeta, user) {
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
			function declOfNum(n, titles) {  
				titles = [].slice.call(arguments, 1);
			    var cases = [2, 0, 1, 1, 1, 2];  
			    return titles[(n % 100 > 4 && n % 100 < 20)? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];  
			}
			
			
			
			$scope.user.getFriends().then(function(friends) {
				$scope.countFriends = (friends.length ? friends.length : "нет") + " " + declOfNum(friends.length, 'друг', 'друга', 'друзей');
				$scope.friends = friends;
			});
			
			refreshFriendButtonVisibility();
			
			function refreshFriendButtonVisibility() {
				$scope.authenticated.hasFriend(user).then(function(hasFriend) {
					$scope.addFriendButtonVisibled = user.id != $scope.authenticated.id && !hasFriend; 
					$scope.removeFriendButtonVisibled = user.id != $scope.authenticated.id && hasFriend;
				});
			}
			
			
			$scope.onAddFriendButtonClick = function(user) {
				$scope.authenticated.addFriend(user).then(refreshFriendButtonVisibility);
			};
			
			
			$scope.onRemoveFriendButtonClick = function() {
				$scope.authenticated.removeFriend(user).then(refreshFriendButtonVisibility);
			};
			
			
			// Определение видимости кнопки Добавить в друзья
			/*$scope.buttonAddFriendVisibled = function() {
				var authenticated = $scope.authenticated;
				return (
					authenticated.hasFriend(user)
						.then(function(hasFriend) { 
							return user.id != authenticated.id && !hasFriend; 
						})
				);
			};*/
			
			// Определение видимости кнопки Удалить из друзей
			/*$scope.buttonRemoveFriendVisibled = function() {
				var authenticated = $scope.authenticated;
				return (
					authenticated.hasFriend(user)
						.then(function(hasFriend) { 
							return user.id != authenticated.id && hasFriend; 
						})
				);
			};*/
		
		}
	]);




