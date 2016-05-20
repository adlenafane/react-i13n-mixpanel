var ReactI13nMixpanel = function (trackingId) {

};

ReactI13nMixpanel.prototype.getPlugin = function () {
    return {
        name: 'mixpanel',
        eventHandlers: {
            pageview: function (payload, callback) {
                // we are able to fire server side beacon,
                // and we can execute pageview event on componentWillMount to make it happen on both server side and client side
                // do nothing for now
            },
            command: function (payload, callback) {
                // do nothing for now
            }

        }
    };
}

module.exports = ReactI13nMixpanel;
