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
		GraphFactory.create(graph).then(function (data) {
			// set config object here in order to display graph
			var config = $scope.chartConfig;
			var graphData = _.unzip(data.data[0].series);

			config.title.text = data.title;
			config.options.chart.type = data.chart_type;
			config.series = [{ data: graphData[1] }];
			if (data.chart_type === 'scatter') {
				var scatterData = _.unzip(data.data[1].series);
				config.series.push({ data: null });
				config.series[1].data = scatterData[1];
			}
			$scope.chartConfig.xAxis.categories = graphData[0];
		});
	}

	$scope.chartConfig = {
    options: {
      chart: {
        type: '',
        zoomType: 'x'
      }
    },
    series: [{
      data: null
    }],
    title: {
      text: ''
    },
    xAxis: {
    	categories: null
    },
    loading: false
  }
});

app.factory('GraphFactory', function ($http) {
	return {
		// create a new graph
		create: function (params) {
			return $http.post('graph/save', params).then(function (res) {
				return res.data;
			});
		},
		// retrieve graph from db
		get: function (id) {
			$http.get('graph/get/' + id).then(function (res) {
				return res.data;
			});
		}
	};
});