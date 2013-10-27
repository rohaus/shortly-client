angular.module('shortlyApp', [])
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller:'indexCtrl',
    templateUrl:'/templates/index.html'})
  .when('/create', {
    controller:'createCtrl',
    templateUrl:'/templates/create.html'})
  .when('/login', {
    controller: 'loginCtrl',
    templateUrl:'/templates/login.html'})
  .when('/signup', {
    controller: 'loginCtrl',
    templateUrl:'/templates/signup.html'})
  .otherwise({
    redirectTo: '/'
  });
})
.run(function($rootScope, $location, UserService){
  $rootScope.$on('$routeChangeStart',function(event, next){
    if(!UserService.isAuthenticated() && next.controller !== 'loginCtrl') {
      $location.path('/login');
    }
  });
})
.factory('UserService', function($q, $http) {
  var service = {
    currentUser: null,
    // getCurrentUser: function() {

    // },
    isAuthenticated: function() {
      return !!service.currentUser;
    }
  };
  return service;
})
.controller('indexCtrl',function($scope, $http){
  $scope.predicate = 'visits';
  $scope.reverse = 'true';
  $scope.test = function() {
    console.log("scope searchText: ", $scope.searchText);
  };
  $http.get('/links')
  .success(function(data, status, headers, config){
    console.log('SUCCESS!');
    $scope.links = data;
  })
  .error(function(data, status){
    console.log('Error');
  });
})
.controller('createCtrl', function($scope, $http){
  $scope.data = {
    urlRoot: '/links'
  };
  $scope.shorten = function(){
    console.log("data.url is:", $scope.data.url);
    $http.post('/links', $scope.data)
    .success(function(data, status, headers, config){
      console.log('SUCCESS!');
    })
    .error(function(data, status){
      console.log('Error');
    });
  };
})
.controller('loginCtrl', function($scope) {

});
