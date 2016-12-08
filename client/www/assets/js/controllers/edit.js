
"use strict";

/* global angular */

/**
 * Контроллер страницы edit.
 */
angular.module("app", ['ngSanitize', 'daterangepicker', 'ui.select'])
	.controller("EditCtrl", ["$scope", '$sce', function($scope, $sce) {

		$scope.trustAsHtml = function(value) {
			return $sce.trustAsHtml(value);
		};
		
		$scope.genders = [
			{ id: 'male', title: 'мужской' },
			{ id: 'female', title: 'женский' },
			{ id: null, title: 'пол не выбран' }
		];
		
		$scope.user = {
			gender: 'male'
		};

	}]);
