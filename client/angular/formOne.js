app.config(function ($stateProvider) {
  $stateProvider.state('formOne', {
    url: '/',
    templateUrl: 'templates/formOne.html',
    controller: 'formOneCtrl'
  });
});

app.controller('formOneCtrl', function ($scope, GraphFactory) {
	
	$scope.createGraph = function (graph) {
		// http service to create graph
		GraphFactory.create(graph).then(function (res) {
			console.log(res);
			// set config object here in order to display graph
		});
	}

	// what is the config for highcharts?
	// have to link this up with the factory functions
	$scope.chartConfig = {
    options: {
      chart: {
        type: 'line',
        zoomType: 'x'
      }
    },
    series: [{
      data: [10, 15, 12, 8, 7, 1, 1, 19, 15, 10]
    }],
    title: {
      text: 'Hello'
    },
    xAxis: {currentMin: 0, currentMax: 10, minRange: 1},
    loading: false
  }
});

app.factory('GraphFactory', function ($http) {
	return {
		// create a new graph
		create: function (params) {
			console.log('params', params)
			return $http.post('graph/save', params).then(function (res) {
				return res.data;
			});
		},
		// retrieve graph from db
		get: function (id) {
			$http.get('graph/get').then(function (res) {
				return res.data;
			});
		}
	};
});