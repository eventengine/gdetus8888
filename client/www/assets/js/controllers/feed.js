"use strict";

/* global angular */

/**
 * Контроллер страницы feed.
 */
angular.module("app")
	.controller("FeedCtrl", ["$scope", function($scope) {

		$scope.message = "How are you doing today?";

	}]);
