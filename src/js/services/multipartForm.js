angular.module('mainApp').service('multipartForm', ['$http','cookieService','$location', function ($http, cookieService, $location) {
	this.post = function (uploadUrl, data){
		var fd = new FormData ();

		for(var key in data) {
		  fd[key] = data[key];
		}


			var email = cookieService.getCookie('email');

		$http.post('/api/events/', {
			name: fd.name,
			description: fd.description,
			payment: fd.payment,
			place: fd.place,
			type: fd.type,
			date: fd.dt,
			time: fd.time,
			creator: email,
			members: '',
			photoURL: fd.photoURL
		});

		$location.url('/home');

	}
}]);
