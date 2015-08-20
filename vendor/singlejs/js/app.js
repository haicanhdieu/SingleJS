define(["require", "jquery", 'singlejs/system'], function (require, $, system) {

    /**
     * @class  AppModule
     * @static
     */
    var app = {
      /**
       * @property {string} Angular app name
       */
      name: 'singlejsApp',

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
       * @method start application
       */
      start: function () {
         //log starting
         system.log("Application: Starting");

         //set title
         if(this.title){
           document.title = this.title;
         }

         //set angular app
         var hostElem = $(this.appHost);
         hostElem
          //set ng-app
          .attr("ng-app", this.name)
          ;

          return $.get(this.layout, function(ret){
            //log started
            system.log("Application: Started");
            //append to appHost
            hostElem.html(ret);

          });

       }

    };


    return app;
});
