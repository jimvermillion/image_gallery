var angular = require('angular');
require(__dirname + '/../app/js/client');


describe('pic controller', () => {
  var $httpBackend;           // mocks a backend
  var $scope;                 // scope
  var $ControllerConstructor; // no view needed

  beforeEach(angular.mock.module('picApp'));

  beforeEach(angular.mock.inject(($rootScope, $controller) => {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var MainController = $ControllerConstructor('MainController', {$scope});
    expect(typeof MainController).toBe('object');
    expect(Array.isArray($scope.pics)).toBe(true);
    expect(typeof $scope.get).toBe('function');
  });

  // REST requests
  describe('REST requests', () => {
    beforeEach(angular.mock.inject( function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('MainController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();  // ensure satisfaction
      $httpBackend.verifyNoOutstandingRequest();      // no extras
    });

    it('should make a GET request to /api/pic', () => {
      $httpBackend.expectGET('http://localhost:3000/api/pic').respond(200, [{url: 'test pic'}]);
      $scope.get();
      $httpBackend.flush(); // resolves the promise $http returns, all requests have been made -- resolve them
      expect($scope.pics[0].url).toBe('test pic');
      expect($scope.pics.length).toBe(1);
    });

    it('should make a POST request to /api/pic', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/pic', {name: 'the sent pic'}).respond(200);
      $scope.newPic = {name: 'the new pic'};
      $scope.post({name: 'the sent pic'});
      $httpBackend.flush();
      expect($scope.pics.length).toBe(1);
      expect($scope.newPic).toBe(null);
      expect($scope.pics[0].name).toBe('the sent pic');
    });

  });
});
