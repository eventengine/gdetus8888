/* ============================================================
 * File: main.js
 * Main Controller to set global scope variables. 
 * ============================================================ */

/* global angular */

angular.module('app')
	.controller('AppCtrl', ['$scope', '$rootScope', '$state', '$http', '$location', 'passport', function($scope, $rootScope, $state, $http, $location, passport) {

		// Глобальные данные приложения.
		$scope.app = {
			name: 'Gdetus 8888',
			description: 'геолокационный сервис',
			author: '#NothingPersonalCorp',
			layout: {
				menuPin: false,
				menuBehind: false,
				theme: 'pages/css/pages.css'
			}
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
		
		$scope.onAppLogoutButtonClick = function() {
			passport.logout().then(function() {
				//$location.path("login");
				$state.go("login");
			});
		};
		
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
	.run(['$http', '$cookies', '$location', '$state', '$rootScope', 'passport', function($http, $cookies, $location, $state, $rootScope, passport) {
		if ($cookies.isAuthenticated == "true") {
			if (!$location.path() || $location.path() == "/") $state.go("app.feed"); //$location.path("/feed");
			passport.getAuthenticated().then(function(authenticated) {
				$rootScope.authenticated = authenticated;
			});
		} else {
			$state.go("login");
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
	
/**
 * html5Mode
 * Включаем, чтобы убрать из URL знак решетки.
 */
angular.module('app')
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}]);
	
