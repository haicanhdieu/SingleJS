define(["singlejs/app"], function(app){

  app.ngApp.controller('view1',
    [
        '$scope',

        function($scope)
        {
            $scope.page =
            {
                heading: 'View 1'
            };
        }
    ]);
})
