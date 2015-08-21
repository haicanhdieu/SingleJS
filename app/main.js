requirejs.config({
    paths: {
        'singlejs': '../vendor/singlejs/js',
        'angular': '../vendor/angular/angular.min',
        'angular-route': '../vendor/angular/angular-route.min',
        'materialize': '../vendor/materialize/js/materialize.min',
        'jquery': '../vendor/jquery/jquery-2.1.4.min',

        'modules': 'modules',
      },
      shim: {
          'materialize': {
              deps: ['jquery'],
              exports: 'jQuery'
         },
         'angular-route': {
             deps: ['angular'],
             exports: 'angular'
        }
      }
});

define(['singlejs/system', 'singlejs/app', 'singlejs/router'],  function (system, app, router) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    //app title
    app.title = 'SingleJS';

    //router.map
    router.map = [
      {route:'/', view: "/app/modules/welcome.view", controller: 'welcome', controllerFile: 'modules/welcome.controller'},
      {route:'/view1', view: "/app/modules/view1.view", controller: 'view1', controllerFile: 'modules/view1.controller'}
    ];

    //start application
    app.start()
      .then(function() {
        //application started
      });
});
