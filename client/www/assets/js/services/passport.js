
/* global angular */

/**
 * Служба для работы с аутентификацией пользователя.
 */
angular.module("app")
	.factory("passport", ["$http", "$rootScope", "$q", "User", function($http, $rootScope, $q, User) {
		
		return {
			
			/**
			 * DEPRECATED (перенесено в userService в планах, но не реализовано)
			 * Получить данные пользователя по его id или useruri.
			 * Если по id, то в формате id<номер>.
			 */
			getUserByIdOrUseruri: function(id) {
				return $http.get(`/api/user/${id}`).then(function(res) {
	        		if (!res.data.success) {
						var err = new Error(res.data.message);
						err.errors = res.data.errors;
						err.res = res;
						return $q.reject(err); // http://goo.gl/T4jKxW
					}
					return new User(res.data.user);
				});
			},
			
			/**
			 * Получить данные аутентифицированного пользователя.
			 */
			getAuthenticated: function() {
				return $http.get("/api/user/authenticated").then(function(res) {
					if (!res.data.success) {
						var err = new Error("Ошибка при загрузке данных аутентифицированного пользователя.");
						err.res = res;
						err.isAuthenticationError = true;
						return $q.reject(err); // http://goo.gl/T4jKxW
					}
					return new User(res.data.user);
				});
			},
			
			/**
			 * Обновить данные аутентифицированного пользователя в глобальном $rootScope.
			 */
			updateAuthenticated: function() {
				return this.getAuthenticated().then(function(authenticated) {
					$rootScope.authenticated = authenticated;
					return authenticated;
				});
			},
			
			login: function(login, password, rememberme) {
				return $http.post("/api/login", {
					email: login,
					password: password,
					rememberme: rememberme
				}).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.error(err);
				});
			},
			
			logout: function() {
		        return $http.get("/api/logout").then(function(res) {
					if (!res.data.success) {
						var err = new Error("Ошибка при отмене аутентификации пользователя.");
						err.res = res;
						return $q.reject(err); // http://goo.gl/T4jKxW
					}
					return;
		        }).catch(function(err) {
					console.error(err);
				});
	        },
	        
	        passwordRestore: function(email) {
				return $http.post("/api/passrestore", {
					email: email
				}).then(function(res) {
					if (!res.data.success) {
						var err = new Error(res.data.message);
						err.res = res;
						return $q.reject(err); // http://goo.gl/T4jKxW
					}
					return;
				});
	        },
	        
	        accountRequest: function(user) {
	        	return $http.post("/api/register", user).then(function(res) {
	        		if (!res.data.success) {
						var err = new Error(res.data.message);
						err.errors = res.data.errors;
						err.res = res;
						return $q.reject(err); // http://goo.gl/T4jKxW
					}
					return;
	        	});
	        },
	        
	        isAuthenticated: function() {
	        	
	        },
	        
	        isAuthorized: function() {
	        	
	        }
			
		};
		
	}]);