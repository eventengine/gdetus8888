/* ============================================================
 * File: main.js
 * Main Controller to set global scope variables. 
 * ============================================================ */

/* global angular */



/*

возможно вместо 
$location.path("login");
надо использовать
$state.go("login");

*/


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
		
		$scope.gotoUserPage = function(user) {
			
		};

    }]);

/**
 * include-replace
 * Use this directive together with ng-include to include a 
 * template file by replacing the placeholder element
 */
angular.module('app')
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
angular.module('app')
	.run(['$http', '$cookies', '$location', function($http, $cookies, $location) {
		console.log("Проверка авторизации");
		if ($cookies.isAuthenticated == "true") {
			console.log("Авторизация пройдена успешно.");
			if (!$location.url()) $location.path("/feed"); // feed
		} else {
			console.log("Авторизация не пройдена.");
			$location.path("login");
		}
	}]);
    
/**
 * Загрузка данных аутентифицированного пользователя.
 */
angular.module('app')
	.run(['$rootScope', '$http', function($rootScope, $http) {
		$http.get("/api/user/authenticated")
		.success(function(data, status, headers, config) {
			if (data.success) {
				$rootScope.authenticated = data.user;
			} else {
				console.error("Ошибка при загрузке данных аутентифицированного пользователя.");
				console.error(status, data);
			}
		})
		.error(function(data, status, headers, config) {
			console.error("Ошибка при загрузке данных аутентифицированного пользователя.");
			console.error(status, data);
		});
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