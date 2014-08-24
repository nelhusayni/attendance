(function(){
  var app = angular.module('attend', ['ngRoute', 'firebase']);

  app.value('fbURL', '<_removed_>');
   
  app.factory('dataFactory', function($firebase, fbURL) {

    var kids = $firebase(new Firebase(fbURL+"kids")),
        dataFactory = {};

    dataFactory.kids = function() { return kids.$asArray(); };

    return dataFactory;
  });

  // Set up configuration to switch between In and Out
  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller:'InCtrl',
        templateUrl:'in.html'
      })
      .otherwise({
        redirectTo:'/'
      });
  });

  // The main controller for Sign In
  app.controller('InCtrl', 
    function($scope, dataFactory) {
      $scope.kids = dataFactory.kids();
    }
  );
})();