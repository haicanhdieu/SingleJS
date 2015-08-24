define(["app"], function(app){
  //Register controller
  app.ngApp().controller('view1',['$scope',function($scope){
      //Start Controller content
      //=>

      $scope.page =
      {
          heading: 'View 1'
      };

      //<=|
      //End controller content
  }]);
})
