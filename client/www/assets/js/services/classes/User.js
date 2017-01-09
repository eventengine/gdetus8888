
/* global angular */

/**
 * Класс пользователя.
 */
angular.module("app")
	.factory("User", ["$q", "$http", "HttpError", "Friendship", 
		function($q, $http, HttpError, Friendship) {
			
			function User(user) {
				angular.extend(this, user);
				this.friends = null;
			}
			
			/**
			 * Получить пользователя по его id.
			 * @static
			 */
			User.load = function(id) {
				return $http.get("/api/user/id" + id).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return new User(res.data.user);
				});
			};
			
			/**
			 * Обновить данные пользователя по его id.
			 * @static
			 */
			User.update = function(id, data) {
				return $http.post("/api/user/id" + id, data).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return;
				});
			};
			
			/**
			 * Получить список пользователей.
			 * @static
			 */
			User.all = function() {
				return $http.get("/api/user").then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return res.data.users;
				});
			};
			
			/**
			 * Получить с сервера данные о друзьях пользователя.
			 * @static
			 */
			User.loadFriendData = function(userId) {
				return $http.get("/api/user/" + userId + "/friend").then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return res.data.friends;
				});
			};
			
			/**
			 * Получить с сервера данные о дружбе пользователя.
			 * @static
			 */
			User.getFriendshipData = function(userId) {
				/*return $http.get("/api/user/friend/" + userId).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return res.data.friends;
				});*/
			};
			
			User.prototype.loadFriends = function() {
				return User.loadFriendData(this.id).then(function(data) {
					return data.map(function(item) {
						return new User(item);
					});
				});
			};
			
			User.prototype.getFriends = function() {
				var me = this;
				if (!me.friends) {
					return me.loadFriends().then(function(friends) {
						return me.friends = friends;
					});
				} else {
					return $q.when(me.friends); // https://habrahabr.ru/post/221111/
				}
			};
			
			User.prototype.getFriendship = function() {
				return User.getFriendshipData().then(function(data) {
					return data.map(function(item) {
						return new Friendship(item);
					});
				});
			};
			
			User.prototype.hasFriend = function(checkedUser) {
				return this.getFriends().then(function(friends) {
					var hasFriend = false;
					friends.forEach(function(friend) {
						hasFriend = hasFriend || friend.id == checkedUser.id;
					});
					return hasFriend;
				});
			},
			
			User.prototype.addFriend = function(friend) {
				var me = this;
				return $http.post("/api/user/" + me.id + "/friend/", friend).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					me.friends.push(friend);
					return res.data;
				});
			},
			
			User.prototype.removeFriend = function(friend) {
				var me = this;
				return $http.delete("/api/user/" + me.id + "/friend/" + friend.id).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					me.friends.forEach(function(_friend, index) {
						if (_friend.id == friend.id) delete me.friends[index];
					});
					return res.data;
				});
			},
			
			User.prototype.getCalculatedUseruri = function() {
				return this.useruri ? this.useruri : "id" + this.id;
			};
			
			User.prototype.getAvatarHref = function() {
				return this.avatar_id ? "/file/" + this.avatar_id : "/assets/img/profiles/avatar.jpg";
			};
			
			User.prototype.getAvatarBackgroundHref = function() {
				return this.avatar_preview_id ? "/file/" + this.avatar_preview_id : null;
			};
			
			User.prototype.getCoord = function() {
				return this.location_lat && this.location_lon ? [this.location_lat, this.location_lon] : null;
			};
			
			User.prototype.getFullName = function() {
				return `${this.firstname} ${this.lastname}`;
			};
			
			return User;
			
		}
	]);