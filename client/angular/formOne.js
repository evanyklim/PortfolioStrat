app.config(function ($stateProvider) {
  $stateProvider.state('formOne', {
    url: '/',
    templateUrl: 'templates/formOne.html',
    controller: 'formOneCtrl'
  });
});

app.controller('formOneCtrl', function () {
	
});