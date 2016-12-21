/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

/* global angular */

angular.module("app").config(["$stateProvider", "$urlRouterProvider", "$ocLazyLoadProvider",

	function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
		
		//$urlRouterProvider.otherwise("/app/home");

		$stateProvider
		
			.state("404", {
				templateUrl: "tpl/404.html",
				data: {
					isPublic: true,
					meta: {
						titleSuffix: "",
						title: "404"
					}
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
				},
				data: {
					isPublic: true, // Публичная страница, аутентификация не требуется
					meta: {
						titleSuffix: "",
						title: "Добро пожаловать домой!"
					}
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
						    'datepicker',
                            'daterangepicker',
                            'select',
						], {
							insertBefore: "#lazyload_placeholder"
						})
						.then(function() {
							return $ocLazyLoad.load([
								"assets/js/controllers/edit.js"
							]);
						});
					}]
				},
				data: {
					meta: {
						title: "Редактирование профиля"
					}
				}
			})
			
			.state("app.im", {
				url: "/im",
				templateUrl: "tpl/im.html",
				controller: "ImCtrl",
				resolve: {
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
						    'datepicker',
                            'daterangepicker',
                            'select',
						], {
							insertBefore: "#lazyload_placeholder"
						})
						.then(function() {
							return $ocLazyLoad.load([
								"assets/js/controllers/im.js"
							]);
						});
					}]
				},
				data: {
					meta: {
						title: "Диалоги"
					}
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
				},
				data: {
					meta: {
						title: "Настройки сервиса"
					}
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
				},
				data: {
					meta: {
						title: "Помощь"
					}
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
				},
				data: {
					meta: {
						title: "Лента"
					}
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
				},
				data: {
					meta: {
						title: "Карта"
					}
				}
			})
			
			.state("app.user", {
				url: "/{useruri:.+}",
				templateUrl: "tpl/user.html",
				controller: "UserCtrl",
				resolve: {
					user: ['$state', '$stateParams', 'passport', function($state, $stateParams, passport) {
						return passport.getUserByIdOrUseruri($stateParams.useruri).catch(function(err) {
							console.error(err);
							$state.go("404"); 
						});
					}],
					deps: ["$ocLazyLoad", function($ocLazyLoad) {
						return $ocLazyLoad.load([
							"assets/js/controllers/user.js"
						]);
					}]
				},
				data: {
					meta: {
						title: "Профиль"
					}
				}
			});
			
	}
		
]);