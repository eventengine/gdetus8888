
"use strict";

/* global angular */

/**
 * Контроллер страницы edit.
 */
angular.module("app", ['ngSanitize', 'daterangepicker', 'ui.select'])
	.controller("EditCtrl", ["$scope", '$sce', function($scope, $sce) {
		
		// Вспомогательная функция для экранирования данных в контрольных элементах формы.
		$scope.trustAsHtml = function(value) {
			return $sce.trustAsHtml(value);
		};
		
		// Болванка для паспорта
		/* $scope.user = passport.getUser(); */
		
		// Имитация профиля пользователя
		$scope.user = {
			gender: null,
			birthdayDateMuted: 'full'
		};
		
		// Справочник поля "Пол пользователя"
		$scope.genders = [
			{ id: 'male', title: 'мужской' },
			{ id: 'female', title: 'женский' },
			{ id: null, title: 'пол не выбран' }
		];
		
		// Справочник поля "параметры отображения даты рождения в профиле"
		$scope.birthdayDateMutedValues = [
			{ id: 'full', title: 'не показывать дату рождения' },
			{ id: 'year', title: 'показывать день и месяц рождения' },
			{ id: 'nothing', title: 'показывать дату рождения' }
		];
		
		

	}]);
