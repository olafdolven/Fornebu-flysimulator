define(["komplett-pubsub"], function (pubsub) {
    /* eslint-disable no-unused-vars */
    var events = {
        slideClicked: function (number) { },
        largeGalleryOpened: function (slideIndex) { }
    };
    /* eslint-enable no-unused-vars */
    return pubsub.extend(events);
});