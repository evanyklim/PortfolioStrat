var app = angular.module('portfolioStratApp',['ui.router','highcharts-ng']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');
});