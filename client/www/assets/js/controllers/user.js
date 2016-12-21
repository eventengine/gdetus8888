'use strict';

/* global angular */

angular.module('app').controller('UserCtrl', ['$scope', 'ngMeta', 'user', function($scope, ngMeta, user) {

	// Меняем заголовок страницы на имя пользователя.
	ngMeta.setTitle(user.firstname + " " + user.lastname, "");
	
	$scope.user = user;
	
	$scope.user.avatarBackgroundStyle = {
		backgroundImage: "url(" + user.getAvatarBackgroundHref() + ")",
		transform: "translateY(0px)"
	};

}]);
