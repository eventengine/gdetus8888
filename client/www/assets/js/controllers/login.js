
/* global angular */

"use strict";

/**
 * Контроллер страницы ввода логина 
 * и пароля для авторизации пользователя.
 */
 
angular.module("app").controller("LoginCtrl", ["$q", "$scope", "$http", "$location", "$rootScope", "$state", "notification", "passport", function($q, $scope, $http, $location, $rootScope, $state, notification, passport) {

	/**
	 * Обработчик формы авторизации пользователя.
	 */
	$scope.onLoginButtonClick = function(user, loginForm) {
		if (loginForm.$valid) {
			passport.login(user.username, user.password, user.rememberme).then(function(result) {
				if (result.success) {
					$state.go("app.feed");
					passport.getAuthenticated().then(function(authenticated) {
						$rootScope.authenticated = authenticated;
					});
				} else {
					notification.warning(result.message);
				}
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
			passport.passwordRestore(passwordRestore.email).then(function() {
				$scope.passwordRestore.email = "";
				passwordRestoreForm.$setPristine(); // https://code.angularjs.org/1.3.15/docs/api/ng/type/form.FormController
				notification.info("Письмо для восстановления пароля отправлено успешно!");
			}).catch(function(err) {
				notification.error(err.message);
				console.group("Ошибка при отправке формы восстановления пароля пользователя.");
				console.error(err);
				console.log(err.res);
				console.groupEnd();
			});
		}
	};
	
	/**
	 * Обработчик диалога регистрации пользователя.
	 * 
	 */
	$scope.onAccountRequestSendButtonClick = function(user, registerForm) {
		if (registerForm.$valid) {
			$http.post("/api/register", user)
			.success(function(data, status, headers, config) {
				if (data.success) {
					notification.info("Регистрация пройдена успешно!", "#modalAccountRequest");
					registerForm.$setPristine(); // https://code.angularjs.org/1.3.15/docs/api/ng/type/form.FormController
				} else {
	                var message = [];
	                message.push("<b>Внимание, ошибк" + (data.errors.length == 1 ? "а" : "и") + " при регистрации пользователя:</b>");
	                data.errors.forEach(function(error) {
	                    message.push("<li>" + (error.value ? "<b>" + error.value + ": " + "</b>" : "") + error.msg + "</li>");
	                });
					notification.error(message.join("\n"), "#modalAccountRequest");
				}
			})
			.error(function(data, status, headers, config) {
				notification.error("Ошибка при отправке формы. См. подробности в консоли браузера.", "#modalAccountRequest");
				console.error("Ошибка при отправке формы регистрации пользователя.");
				console.error(status, data);
			});
		}
	};
	
}]);


