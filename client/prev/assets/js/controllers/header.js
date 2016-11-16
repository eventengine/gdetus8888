
/* global angular */

'use strict';

/**
 * Контроллер Header.
 */
angular.module('app').controller('HeaderCtrl', ['$scope', '$http', function($scope, $http) {
	
	function onLogoutError(data, status, headers, config) {
        alert("Возникли непредвиденные ошибки при отмене авторизации. См. подробности в консоли браузера.");
        console.error("Возникли непредвиденные ошибки при отмене авторизации.");
        console.error(status, data);
	}
	
	
	$scope.onLogoutButtonClick = function() {
        $http.get("/api/logout")
        .success(function(data, status, headers, config) {
            if (data.success) {
                document.location = "#/access/login";
            } else {
                onLogoutError(data, status, headers, config);
            }
        })
        .error(function(data, status, headers, config) {
            onLogoutError(data, status, headers, config);
        });
	};
}]);