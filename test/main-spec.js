describe('InCtrl', function() {
  beforeEach(module('attend'));
  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('InCtrl', {
      $scope: scope
    });
  }));

  it('should get the list of kids from firebase', 
    function() {
      expect(scope.kids).not.toBeNull();
  });
})