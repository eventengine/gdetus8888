/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

/* global angular */

angular.module("app").config(["$stateProvider", "$urlRouterProvider", "$ocLazyLoadProvider",

	function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
		
		//$urlRouterProvider.otherwise("/app/home");

		$stateProvider
		
			.state("login", {
				url: "/login",
				templateUrl: "tpl/login.html",
				controller: "LoginCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							"assets/js/controllers/login.js"
						]);
					}]
				}
			})
			
			.state("app", {
				abstract: true,
				templateUrl: "tpl/app.html"
			})
			
			.state("app.home", {
				url: "/home",
				templateUrl: "tpl/home.html",
				controller: "HomeCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							/* 
								Load any ocLazyLoad module here
								ex: "wysihtml5"
								Open config.lazyload.js for available modules
							*/
						], {
							insertBefore: "#lazyload_placeholder"
						})
						.then(function() {
							return $ocLazyLoad.load([
								"assets/js/controllers/home.js"
							]);
						});
					}]
				}
			})
			
			.state("app.edit", {
				url: "/edit",
				templateUrl: "tpl/edit.html",
				controller: "EditCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							/* 
								Load any ocLazyLoad module here
								ex: "wysihtml5"
								Open config.lazyload.js for available modules
							*/
						], {
							insertBefore: "#lazyload_placeholder"
						})
						.then(function() {
							return $ocLazyLoad.load([
								"assets/js/controllers/edit.js"
							]);
						});
					}]
				}
			})
			
			.state("app.settings", {
				url: "/settings",
				templateUrl: "tpl/settings.html",
				controller: "SettingsCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							/* 
								Load any ocLazyLoad module here
								ex: "wysihtml5"
								Open config.lazyload.js for available modules
							*/
						], {
							insertBefore: "#lazyload_placeholder"
						})
						.then(function() {
							return $ocLazyLoad.load([
								"assets/js/controllers/settings.js"
							]);
						});
					}]
				}
			})
			
			.state("app.sup", {
				url: "/sup",
				templateUrl: "tpl/sup.html",
				controller: "SupCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							/* 
								Load any ocLazyLoad module here
								ex: "wysihtml5"
								Open config.lazyload.js for available modules
							*/
						], {
							insertBefore: "#lazyload_placeholder"
						})
						.then(function() {
							return $ocLazyLoad.load([
								"assets/js/controllers/sup.js"
							]);
						});
					}]
				}
			})
			
			.state("app.feed", {
				url: "/feed",
				templateUrl: "tpl/feed.html",
				controller: "FeedCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							/* 
								Load any ocLazyLoad module here
								ex: "wysihtml5"
								Open config.lazyload.js for available modules
							*/
						], {
							insertBefore: "#lazyload_placeholder"
						})
						.then(function() {
							return $ocLazyLoad.load([
								"assets/js/controllers/feed.js"
							]);
						});
					}]
				}
			})
			.state("app.map", {
				url: "/map",
				templateUrl: "tpl/map.html",
				controller: "MapCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							"2gisMapApi"
						], {
							insertBefore: "#lazyload_placeholder"
						})
						.then(function() {
							return $ocLazyLoad.load([
								"assets/js/controllers/map.js"
							]);
						});
					}]
				}
			})
			.state("app.user", {
				url: "/{id:.+}",
				templateUrl: "tpl/user.html",
				controller: "UserCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							"assets/js/controllers/user.js"
						]);
					}]
				}
			});
			
	}
		
]);