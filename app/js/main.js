(function(){
  'use strict';

  var app = angular.module('attend', ['ngRoute', 'firebase']);

  app.value('fbURL', '<_removed_>');
   
  app.factory('dataFactory', function($firebase, fbURL) {
    var session = 'session01';

    var kids = $firebase(new Firebase(fbURL+"kids")),
        dataFactory = {};

    dataFactory.kids = function() { return kids; };

    dataFactory.toggle = function(kid, type, obj) {
      var id = kid.$id, wrapper = {};
      wrapper[session] = obj;
      (exists(id)) ? kids.$remove(id+"/"+session) : kids.$update(id, wrapper);
    }

    dataFactory.isSignedIn = function(id) {
      return exists(id);
    }

    function exists(id) {
      return kids.$asArray().$getRecord(id)[session];
    }

    return dataFactory;
  });

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

  app.controller('InCtrl', 
    function($scope, dataFactory) {
      
      $scope.kids = dataFactory.kids().$asArray();

      $scope.toggle = function(kid, type) {
        var time = {};
        time[type] = new Date().toTimeString();
        dataFactory.toggle(kid, type, time);
      }

      $scope.isSignedIn = function(kid) {
        return dataFactory.isSignedIn(kid.$id);
      }

    }
  );

})();
