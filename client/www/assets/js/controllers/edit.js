
"use strict";

/* global angular */

/**
 * Контроллер страницы edit.
 */
angular.module("app", ['ngSanitize', 'daterangepicker', 'ui.select'])
	.controller("EditCtrl", ["$scope", '$sce', 'passport', function($scope, $sce, passport) {
		
		// Вспомогательная функция для экранирования данных в контрольных элементах формы.
		$scope.trustAsHtml = function(value) {
			return $sce.trustAsHtml(value);
		};
		
		passport.getAuthenticated().then(function(user) {
			$scope.user = user;
		});
		
		// Справочник поля "Пол пользователя"
		$scope.genders = [
			{ id: 'male', title: 'мужской' },
			{ id: 'female', title: 'женский' },
			{ id: null, title: 'пол не выбран' }
		];
		
		// Справочник поля "параметры отображения даты рождения в профиле"
		$scope.birthdayDateMutedValues = [
			{ id: 'full', title: 'не показывать дату рождения' },
			{ id: 'year', title: 'показывать день и месяц' },
			{ id: 'nothing', title: 'показывать дату рождения' }
		];
		
		// Справочник поля "страна"
		$scope.ownCountryValues = [
			{ id: 'хрю', title: 'хрю' },
			{ id: 'му', title: 'му' },
			{ id: null, title: 'родная страна не выбрана' }
		];
		
		$scope.onEditMainOptionsButtonClick = function(user, editMainOptionsForm) {
			if (editMainOptionsForm.$valid) {
				alert("Пробуем отправить данные на сервер")
			}
		};
		
	}]);