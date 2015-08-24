//config requirejs﻿
requirejs.config({
  paths: {
    //angular libraries
    'angular': '../vendor/angular/angular.min',
    'angular-route': '../vendor/angular/angular-route.min',

    //jquery and materialize
    'jquery': '../vendor/jquery/jquery-2.1.4.min',
    'materialize': '../vendor/materialize/js/materialize.amd',
    'hammer': '../vendor/hammer/hammer.min',
    'velocity': '../vendor/velocity/velocity.min',

    //singlejs
    'app': '../vendor/singlejs/js/app',
    'system': '../vendor/singlejs/js/system',

    //application own modules
    'modules': 'modules'
  },
  shim: {
     'materialize': {
          deps: ['jquery', 'hammer', 'velocity']
     },
     'angular-route': {
         deps: ['angular']
     },
     'app': {
        deps: ['jquery','angular-route']
     }

  }
});

//startup
define(['system', 'app', 'materialize'],  function (system, app, materialize) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    //app title
    app.title = 'SingleJS';

    //start application
    app.start()
      .then(function() {
        //application started

      });
});
