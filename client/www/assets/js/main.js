/* ============================================================
 * File: main.js
 * Main Controller to set global scope variables. 
 * ============================================================ */

/* global angular */

/**
 * Глобальные данные приложения.
 */
angular.module('app')
	.constant("appData", {
		name: '#gdetus',
		description: 'геолокационный сервис для SMM-хулиганов',
		author: '#NothingPersonalCorp',
		layout: {
			menuPin: false,
			menuBehind: false,
			theme: 'pages/css/pages.css'
		}
	});

/**
 * Настройка и запуск модуля ng-meta.
 */
angular.module('app')
	.config(['ngMetaProvider', '$stateProvider', 'appData', function (ngMetaProvider, $stateProvider, appData) {
		$stateProvider.decorator('data', ngMetaProvider.mergeNestedStateData);
		ngMetaProvider.useTitleSuffix(true);
		ngMetaProvider.setDefaultTitle(appData.name);
		ngMetaProvider.setDefaultTitleSuffix(' | ' + appData.name);
	}])
	.run(['ngMeta', function(ngMeta) { 
		ngMeta.init();
	}]);

/**
 * Глобальный контроллер приложения.
 */
angular.module('app')
	.controller('AppCtrl', ['$scope', '$rootScope', '$state', '$http', '$location', 'passport', 'appData', 
		function($scope, $rootScope, $state, $http, $location, passport, appData) {

			// Глобальные данные приложения.
			$scope.app = appData;
	
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
			
			// 
			$scope.onAppLogoutButtonClick = function() {
				passport.logout().then(function() {
					//$location.path("login");
					$state.go("login");
				});
			};
			
		}
	]);

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
			/*passport.getAuthenticated().then(function(authenticated) {
				$rootScope.authenticated = authenticated;
			});*/
			passport.updateAuthenticated();
		} else {
			$state.go("login");
		}
	}]);


/**
 * Обработчики событий $stateChangeStart, $stateChangeError.
 * Перед началом маршрутизации в ui-router проверяем аутентификацию пользователя (она 
 * могла в любой момент поменяться на сервере, поэтому перед маршрутизацией нужна актуальная ее копия).
 * В обработчике события $stateChangeError ловим ошибку проверки аутентификации 
 * и в случае провала переходим на страницу login.
 * Схема обработки взята из: http://erraticdev.blogspot.ru/2015/10/angular-ngroute-routing-authorization.html
 */
angular.module('app')
	.run(['$q', '$state', '$rootScope', 'passport', function($q, $state, $rootScope, passport) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
			if (!toState.data || !toState.data.isPublic) {
				toState.resolve = toState.resolve || {};
				if (!toState.resolve.authenticationResolver) {
					toState.resolve.authenticationResolver = [function() {
						/*return passport.getAuthenticated().then(function(authenticated) {
							$rootScope.authenticated = authenticated;
							return authenticated;
						});*/
						return passport.updateAuthenticated();
					}];
				}
			}
		});
		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, err) {
			if (err.isAuthenticationError) $state.go("login");
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
	
/**
 * html5Mode
 * Включаем, чтобы убрать из URL знак решетки.
 */
angular.module('app')
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}]);
	




