
"use strict";

/* global angular */

/**
 * Контроллер страницы edit.
 */
angular.module("app", ['ngSanitize', 'daterangepicker', 'ui.select'])
	.controller("EditCtrl", ["$scope", '$sce', '$http', 'Notify', 'passport', 'userService',
		function($scope, $sce, $http, Notify, passport, userService) {
			
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
				{ id: null, title: 'показывать дату рождения' }
			];
			
			// Справочник поля "страна"
			$scope.ownCountryValues = [
				{ id: 'хрю', title: 'хрю' },
				{ id: 'му', title: 'му' },
				{ id: null, title: 'родная страна не выбрана' }
			];
			
			$scope.onEditMainOptionsButtonClick = function(user, editMainOptionsForm) {
				if (editMainOptionsForm.$valid) {
					userService.updateUser(user.id, user).then(function() {
						passport.updateAuthenticated().then(function() {
							Notify.info("Данные пользователя обновлены.");
						});
					}).catch(function(err) {
						console.group(err.message);
						console.error(err);
						console.log("Ошибки:", err.errors.length == 1 ? err.errors[0] : err.errors);
						console.log("Ответ сервера:", err.res);
						console.groupEnd();
						Notify.error("Обновить данные не удалось. См. консоль браузера.");
					});
				}
			};
			
		}
	]);