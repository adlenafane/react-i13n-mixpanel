# react-i13n-mixpanel

Mixpanel plugin for [react-i13n](https://github.com/yahoo/react-i13n)

[![npm version](https://badge.fury.io/js/react-i13n-mixpanel.svg)](http://badge.fury.io/js/react-i13n-mixpanel) [![Build Status](https://travis-ci.org/adlenafane/react-i13n-mixpanel.svg?branch=master)](https://travis-ci.org/adlenafane/react-i13n-mixpanel)

## Features
* Integrate [react-i13n](https://github.com/yahoo/react-i13n) to provide instrumentation approach using [Mixpanel](https://mixpanel.com/).
* [react-i13n](https://github.com/yahoo/react-i13n) handles the beaconing management and handle the click events, this plugin provides [event handlers](https://github.com/yahoo/react-i13n/blob/master/docs/guides/createPlugins.md) to handle these events.

## Install

```
npm install react-i13n-mixpanel
```

## Usage
You will need to create a instance of `react-i13n-mixpanel` first, then use `getPlugin` to get the plugin object, then pass it into [setupI13n](https://github.com/yahoo/react-i13n/blob/master/docs/api/setupI13n.md) provided by [react-i13n](https://github.com/yahoo/react-i13n), then it will help to decorate your `Top Level Component` with i13n `react-i13n-mixpanel` plugin functionalities.

```js
var reactI13nMixpanel = require('react-i13n-mixpanel');
var setupI13n = require('react-i13n').setupI13n;

var reactI13nMixpanel = new ReactI13nMixpanel([your token]); // create reactI13nMixpanel instance with your token
// or
var reactI13nMixpanel = new ReactI13nMixpanel({
    token: [mandatory, your token],
    config: [optional, Mixpanel config by default "{}"],
    name: [optional, customized instance name]
}); // create reactI13nMixpanel instance with config object

// Suppose that Application is your top level component, use setupI13n with this plugin
Application = setupI13n(Application, {}, [reactI13nMixpanel.getPlugin()]);
```

## Pageview Event
* Integrate [page tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages),

## Click Event
* Integrate [track method](https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track)
* Define the keys in `i13nModel`:
   * `action` - The eventName of the interaction, default set as `click`.
   * `category` - The category of the interaction, default set as `all`.
   * `label` - The label of the interaction, default set as `''`.
   * `value` - The value of the interaction, default set as `0`.
   * `nonInteraction` - The nonInteraction of the interaction, default set as `false`.
   * The all i13nModel will be send as properties to Mixpanel

You can integrate I13nAnchor provided by react-i13n to track the normal links.

```js
var I13nAnchor = require('react-i13n').I13nAnchor;

// in template, will fire event beacon as mixpanel.track('click', {'category': 'foo', 'action': 'click', label: 'Foo'});
<I13nAnchor i13nModel={{category: 'foo', action: 'click'}}>Foo</I13nAnchor>
```
You can also integrate integrate [createI13nNode](https://github.com/yahoo/react-i13n/blob/master/docs/api/createI13nNode.md#createi13nnodecomponent-options) or [I13nMixin](https://github.com/yahoo/react-i13n/blob/master/docs/api/createI13nNode.md#i13nmixin) to get your custom component be tracked

```js

var createI13nNode = require('react-i13n').createI13nNode;
var Foo = React.createClass({
    ...
});

Foo = createI13nNode(Foo, {
    isLeafNode: true,
    bindClickEvent: true,
    follow: false
});

// in template
<Foo i13nModel={{category: 'foo', action: 'click', label: 'Foo'}}>
    // if Foo is clicked, it will fire event beacon as mixpanel.track('click', {'category': 'foo', 'action': 'click', label: 'Foo'});
    ...
</Foo>
```

```js

var I13nMixin = require('react-i13n').I13nMixin;
var Foo = React.createClass({
    mixins: [I13nMixin],
    // you can set the default props or pass them as props when you are using Foo
    getDefaultProps: {
        isLeafNode: true,
        bindClickEvent: true,
        follow: false
    }
    ...
});

// in template
<Foo i13nModel={{category: 'foo', action: 'click', label: 'Foo'}}>
    // if Foo is clicked, it will fire event beacon as mixpanel.track('click', {'category': 'foo', 'action': 'click', label: 'Foo'});
    ...
</Foo>
```

For better instrumentation integration, you can leverage the [inherit architecture](https://github.com/yahoo/react-i13n/blob/master/docs/guides/integrateWithComponents.md), e.g., create a parent and define the `category` with default tracker, or specify `tracker`, so that all the links inside will apply it.

## Tracker Settings

You can also use the following methods to set properties of Mixpanel like [Super properties or User properties](https://mixpanel.com/help/reference/javascript).

```js
var userId = 'aa4ebd41203df5b8639e9fe48d4c6c7de7c4b053';
var dimension1 = 'administrator';
ReactI13n.getInstance().execute('setUsername', { userId: userId });
ReactI13n.getInstance().execute('setSuperProperties', { dimension1: dimension1 });
ReactI13n.getInstance().execute('setUserProperties', { dimension1: dimension1 });
ReactI13n.getInstance().execute('setUserPropertiesOnce', { dimension1: dimension1 });
```
