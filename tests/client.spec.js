'use strict';

describe('Controller: Form One Controller', function () {

  beforeEach(module('portfolioStratApp'));

  var scope, GraphFactory, FormOneCtrl, $httpBackend;
  beforeEach('retrieve services', inject(function (_$rootScope_,_$controller_,_$httpBackend_,_GraphFactory_) {
    $httpBackend = _$httpBackend_;
    scope = _$rootScope_.$new();
    GraphFactory = _GraphFactory_;
    FormOneCtrl = _$controller_('formOneCtrl', {
      $scope: scope
    });
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should initialize createGraph function correctly', function () {
    expect(scope.createGraph).to.be.a('function');
  });

  it('should initialize chartConfig object correctly', function () {
    expect(scope.chartConfig).to.be.a('object');
  });

  it('should have createGraph function return an object', function (done) {
    var chart_details = { title: 'test chart', chart_type: 'scatter', data_min: 1, data_max: 10};
    $httpBackend.expectPOST('graph/save');
    $httpBackend.whenPOST('graph/save', chart_details)
      .respond({ title: 'test chart', chart_type: 'scatter', data_min: 1, data_max: 10});

    GraphFactory.create(chart_details).then(function (data) {

      expect(data.title).to.equal('test chart');
      expect(data.chart_type).to.equal('scatter');
      done();
    });

    $httpBackend.flush();
  });
});