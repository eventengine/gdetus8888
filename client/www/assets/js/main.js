/* ============================================================
 * File: main.js
 * Main Controller to set global scope variables. 
 * ============================================================ */

/* global angular */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$state', '$http', '$location', function($scope, $rootScope, $state, $http, $location) {

        // App globals
        $scope.app = {
            name: 'Gdetus 8888',
            description: 'геолокационный сервис',
            layout: {
                menuPin: false,
                menuBehind: false,
                theme: 'pages/css/pages.css'
            },
            author: '#NothingPersonalCorp'
        };

        // Checks if the given state is the current state
        $scope.is = function(name) {
            return $state.is(name);
        };

        // Checks if the given state/child states are present
        $scope.includes = function(name) {
            return $state.includes(name);
        };

        // Broadcasts a message to pgSearch directive to toggle search overlay
        $scope.showSearchOverlay = function() {
            $scope.$broadcast('toggleSearchOverlay', {
                show: true
            });
        };
        
        $scope.logout = function() {
	        $http.get("/api/logout")
	        .success(function(data, status, headers, config) {
	            if (data.success) {
	                //document.location = "#/access/login";
	                $location.path("login");
	            } else {
	                onLogoutError(data, status, headers, config);
	            }
	        })
	        .error(function(data, status, headers, config) {
	            onLogoutError(data, status, headers, config);
	        });
        };
        
        function onLogoutError(data, status, headers, config) {
	        alert("Возникли непредвиденные ошибки при отмене авторизации. См. подробности в консоли браузера.");
	        console.error("Возникли непредвиденные ошибки при отмене авторизации.");
	        console.error(status, data);
		}

    }]);


angular.module('app')
    /*
        Use this directive together with ng-include to include a 
        template file by replacing the placeholder element
    */
    
    .directive('includeReplace', function() {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });  
    
/**
 * Первоначальная проверка авторизации пользователя.
 * Проверка куки isAuthenticated на предмет того, был ли авторизован пользователь или нет.
 * Указание страницы для редиректа пользователя по итогу проверки авторизации.
 */
angular.module('app').run(['$http', '$cookies', '$location', function($http, $cookies, $location) {
	console.log("Проверка авторизации");
	if ($cookies.isAuthenticated == "true") {
		console.log("Авторизация пройдена успешно.");
		if (!$location.url()) $location.path("app/home"); // feed
	} else {
		console.log("Авторизация не пройдена.");
		$location.path("login");
	}
}]);


/**
 * accreq-agree-terms
 * Директива валидации контрольного элемента для формы регистрации "Согласен с условиями".
 * https://code.angularjs.org/1.3.15/docs/guide/forms (раздел Custom Validation)
 */
angular.module('app')
	.directive("accreqAgreeTerms", function() {
		return {
			require: "ngModel",
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$validators.accreqAgreeTerms = function(modelValue, viewValue) {
					//if (ctrl.$isEmpty(modelValue)) return true;
					return viewValue;
				};
			}
		};
	});