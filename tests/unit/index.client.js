var expect = require('chai').expect;
var jsdom = require('jsdom');
var I13nNode = require('react-i13n/dist/libs/I13nNode');
var ReactI13nMixpanel;
'use strict';

describe('mixpanel plugin client', function () {
  beforeEach(function (done) {
    jsdom.env('<html><head><script src="foo"/></head><body></body></html>', [], function (err, window) {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;
      global.location = window.location;
      global.mixpanel = {};

      ReactI13nMixpanel = require('../../index.client');
      done();
    });
  });

  it('mixpanel will be created once we create a plugin instance with default tracker ', function (done) {
    var mockToken = 'foo';
    global.mixpanel.init = function (token, config, name) {
      expect(token).to.eql(mockToken);
      expect(config).to.eql({});
      expect(name).to.be.undefined;
      done();
    };
    var reactI13nMixpanel = new ReactI13nMixpanel(mockToken);
  });

  it('mixpanel will be created once we create a plugin instance with customized tracker', function (done) {

    var mockToken = 'foo';
    var name = 'myTracker';
    var mockConfig = {
      token: mockToken,
      name: name
    };
    global.mixpanel.init = function (token, config, name) {
      expect(token).to.eql(mockToken);
      expect(config).to.eql(mockConfig);
      done();
    };
    var reactI13nMixpanel = new ReactI13nMixpanel({
      token: mockToken,
      name: name
    });
  });

  it('ga will fire event beacon for click handler', function (done) {
    var mockToken = 'foo';
    global.mixpanel.init = function (token, config, name) {
      expect(token).to.eql(mockToken);
      expect(config).to.eql({});
      expect(name).to.be.undefined;
      done();
    };
    var reactI13nMixpanel = new ReactI13nMixpanel(mockToken);

    var i13nNode = new I13nNode(
      null,
      {
        category: 'foo',
        action: 'bar',
        label: 'baz',
        nonInteraction: true,
        value: 1
      }
    );
    global.mixpanel.track = function (eventName, properties, callback) {
        expect(eventName).to.eql('bar');
        expect(properties.category).to.eql('foo');
        expect(properties.action).to.eql('bar');
        expect(properties.label).to.eql('baz');
        expect(properties.value).to.eql(1);
        expect(properties.nonInteraction).to.eql(true);

        callback.hitCallback && callback.hitCallback();
    };
    reactI13nMixpanel.getPlugin().eventHandlers.click({
        i13nNode: i13nNode
    }, function beaconCallback () {
        done();
    });
  });
});
