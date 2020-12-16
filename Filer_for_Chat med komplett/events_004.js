define(["komplett-pubsub"], function (pubsub) {
    /* eslint-disable no-unused-vars */
    var events = {
        sortTypeSelected: function (sortType) { }
    };
    /* eslint-enable no-unused-vars */

    return pubsub.extend(events);
});