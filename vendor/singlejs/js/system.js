define(['require', 'jquery'], function(require, $) {
  var isDebugging = false;

  var noop = function() { };

  var log = function() {
      try {
          // Modern browsers
          if (typeof console != 'undefined' && typeof console.log == 'function') {
              // Opera 11
              if (window.opera) {
                  var i = 0;
                  while (i < arguments.length) {
                      console.log('Item ' + (i + 1) + ': ' + arguments[i]);
                      i++;
                  }
              }
              // All other modern browsers
              else if ((slice.call(arguments)).length == 1 && typeof slice.call(arguments)[0] == 'string') {
                  console.log((slice.call(arguments)).toString());
              } else {
                  console.log.apply(console, slice.call(arguments));
              }
          }
          // IE8
          else if ((!Function.prototype.bind || treatAsIE8) && typeof console != 'undefined' && typeof console.log == 'object') {
              Function.prototype.call.call(console.log, console, slice.call(arguments));
          }

          // IE7 and lower, and other old browsers
      } catch (ignore) { }
  };

  var logError = function(error, err) {
      var exception;

      if(error instanceof Error){
          exception = error;
      } else {
          exception = new Error(error);
      }

      exception.innerError = err;

      //Report the error as an error, not as a log
      try {
          // Modern browsers (it's only a single item, no need for argument splitting as in log() above)
          if (typeof console != 'undefined' && typeof console.error == 'function') {
              console.error(exception);
          }
          // IE8
          else if ((!Function.prototype.bind || treatAsIE8) && typeof console != 'undefined' && typeof console.error == 'object') {
              Function.prototype.call.call(console.error, console, exception);
          }
          // IE7 and lower, and other old browsers
      } catch (ignore) { }

      throw exception;
  };


  /**
   * @class SystemModule
   * @static
   */
  var system = {
      /**
       * Durandal's version.
       * @property {string} version
       */
      version: "0.0.1",
      /**
       * A noop function.
       * @method noop
       */
      noop: noop,

      /**
       * Gets/Sets whether or not Durandal is in debug mode.
       * @method debug
       * @param {boolean} [enable] Turns on/off debugging.
       * @return {boolean} Whether or not Durandal is current debugging.
       */
      debug: function(enable) {
          if (arguments.length == 1) {
              isDebugging = enable;
              if (isDebugging) {
                  this.log = log;
                  this.error = logError;
                  this.log('Debug:Enabled');
              } else {
                  this.log('Debug:Disabled');
                  this.log = noop;
                  this.error = noop;
              }
          }

          return isDebugging;
      },
      /**
       * Logs data to the console. Pass any number of parameters to be logged. Log output is not processed if the framework is not running in debug mode.
       * @method log
       * @param {object} info* The objects to log.
       */
      log: noop,
      /**
       * Logs an error.
       * @method error
       * @param {string|Error} obj The error to report.
       */
      error: noop,

      /**
       * Creates a deferred object which can be used to create a promise. Optionally pass a function action to perform which will be passed an object used in resolving the promise.
       * @method defer
       * @param {function} [action] The action to defer. You will be passed the deferred object as a paramter.
       * @return {Deferred} The deferred object.
       */
      defer: function(action) {
          return $.Deferred(action);
      },
      
  }


  return system;

});
