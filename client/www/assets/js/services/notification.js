
/* global $, angular */

/**
 * Служба создания всплывающих уведомлений силами фреймворка.
 */
angular.module("app")
	.factory("notification", function() {
		
		function notification(type, selector, message) {
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
			
		};
		
	});