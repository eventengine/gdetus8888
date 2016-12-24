'use strict';

/* global angular, $ */


angular.module('app')
	.controller('UserDialogAddAvatarCtrl', ['$scope',  
		function($scope) {
			
			
			// https://www.npmjs.com/package/blueimp-file-upload
			// https://github.com/blueimp/jQuery-File-Upload/wiki/Options
			// http://blueimp.github.io/jQuery-File-Upload/angularjs.html
			
			$('#modalAddAvatar .fileupload input').fileupload({
				dataType: 'json',
				url: "server/php/",
				dropZone: '#modalAddAvatar .dropzone',
				done: function (e, data) {
					$.each(data.result.files, function (index, file) {
						console.log(file.name)
					});
				},
				progressall: function (e, data) {
					var progress = parseInt(data.loaded / data.total * 100, 10);
					$('#modalAddAvatar .fileupload .progress-bar').css({
						width: progress + '%'
					});
				},
				start: function() {
					$('#modalAddAvatar .fileupload .progress-bar').css({
						width: 0
					});
				}
			});
		
		}
	]);