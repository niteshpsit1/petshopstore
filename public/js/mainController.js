app.controller('mainController',function($scope, $http, $location, $rootScope){
	$scope.logout = function(login){
		localStorage.removeItem("isLogin_token");
		$rootScope.loginUser = false;
	}

	$scope.login = function(login){
		var data = {
			username: login.email,
			password: login.password
		};
		$http.post('login',data).then(function(response){
			if(response.data.message == "ok"){
				localStorage.setItem("isLogin_token", response.data.result);
				$rootScope.loginUser = true;
				$location.url('/home');
			}else{
				$scope.login.message = response.data.message;
			}
		});
	}

	$scope.signup = function(user){
		var	data = { 
			name: user.name,
			username: user.email,
			password: user.password
		};

		$http.post('signup',data).then(function(response){
			if(response.data.message == 'ok'){
				localStorage.setItem("isLogin_token", response.data.result);
				$rootScope.loginUser = true;
				$location.url('/home');
			}
			else
				alert(response.data.message.message);
		});
	}

	if(localStorage.getItem('isLogin_token'))
		$rootScope.loginUser = true;
});