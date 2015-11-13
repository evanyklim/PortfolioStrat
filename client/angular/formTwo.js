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
	
	// retrieve all graph ids for the select control
	$scope.allGraphs = fetchAll;  

	// for retrieving graphs by _id
	$scope.fetchGraph = function (id) {

		// console.log('ID is: ', id);
		GraphFactory.get(id).then(function (data) {
			// console.log('data from server: ', data)
			// display graph in highchart
			GraphFactory.organize($scope.returnedConfig, data[0]);
		});
		
	}

	// contains configurations for the chart on form 2
	$scope.returnedConfig = {
    options: {
      chart: { type: '', zoomType: 'x' }
    },
    series: [{ data: null }],
    title: { text: '' },
    xAxis: { categories: null },
    loading: false
  }

});