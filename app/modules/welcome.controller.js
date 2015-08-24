define(["app"], function(app){
  //Register controller
  app.ngApp().controller('welcome',['$scope',function($scope){
      //Start Controller content
      //=>

      $scope.page =
      {
          heading: 'Welcome'
      };

      //<=|
      //End controller content
  }]);
})
