define(["singlejs/app"], function(app){

  app.ngApp.controller('welcome',
    [
        '$scope',

        function($scope)
        {
            $scope.page =
            {
                heading: 'Welcome sss'
            };
        }
    ]);
})
