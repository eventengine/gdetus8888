/* ============================================================
 * File: main.js
 * Main Controller to set global scope variables.
 * ============================================================ */

/* global angular */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

        // App globals
        $scope.app = {
            name: 'gdetus',
            description: 'геолокационный сервис для SMM-хулиганов',
            layout: {
                menuPin: false,
                menuBehind: false,
                theme: 'pages/css/pages.css'
            },
            author: 'корпорация #НичегоЛичного'
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
angular.module('app').run(['$http', '$cookies', function($http, $cookies) {
	console.log("Проверка авторизации");
	
	/*
		TODO 
		http://metanit.com/web/angular/4.2.php
		Наверное стоит переделать переход на другую страницу. 
		Вместо конструкции document.location = использовать следующее:
		Кроме того, здесь также устанавливается зависимость для сервиса $location. 
		Данный сервис нужен нам для перехода по определенному маршруту. 
		Переход осуществляется с помощью метода $location.path([маршрут])
	 */
	
	
	if ($cookies.isAuthenticated == "true") {
		console.log("Авторизация пройдена успешно.");
		document.location = "#/app/dashboard";
	} else {
		console.log("Авторизация не пройдена.");
		document.location = "#/access/login";
	}
}]);

