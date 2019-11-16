/* eslint-disable */
/*
 * app kernel
 * module loading and js helpers
 */
(function(context, document) {
  var app = {},
    _m = {};

  app.html = document.documentElement;

  /*
   * e.g. :
   *  if(app.processed(this))
   *    return;
   */
  app.processed = function(name) {
    /* @debug */
    app.debug("module '" + name + "' processed.");
    /* @enddebug */
    return _m[name] ? true : !(_m[name] = true);
  };

  // todo: set hash if specified
  app.hash = function(hash) {
    return document.location.hash.replace('#', '');
  };

  app.$ = function(selector) {
    // partial support in ie8 (css 2.1 selectors only)
    return document.querySelectorAll(selector);
  };

  app.rootfs = function() {
    // not supported by ie8 and earlier
    return parseInt(
      context.getComputedStyle(app.html)['font-size'].replace('px', ''),
      10,
    );
  };

  app.locale = function() {
    return (
      app.html.lang ||
      context.navigator.userLanguage ||
      context.navigator.language
    );
  };

  app.debug = function(message) {
    /* @debug */
    console.log(
      '\ud83d\udea7 [' + new Date().toLocaleTimeString() + '] %c' + message,
      'color: #f66',
    );
    /* @enddebug */
  };

  var deps = {},
    stack = [];
  var __soft_error = false;

  /* @debug */
  var __remaining = 0;
  /* @enddebug */

  app.require = function(name, settings) {
    var d = deps[name] || false;

    if (!d || ++d.tries > Object.keys(deps).length) {
      __soft_error = true;
      throw new Error(
        "module '" + name + "' (" + (d.tries || '*') + ") couldn't be loaded.",
      );
    }

    return d.loaded ? d.cache : d(context, settings || {});
  };

  app.define = function(name, module) {
    /* @debug */
    __remaining++;
    /* @enddebug */
    deps[name] = function(context, settings) {
      try {
        deps[name].cache = module(jQuery, context, settings);
        deps[name].loaded = true;
        /* @debug */
        __remaining--;
        app.debug(
          "module '" +
            name +
            "' [" +
            (Object.keys(deps).length - __remaining) +
            '/' +
            Object.keys(deps).length +
            '] loaded.',
        );
        /* @enddebug */
      } catch (err) {
        if (__soft_error) throw err;
        /* @debug */
        app.debug("error in module '" + name + "':");
        /* @enddebug */
        console.error(err);
      }
    };

    deps[name].id = name;
    deps[name].loaded = false;
    deps[name].cache = undefined;
    deps[name].tries = 0;

    /* register in Drupal */
    if ('Drupal' in context)
      return (Drupal.behaviors[name] = {attach: deps[name]});

    /* load all the module not yet loaded */
    stack.unshift(deps[name]);
    try {
      stack
        .filter(function(m) {
          return !m.loaded;
        })
        .map(function(m) {
          app.require(m.id);
        });
    } catch (err) {
      /* @debug */
      app.debug(err.message);
      /* @enddebug */
      __soft_error = false;
    }
  };

  context.app = app;
})(self, document);
