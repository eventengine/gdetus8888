/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

/* global angular */

angular.module("app").config(["$stateProvider", "$urlRouterProvider", "$ocLazyLoadProvider",

	function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
		
		//$urlRouterProvider.otherwise("/app/home");

		$stateProvider
			.state("app", {
				abstract: true,
				//url: "/app",
				templateUrl: "tpl/app.html"
			})
			.state("app.dashboard", {
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
			.state("app.user", {
				url: "/user",
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