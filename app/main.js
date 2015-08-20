﻿requirejs.config({
    paths: {
        'singlejs': '../vendor/singlejs/js',
        'angular': '../vendor/angular/angular.min',
        'materialize': '../vendor/materialize/js/materialize.min',
        'jquery': '../vendor/jquery/jquery-2.1.4.min',
      },
      shim: {
          'materialize': {
              deps: ['jquery'],
              exports: 'jQuery'
         },
      }
});

define(['singlejs/system', 'singlejs/app'],  function (system, app) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'SingleJS';


    app.start()
    .then(function() {
        alert("app start");
        //Show the app by setting the root view model for our application with a transition.
        //app.setRoot('viewmodels/shell', 'entrance');
    });
});
