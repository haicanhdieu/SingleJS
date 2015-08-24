define(['require', 'jquery', 'system', 'routes'],
  function (require, $, system, routes) {

    /**
     * @class  AppModule
     * @static
     */
    var app = {
      /**
       * @property {string} Angular app name
       */
      name: 'singlejs',

      /**
       * @property {string} Angular app name
       */
      title: 'singlejsApp',

      /**
       * @property {string} selection query for app host dom element
       */
      appHost: '#applicationHost',

      /**
       * @property {string} path to main layout html file
       */
      layout: 'app/layout/layout.html',

      /**
       * @property {array} angular dependencies
       */
      ngDependencies: ['ngRoute'],

      /**
       * @property {object} angular application
       */
      ngApp: function (angularApp) {
        if(angularApp){
          system.ngApps["ngApp_" + self.name] = angularApp;
        }
        return system.ngApps["ngApp_" + self.name];
      },


      /**
       * @method Config angular application
       */
      configAngular: function(){
        var ngApp = this.ngApp();

        ngApp.config(
        [
            '$routeProvider',
            '$locationProvider',
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',

            function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide)
            {
              ngApp.controller = $controllerProvider.register;
              ngApp.directive  = $compileProvider.directive;
              ngApp.filter     = $filterProvider.register;
              ngApp.factory    = $provide.factory;
              ngApp.service    = $provide.service;

              //  $locationProvider.html5Mode(true);

              //config routes
              if(routes.routes !== undefined)
                {
                    //add routes
                    angular.forEach(routes.routes, function(route, path)
                    {
                        $routeProvider.when(path, {
                          templateUrl:route.templateUrl,
                          resolve: ['$q','$rootScope', function($q, $rootScope)
                          {
                              var deferred = $q.defer();
                              //use require to lazy load controller dependencies
                              require(route.dependencies, function()
                              {
                                  $rootScope.$apply(function()
                                  {
                                      deferred.resolve();
                                  });
                              });

                              return deferred.promise;
                          }]
                        });
                    });
                }
                //default route
                if(routes.defaultRoutePaths !== undefined)
                {
                    $routeProvider.otherwise({redirectTo:routes.defaultRoutePaths});
                }
            }
        ]);


      },


      /**
       * @method start application
       */
      start: function () {
         var self = this;
         //log starting
         system.log("Application: Starting");

         //set title
         if(self.title){
           document.title = self.title;
         }

         //load layout then setup angualar
         return $.get(this.layout, function(ret){

            //Create Angular Application
            self.ngApp(angular.module(self.name, self.ngDependencies));

            //append to appHost
            $(self.appHost)
              //load layout
              .html(ret)
              //set ng-app
              .attr("ng-app", self.name)
              ;;

            //config angular
            self.configAngular();

            //bootstrap angular
            angular.element(document).ready(function() {
              angular.bootstrap(document, [self.name]);
            });


            //log started
            system.log("Application: Started");

          });

       }

    };


    return app;
});
