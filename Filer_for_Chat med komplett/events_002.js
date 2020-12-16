define(["komplett-pubsub"], function (pubsub) {
    var events = {
        loadComparisonWidget: function () {
        },
        addedToComparison: function () {
        }
    };
    return pubsub.extend(events);
});