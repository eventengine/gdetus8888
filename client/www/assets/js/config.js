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
			.state("app.user", {
				url: "/user/:id",
				templateUrl: "tpl/user.html",
				controller: "UserCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							"assets/js/controllers/user.js"
						]);
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
			});
			
	}
		
]);