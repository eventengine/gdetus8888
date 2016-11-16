
/* global $, angular */

"use strict";

/**
 * Контроллер формы ввода логина 
 * и пароля для авторизации пользователя.
 */
angular.module("app").controller("LoginCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
	
	$scope.onLoginButtonClick = function(user, loginForm) {
		if (loginForm.$valid) {
			$http.post("/api/login", {
				email: user.username,
				password: user.password,
				rememberme: user.rememberme
			})
			.success(function(data, status, headers, config) {
				if (data.success) {
					$location.path("app/home"); // feed
				} else {
					warning("Внимание! Вы ввели неправильный логин или пароль!");
				}
			})
			.error(function(data, status, headers, config) {
				error("Ошибка при отправке формы. См. подробности в консоли браузера.");
				console.error("Ошибка при отправке формы авторизации пользователя.");
				console.error(status, data);
			});
		}
	};
	
	function warning(message) {
		noti("warning", message);
	}
	
	function error(message) {
		noti("error", message);
	}
	
	function noti(type, message) {
		$(".login-container").pgNotification({
			style: "flip",
			type: type,
			timeout: 0,
			message: message
		}).show();
	}
	
}]);