
"use strict";

/* global angular */

/**
 * Класс пользователя.
 */
angular.module("app")
	.factory("User", ["$q", "$http", "ApiService", "HttpError", "Friendship", 
		function($q, $http, ApiService, HttpError, Friendship) {
			
			function User(user) {
				angular.extend(this, user);
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
			
			// Методы для работы со списками друзей, подписок.
			
			User.prototype.loadFriends = function(params) {
				return $http.get("/api/user/" + this.id + "/friends", {
					params: params
				}).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return {
						data: res.data.data,
						total: res.data.total
					};
				}).then(function(data) {
					return {
						data: data.data.map(function(item) {
							return new User(item);
						}),
						total: data.total
					};
				});
			};
			
			User.prototype.createFriendRequest = function(friend) {
				var me = this;
				return $http.post("/api/user/" + me.id + "/friend-requests", { friend: friend.id }).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return res.data;
				});
			};
			
			
			
			
			
			
			
			
			
			
			
			
			
			User.prototype.loadFriendRequestUsers = function(filter) {
				return $http.get("/api/user/" + this.id + "/friend-request-users/" + filter).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return res.data.friendRequestUsers.map(function(user) {
						return new User(user);
					});
				}).then(function(users) {
					return {
						users: users,
						total: users.total
					};
				});
			};
			
			User.prototype.loadFriendship = function(checkedUser) {
				return $http.get("/api/user/" + this.id + "/friendship/" + checkedUser.id).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return res.data.friendship ? new Friendship(res.data.friendship) : null;
				});
			};
			
			User.prototype.hasFriend = function(checkedUser) {
				return this.loadFriends().then(function(data) {
					var hasFriend = false;
					data.friends.forEach(function(friend) {
						hasFriend = hasFriend || friend.id == checkedUser.id;
					});
					return hasFriend;
				});
			};
			
			User.prototype.removeFriend = function(friend) {
				var me = this;
				return $http.delete("/api/user/" + me.id + "/friend/" + friend.id).then(function(res) {
					if (!res.data.success) return $q.reject(new HttpError(res));
					return res.data;
				});
			};
			
			User.prototype.confirmFriend = function(friend) {
				var me = this;
				return ApiService.patch("/user/:user/friendship/:friend/in", {
					user: me.id,
					friend: friend.id,
					data: {
						status: "confirmed"
					}
				});
			};
			
			
			
			
			
			return User;
			
		}
	]);