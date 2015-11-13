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
			console.log(data);
			// set config object properties in order to display graph correctly
			var config = $scope.chartConfig,
					// lodash unzips the data array
					graphData = _.unzip(data.data[0].series);  

			config.title.text = data.title;
			config.options.chart.type = data.chart_type;
			

			// scatter charts require data to be treated differently for configuration
			if (data.chart_type === 'scatter') {
				// unzip additional data poins
				var additionalData = _.unzip(data.data[1].series);

				// zip all data points together
				var scatterData = _.zip(graphData[1], additionalData[1]);
				config.series = [{ data: scatterData }];
			} else {
				// this is how data for bars and lines is loaded
				// handle x Axis labels
				config.xAxis.categories = graphData[0];
				config.series = [{ data: graphData[1] }];
			}
		});
	}

	// contains configurations for the chart on form 1
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
		},
		// organize data for highcharts config object
		organize: function (config, data) {
			//refactor from above code
		}
	};
});