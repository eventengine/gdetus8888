
/* global angular */

'use strict';

/**
 * Контроллер формы ввода логина и пароля для авторизации пользователя.
 */
angular.module('app').controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.onLoginButtonClick = function(user, loginForm) {
		if (loginForm.$valid) {
            $http.post("/api/login", {
                email: user.username,
                password: user.password,
                rememberme: user.rememberme
            })
            .success(function(data, status, headers, config) {
                if (data.success) {
                    document.location = "#/app/dashboard";
                } else {
                    alert("Введен неправильный логин или пароль.");
                }
            })
            .error(function(data, status, headers, config) {
                alert("Ошибка при отправке формы. См. подробности в консоли браузера.");
                console.error("Ошибка при отправке формы авторизации пользователя.");
                console.error(status, data);
            });
		}
	};
}]);