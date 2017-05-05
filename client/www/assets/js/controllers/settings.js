"use strict";

/* global angular */

/**
 * Контроллер страницы settings.
 */
angular.module("app", ['ngSanitize', 'daterangepicker', 'ui.select'])
	.controller("SettingsCtrl", ["$scope", '$sce', '$http', 'Notify', 'passport', 'userService',
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
				{ id: 'male', title: 'мужской22' },
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
			
			
			// Справочник поля "родной город"
			$scope.ownCityValues = [
				{ id: 'хрю', title: 'Москва' },
				{ id: 'му', title: 'Новосибирск' },
				{ id: null, title: 'родной город не выбран' }
			];
			
			
			// Справочник поля "семейное положение"
			$scope.releationshipStatusValues = [
				{ id: 'хрю', title: 'всё сложно' },
				{ id: 'му', title: 'ТНН' },
				{ id: 'му2', title: 'есть друг' },
				{ id: 'му3', title: 'есть подруга' },
				{ id: null, title: 'не выбрано' }
			];
			
			// Справочник поля "Кому видна вся моя страница"
			$scope.userpageVisibilities = [
				{ id: 'anybody', title: 'всем' },
				{ id: 'female', title: 'женский' },
				{ id: null, title: 'только мне' }
			];
			
			
			/**
			 * Вспомогательная функция для получения списка полей из контроллера формы form.FormController.
			 * https://code.angularjs.org/1.3.15/docs/api/ng/type/form.FormController
			 * Поля в контроллере формы начинаются не с доллара.
			 */
			function getFormControllerFields(formController) {
				var result = [];
				for (var key in formController) {
					if (key[0] != "$") result.push(key);
				}
				return result;
			}
			
			function parseErrorsToHtml(message, errors) {
	            var result = [];
	            result.push("<div><b>" + message + "</b></div>");
	            result.push("<ul>");
	            errors.forEach(function(error) {
	                result.push("<li>" + (error.value ? "<b>" + error.value + ": " + "</b>" : "") + error.msg + "</li>");
	            });
	            result.push("</ul>");
				return result.join("\n");
	    	}
			
			$scope.onEditMainOptionsButtonClick = function(user, editMainOptionsForm) {
				if (editMainOptionsForm.$valid) {
					
					// Отправляем на сервер значения только полей данной формы.
					// Так как в user содержатся все поля профиля пользователя.
					var data = {};
					getFormControllerFields(editMainOptionsForm).forEach(function(fieldName) {
						data[fieldName] = user[fieldName];
					});
					
					userService.updateUser(user.id, data).then(function() {
						passport.updateAuthenticated().then(function() {
							Notify.info("Данные пользователя обновлены.");
						});
					}).catch(function(err) {
						console.group(err.message);
						console.error(err);
						console.log("Ошибки:", err.errors.length == 1 ? err.errors[0] : err.errors);
						console.log("Ответ сервера:", err.res);
						console.groupEnd();
						Notify.error(
							"<div><b>Ошибки при обновлении формы:</b></div>" + 
							parseErrorsToHtml(err.message, err.errors)
						);
					});
				}
			};
			
		}
	]);