
/* global $, angular */

/**
 * Класс Notify.
 * 
 * Два способа использования:
 * 
 * 1) Для определенного контейнера
 * var notify = new Notify(".login-container");
 * notify.info("Заметка дедушке")
 * 
 * 2) Для контейнера по умолчанию
 * Notify.info("Заметка дедушке")
 * 
 */
angular.module("app")
	.factory("Notify", [function() {
		
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
		
		Notify.prototype.info = function(message) {
			this._noti("info", message);
		};
		
		Notify.prototype.warning = function(message) {
			this._noti("warning", message);
		};
		
		Notify.prototype.error = function(message) {
			this._noti("error", message);
		};
		
		var common = new Notify();
		
		Notify.info = common.info.bind(common);
		Notify.warning = common.warning.bind(common);
		Notify.error = common.error.bind(common);
		
		return Notify;
		
	}]);