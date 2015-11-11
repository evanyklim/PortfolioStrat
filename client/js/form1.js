var app = angular.module('portfolioStratApp',[]);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');
});

app.controller('form1Ctrl', function () {
	
});

