
"use strict";

/* global angular, DG */

/**
 * Контроллер страницы map.
 */
angular.module("app")
	.controller("MapCtrl", ["$compile", "$scope", "userService", "User", 
		function($compile, $scope, userService, User) {
			
			DG.then(function() {
				
				var map = DG.map("map", {
					"center": [54.98, 82.89],
					"zoom": 13,
					"preferCanvas": true,
					"fullscreenControl": false,
					"zoomControl": true,
					"trackResize": true,
					"geoclicker": true,
					"poi": true
				});
				
				// Содержимое попап-окна следует компилировать после показа на карте.
				map.on("popupopen", function(event) {
					$compile(event.popup.getElement())($scope);
				});

				// Установка карты в местоположение текущего пользователя.
				map.locate({ setView: true }).on('locationerror', function(e) {
					console.error("Определить ваши координаты не удалось.", e.message);
					console.error(e);
				});
				
				// Получение местоположения пользователей и расстановка точек на карте.
				userService.getAllUsers().then(function(users) {
					users.forEach(function(user) {
						user = new User(user);
						var coord = user.getCoord();
						if (coord) {
							var popupAvatarStyle = [
								"height: 32px",
								"margin: 0px 10px 10px 0px", 
								"float: left; width: 32px", 
								"display: inline-block !important", 
								"overflow: hidden; border-radius: 50%", 
								"-webkit-border-radius: 50%", 
								"-moz-border-radius: 50%;"
							];
							var popupAnchorStyle = [
								"color: white",
								"white-space: nowrap"
							];
							DG.marker(coord).addTo(map).bindPopup(`
								<span style="${popupAvatarStyle.join(";")}">
									<a ui-sref="app.user({ useruri: '${user.getCalculatedUseruri()}' })">
										<img src="${user.getAvatarHref()}" alt="" width="32" height="32">
									</a>
								</span>
								<a 
									style="${popupAnchorStyle.join(";")}" 
									ui-sref="app.user({ useruri: '${user.getCalculatedUseruri()}' })">
									${user.getFullName()}
								</a>
								<div style="m-t-5">
									<i class="fa fa-group"></i>&nbsp;
									<i class="pg-social"></i>&nbsp;
									<i class="fa fa-puzzle-piece"></i>
									
								</div>
							`);
						}
					});
				}).catch(function(err) {
					console.log("Ошибка при запросе /api/users данных пользователей.");
					console.log(err);
				});
				
			});
			
			$scope.zoomIn = function() {
				
			};
			
			$scope.zoomOut = function() {
				
			};
			
		}
	]);
	
