app.config(function ($stateProvider) {
  $stateProvider.state('formTwo', {
    url: '/formTwo',
    templateUrl: 'templates/formTwo.html',
    controller: 'formTwoCtrl',
    resolve: {
    	fetchAll: function (GraphFactory) {
    		return GraphFactory.get();
    	}
    }
  });
});

app.controller('formTwoCtrl', function ($scope, GraphFactory, fetchAll) {
	
	$scope.allGraphs = fetchAll;  // retrieve all graph ids for the select control
	$scope.fetchGraph = function (id) {

		GraphFactory.get(id).then(function (data) {
			// display graph in highchart
		});
		
	}
});