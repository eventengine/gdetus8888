
/* global $, angular */

/**
 * Служба создания всплывающих уведомлений силами фреймворка.
 */
angular.module("app")
	.factory("notification", function() {
		
		function notification(type, message, selector) {
			$(selector || ".login-container").pgNotification({
				style: "flip",
				type: type,
				timeout: 0,
				message: message
			}).show();
		}
		
		return {
			
			info: function(message, selector) {
				notification("info", message, selector);
			},
			
			warning: function(message, selector) {
				notification("warning", message, selector);
			},
			
			error: function(message, selector) {
				notification("error", message, selector);
			}
			
		};
		
	});