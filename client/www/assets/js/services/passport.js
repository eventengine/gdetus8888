
/* global $, angular */

/**
 * Служба для работы с аутентификацией пользователя.
 */
angular.module("app")
	.factory("passport", ["$http", "$rootScope", "$q", function($http, $rootScope, $q) {
		
		function addUserProfileMethods(user) {
			
			user.getHref = function() {
				return this.useruri ? this.useruri : "id" + this.id;
			};
			user.getAvatarHref = function() {
				return this.avatar_id ? "/file/" + this.avatar_id : null;
			};
			user.getAvatarBackgroundHref = function() {
				return this.avatar_bg_id ? "/file/" + this.avatar_bg_id : null;
			};
			
			return user;
		}
		
		return {
			
			/**
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
					return addUserProfileMethods(res.data.user);
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
						return $q.reject(err); // http://goo.gl/T4jKxW
					}
					return addUserProfileMethods(res.data.user);
				}).catch(function(err) {
					console.error(err);
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
	        }
			
		};
		
	}]);