
'use strict';

/* global angular, $ */

angular.module('app')
	.controller('UserDialogAddAvatarCtrl', ['$scope', '$http', 'Notify',
		function($scope, $http, Notify) {
			
			var step = "upload"; // = upload | selectAvatar | selectAvatarPreview
			
			var modalAddAvatar = $('#modalAddAvatar');
			
			var uploadInput = modalAddAvatar.find('.upload');
			var progressBar = modalAddAvatar.find('.progress-bar');
			var dropzone = modalAddAvatar.find('.dropzone');
			
			var steps = {
				el: modalAddAvatar.find('.steps'),
				selectAvatar: {
					el: modalAddAvatar.find('.stepSelectAvatar'),
					cropperzoneImg: modalAddAvatar.find('.stepSelectAvatar .cropperzone img')
				},
				selectAvatarPreview: {
					el: modalAddAvatar.find('.stepSelectAvatarPreview'),
					cropperzoneImg: modalAddAvatar.find('.stepSelectAvatarPreview .cropperzone img')
				}
			};
			
			$scope.cropConfig = {};
			
			// https://www.npmjs.com/package/blueimp-file-upload
			// https://github.com/blueimp/jQuery-File-Upload/wiki/Options
			// http://blueimp.github.io/jQuery-File-Upload/angularjs.html
			
			uploadInput.fileupload({
				dataType: 'json',
				url: "/api/file",
				dropZone: dropzone,
				done: function (e, data) {
					
					step = "selectAvatar";
					
					dropzone.hide();
					steps.el.show();
					
					steps.selectAvatar.el.show();
					
					var id = data.result.files[0].id;
					var src = "/file/" + id;
					steps.selectAvatar.cropperzoneImg.attr("src", src);
					steps.selectAvatarPreview.cropperzoneImg.attr("src", src);
					
					// https://github.com/fengyuanchen/cropper
					steps.selectAvatar.cropperzoneImg.cropper({
						aspectRatio: 16 / 9,
						crop: function(e) {
							$scope.cropConfig.avatar = {
								id: id,
								x: e.x,
								y: e.y,
								width: e.width,
								height: e.height,
								rotate: e.rotate,
								scaleX: e.scaleX,
								scaleY: e.scaleY
							};
						}
					});
				
				},
				progressall: function (e, data) {
					var progress = parseInt(data.loaded / data.total * 100, 10);
					progressBar.css("width", progress + '%');
				},
				start: function() {
					progressBar.css("width", 0);
				}
			});
			
			$scope.onDropzoneClick = function() {
				uploadInput.click();
			};
			
			$scope.onClearButtonClick = function() {
				steps.selectAvatar.el.hide();
				steps.selectAvatarPreview.el.hide();
				steps.selectAvatar.cropperzoneImg.cropper("destroy");
				steps.selectAvatarPreview.cropperzoneImg.cropper("destroy");
				steps.el.hide();
				progressBar.css("width", 0);
				dropzone.show();
			};
			
			$scope.onSaveButtonClick = function() {
				switch (step) {
					case "upload":
						break;
					case "selectAvatar":
						step = "selectAvatarPreview";
						
						steps.selectAvatar.el.hide();
						steps.selectAvatarPreview.el.show();
					
						// https://github.com/fengyuanchen/cropper
						steps.selectAvatarPreview.cropperzoneImg.cropper({
							aspectRatio: 1 / 1,
							preview: "#modalAddAvatar .preview",
							crop: function(e) {
								$scope.cropConfig.avatarPreview = {
									id: $scope.cropConfig.avatar.id,
									x: e.x,
									y: e.y,
									width: e.width,
									height: e.height,
									rotate: e.rotate,
									scaleX: e.scaleX,
									scaleY: e.scaleY
								};
							}
						});
						
						break;
					case "selectAvatarPreview":
						modalAddAvatar.modal("hide");
						$http.put("/api/user/avatar", {
							
							// TODO всюду выше перепутано avatar и avatarPreview (позже просто вышестоящий код переименовать avatar в avatarPreview и обратно)
							avatarPreview: $scope.cropConfig.avatar,
							avatar: $scope.cropConfig.avatarPreview
						}).then(function(result) {
							Notify.info("Аватар загружен.");
						});
						break;
				}
			};
		
		}
	]);