
/* global $, angular */

"use strict";

/**
 * Контроллер страницы ввода логина 
 * и пароля для авторизации пользователя.
 */
angular.module("app").controller("LoginCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
	
	function info(message) {
		noti("info", message);
	}
	
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
	
	/**
	 * Обработчик формы авторизации пользователя.
	 */
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
	
	/**
	 * Модель диалога восстановления пароля пользователя.
	 */
	$scope.passwordRestore = {
		email: ""
	};
	
	/**
	 * Обработчик диалога восстановления пароля пользователя.
	 */
	$scope.onPasswordRestoreButtonClick = function(passwordRestore, passwordRestoreForm) {
		if (passwordRestoreForm.$valid) {
			$http.post("/api/passrestore", {
				email: passwordRestore.email
			})
			.success(function(data, status, headers, config) {
				if (data.success) {
					info("Письмо для восстановления пароля отправлено успешно!");
					$scope.passwordRestore.email = "";
					passwordRestoreForm.$setPristine(); // https://code.angularjs.org/1.3.15/docs/api/ng/type/form.FormController
				} else {
					error(data.message);
				}
			})
			.error(function(data, status, headers, config) {
				error("Ошибка при отправке формы. См. подробности в консоли браузера.");
				console.error("Ошибка при отправке формы авторизации пользователя.");
				console.error(status, data);
			});
		}
	};
	
}]);


