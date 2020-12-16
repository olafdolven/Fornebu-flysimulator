define(["komplett-pubsub"], function (pubsub) {
    /* eslint-disable no-unused-vars */
    var events = {
        showWriteProductReviewForm: function () { },
        hideWriteProductReviewForm: function () { },
        showWriteProductReviewButton: function () { },
        activeSectionId: function (sectionId) { },
        sectionOpen: function (sectionId, isOpen) { },
        sectionMenuItemChosen: function (sectionId) { }

    };
    /* eslint-enable no-unused-vars */
    return pubsub.extend(events);
});