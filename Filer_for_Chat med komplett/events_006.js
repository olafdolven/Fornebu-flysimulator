define(["komplett-pubsub"], function (pubsub) {
    var events = {
        reviewRemoved: function () { }
    };

    return pubsub.extend(events);
});