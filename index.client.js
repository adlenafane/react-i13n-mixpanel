var debug = require('debug')('MixpanelI13nPlugin');
var DEFAULT_CATEGORY = 'all';
var DEFAULT_ACTION = 'click';
var DEFAULT_LABEL = '';

/**
 * @class ReactI13nMixpanel
 * @param {String} token
 * @param {Object} config
 * @param {String} config.token (mandatory)
 * @param {String} config.name (optional)
 * @constructor
 */
var ReactI13nMixpanel = function (config) {
  var _config = typeof(config) == 'object' ? config : {},
    token = '';

  token = typeof(config) == 'object' ? config.token : config;

  if (!token) {
    debug('token is mandatory');
  }

  (function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);

  if (mixpanel.__loaded) return;
  mixpanel.init(
    token,
    _config,
    _config.name || undefined
  );
};

/**
 * get plugin object
 * @method getPlugin
 * @return {Object} plugin object
 */
ReactI13nMixpanel.prototype.getPlugin = function () {
  return {
    name: 'mixpanel',
    eventHandlers: {
      click: function (payload, callback) {
        var i13nNode = payload.i13nNode;
        if (i13nNode) {
          var model = i13nNode.getMergedModel();

          model.action = model.action || DEFAULT_ACTION,
          model.category = model.category || DEFAULT_CATEGORY,
          model.label = model.label || i13nNode.getText(payload.target) || DEFAULT_LABEL,
          model.value = model.value || 0,
          model.nonInteraction = model.nonInteraction || false

          mixpanel.track(
            model.action,
            model,
            callback
          )
        } else {
          callback && callback();
        }
      }
    }
  };
}

module.exports = ReactI13nMixpanel;
