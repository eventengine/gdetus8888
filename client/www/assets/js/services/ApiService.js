
/* global angular */

/**
 * Класс ApiService 
 * Этот сервис отвечает за связь с сервером через его API.
 */
angular.module("app")
	.factory("ApiService", ["$q", "$http", "HttpError", function($q, $http, HttpError) {
		
		function ApiService(friendshipData) {
			angular.extend(this, friendshipData);
		}
		
		ApiService.getResourceUrl = function(resource, params) {
			var result = resource;
			angular.forEach(params, function(value, name) {
				result = result.replace(":" + name, value);
			});
			return "/api" + result;
		};
		
		ApiService.prototype.request = function(method, resource, params) {
			var url = ApiService.getResourceUrl(resource, params);
			var arg1, arg2;
			switch(method) {
				case "post": case "put": case "patch":
					arg1 = params.data || {};
					arg2 = params.config || {};
					break;
				default:
					arg1 = params.config || {};
					break;
			}
			return $http[method](url, arg1, arg2).then(function(res) {
				if (!res.data.success) return $q.reject(new HttpError(res));
				return res.data;
			});
		};
		
		["get", "head", "post", "put", "delete", "jsonp", "patch"].forEach(function(method) {
			ApiService.prototype[method] = function(resource, params) {
				return this.request(method, resource, params);
			};
		});
		
		return new ApiService();
		
	}]);