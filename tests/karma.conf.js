var path = require('path');

module.exports = function (config) {

    var filesCollection = [
        'node_modules/lodash/index.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/socket.io-client/socket.io.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/highcharts-ng/dist/highcharts-ng.js',
        'client/angular/*.js',
        'tests/client.spec.js'
    ];

    var excludeFiles = [
        'tests/karma.conf.js',
        'client/angular/highcharts.src.js'
    ];

    var configObj = {
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],
        plugins : ['karma-phantomjs-launcher','karma-mocha','karma-chai'],
        basePath: path.join(__dirname, '../'),
        files: filesCollection,
        exclude: excludeFiles
    };

    config.set(configObj);

};