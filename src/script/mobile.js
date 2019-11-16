/* eslint-disable */
(function(context, document) {
  function addClass(el, cls) {
    el.className = el.className
      .split(' ')
      .concat(cls)
      .join(' ')
      .trim();
  }

  function addViewport(content) {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = Object.keys(content)
      .map(function(prop) {
        return prop + '=' + content[prop];
      })
      .join(',');
    document.getElementsByTagName('head')[0].appendChild(meta);
  }

  /*
   * minimal device type detection
   */

  var device = {};
  var userAgent =
    context.navigator.userAgent || context.navigator.vendor || context.opera;

  /*  */ if (/phone|mobile/i.test(userAgent) && !/ipad/i.test(userAgent)) {
    // addViewport({ 'width': 320, 'user-scalable':'no' });
    device.phone = true;
    addClass(document.documentElement, 'device-phone');
  } else if (
    /ipad|android|tablet/i.test(userAgent) ||
    'ontouchstart' in document.documentElement
  ) {
    // addViewport({ 'width': 'device-width', 'user-scalable': 'no', 'initial-scale': 1 });
    device.tablet = true;
    addClass(document.documentElement, 'device-tablet');
  }

  device.phone = !!device.phone;
  device.tablet = !!device.tablet;

  if (device.phone || device.tablet) {
    device.mobile = true;
    addClass(document.documentElement, 'device-mobile');

    /*
     * `shrink-to-fit=no` can fix width
     * https://codepen.io/tigt/post/meta-viewport-for-2015
     * cf. https://www.scottohara.me/blog/2018/12/11/shrink-to-fit.html
     */
    var viewport = {
      width: 'device-width',
      'initial-scale': 1 /*, 'shrink-to-fit': 'no'*/,
    };

    /* if facebook/instragram in-app browser */
    if (/fban|fbios|fbav|instagram/i.test(userAgent))
      viewport = {width: 320, 'initial-scale': 1, 'user-scalable': 'no'};

    addViewport(viewport);
  }

  device.desktop = !device.mobile;
  device.mobile = !device.desktop;

  context.Device = device;
})(self, document);
