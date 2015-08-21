define(["require","jquery", "angular-route"], function(require, $, ngRouter){

  /**
   * @class  Angular router helper
   * @static
   */
  var router = {
    /**
     * @property {string} router map
     */
    map:[],

    /**
     * @method register angular routers
     * @param {object} [app] singlejs application
     */
     register: function(app){
       var self = this;
       //create angular app with route
       var ngApp = window["ngApp_" + app.name]; //angular.module(app.name, ['ngRoute']);
       //config angular route
       ngApp.config(function ($routeProvider) {

         //register route map
         $.each(self.map, function(id, val){
           $routeProvider
             .when(val.route, {
               templateUrl: val.view + ".html",
               //controller: val.controller,

               resolve: {

                  resolver: ['$q','$rootScope', function($q, $rootScope)
                  {
                      var deferred = $q.defer();

                      require([val.controllerFile], function()
                      {
                        alert("bbb");
                          $rootScope.$apply(function()
                          {
                              deferred.resolve();
                          });
                      });

                      return deferred.promise;
                  }]

               }

               /*
               resolve: {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                  var deferred = $q.defer();
                  require ([val.controllerFile], function (ctrl) {
                    ctrl();
                    $rootScope.$apply(function () { deferred.resolve(); });
                  });
                  return deferred.promise;
                }]
              }
              */

            });


         });
         //default route
         $routeProvider
          .otherwise(app.entrance);
       });

     }




  }

  return router;

});
