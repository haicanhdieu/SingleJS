define(["require", "jquery", 'singlejs/system', 'routes', 'singlejs/dependencyResolverFor'],
  function (require, $, system, routes, dependencyResolverFor) {

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
       * @property {string} default route
       */
      entrance: '/',

      /**
       * @property {string} selection query for app host dom element
       */
      appHost: '#applicationHost',

      /**
       * @property {string} path to main layout html file
       */
      layout: 'app/layout/layout.html',

      /**
       * @property {object} angular application
       */
      ngApp: null,


      configAngular: function(){
        var ngApp = this.ngApp;

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

                if(routes.routes !== undefined)
                {
                    angular.forEach(routes.routes, function(route, path)
                    {
                        $routeProvider.when(path, {templateUrl:route.templateUrl, resolve:dependencyResolverFor(route.dependencies)});
                    });
                }

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
         if(this.title){
           document.title = this.title;
         }

         //set angular app
         var hostElem = $(this.appHost);
         return $.get(this.layout, function(ret){
            //log started
            system.log("Application: Started");

            //bootstrap angular
            window["ngApp_" + self.name] = angular.module(self.name, ['ngRoute']);
            self.ngApp = window["ngApp_" + self.name];


            //append to appHost
            hostElem
              //load layout
              .html(ret)
              //set ng-app
              .attr("ng-app", self.name)
              ;;

            //config angular
            self.configAngular();


            //var ngApp = angular.module(self.name);
            angular.element(document).ready(function() {
              angular.bootstrap(document, [self.name]);
            });

          });

       }

    };


    return app;
});
