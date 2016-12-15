
/* global $, angular */

/**
 * Служба создания всплывающих уведомлений (нотификаций) силами фреймворка.
 */
angular.module("app")
	.factory("notification", function() {
		
		function Notify(selector) {
			this.selector = selector || "body";
		}
		
		
		Notify.prototype._noti = function(type, message) {
			$(this.selector).pgNotification({
				style: "flip",
				type: type,
				timeout: 0,
				message: message
			}).show();
		};
		
		
		Notify.prototype.create = function(selector) {
			return new Notify(selector);
		};
		
		Notify.prototype.info = function(message) {
			this._noti("info", message);
		};
		
		Notify.prototype.warning = function(message) {
			this._noti("warning", message);
		};
		
		Notify.prototype.error = function(message) {
			this._noti("error", message);
		};
			
		
		
		
		
		return new Notify(".login-container");
		
		/*function notification(type, selector, message) {
			$(selector || ".login-container").pgNotification({
				style: "flip",
				type: type,
				timeout: 0,
				message: message
			}).show();
		}
		
		return {
			
			info: function(selector, message) {
				if (arguments.length == 1) { message = selector; selector = null; }
				notification("info", selector, message);
			},
			
			warning: function(selector, message) {
				if (arguments.length == 1) { message = selector; selector = null; }
				notification("warning", selector, message);
			},
			
			error: function(selector, message) {
				if (arguments.length == 1) { message = selector; selector = null; }
				notification("error", selector, message);
			}
			
		};*/
		
	});