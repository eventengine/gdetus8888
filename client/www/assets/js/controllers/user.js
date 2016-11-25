'use strict';

/* global angular */

angular.module('app')
    .controller('UserCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {

    	console.log($stateParams.id)

    }]);
