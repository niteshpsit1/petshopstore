var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/home',{
		templateUrl: 'html/home.html',
		controller: 'storeController'
	})
	.when('/login',{
		templateUrl: 'html/login.html'
	})
	.when('/signup',{
		templateUrl: 'html/signup.html'
	})
	.otherwise({
        redirectTo: '/'
    });
});