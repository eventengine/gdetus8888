
/* global angular */

/**
 * Сервис (тип: фабрика) для работы с пользователями.
 * Обеспечивает функции: CRUD данных пользователя с сервера, и т.п.
 */
angular.module("app")
	.factory("userService", ["$q", "$http", "UserServiceError", "User", "passport",
		function($q, $http, UserServiceError, User, passport) {
			
			/**
			 * Конструктор службы.
			 */
			function UserService() {
				
			}
			
			/**
			 * Получить пользователя по его id.
			 */
			UserService.prototype.getUserById = function(id) {
				return $http.get("/api/user/id" + id).then(function(res) {
					if (!res.data.success) return $q.reject(new UserServiceError(res));
					return new User(res.data.user);
				});
			};
			
			/**
			 * Обновить данные пользователя по его id.
			 */
			UserService.prototype.updateUser = function(id, data) {
				return $http.post("/api/user/id" + id, data).then(function(res) {
					if (!res.data.success) return $q.reject(new UserServiceError(res));
					return;
				});
			};
			
			/**
			 * Служба оформляется в виде синглтона.
			 */
			return new UserService();
			
		}
	]);