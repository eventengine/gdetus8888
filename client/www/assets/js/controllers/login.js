
/* global angular, $ */

"use strict";

/**
 * Контроллер страницы ввода логина 
 * и пароля для авторизации пользователя.
 */
 
angular.module("app")
	.controller("LoginCtrl", ["$q", "$scope", "$http", "$location", "$rootScope", "$state", "Notify", "passport",
		function($q, $scope, $http, $location, $rootScope, $state, Notify, passport) {
		
			var notify = new Notify(".login-container");
			var modalAccountRequestNotify = new Notify("#modalAccountRequest");
		
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
							notify.warning(result.message);
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
						notify.info("Письмо для восстановления пароля отправлено успешно!");
					}).catch(function(err) {
						notify.error(err.message);
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
				
		    	function toHtml(message, errors) {
		            var result = [];
		            result.push("<div><b>" + message + "</b></div>");
		            result.push("<ul>");
		            errors.forEach(function(error) {
		                result.push("<li>" + (error.value ? "<b>" + error.value + ": " + "</b>" : "") + error.msg + "</li>");
		            });
		            result.push("</ul>");
					return result.join("\n");
		    	}
				
				if (registerForm.$valid) {
					passport.accountRequest(user).then(function() {
						registerForm.$setPristine(); // https://code.angularjs.org/1.3.15/docs/api/ng/type/form.FormController
						$("#modalAccountRequest").modal("hide");
						notify.info("Регистрация пройдена успешно!");
					}).catch(function(err) {
						console.group(err.message);
						console.error(err);
						console.log("Ошибки:", err.errors.length == 1 ? err.errors[0] : err.errors);
						console.log("Ответ сервера:", err.res);
						console.groupEnd();
						modalAccountRequestNotify.error(toHtml(err.message, err.errors));
					});
				}
			};
			
		}
		
//angular.module("app") {hbjb};
		
		
		
	]);