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
 */
angular.module('app').run(['$http', function($http) {
	
	console.log("Проверка авторизации");
	
	
	
	console.log("Авторизация пройдена успешно.");
	document.location = "#/app/dashboard";
	
	console.log("Авторизация не пройдена.");
	document.location = "#/access/login";
	
}]);

