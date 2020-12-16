define(["komplett-pubsub"], function (pubsub) {
    var events = {
        writeProductReview: function () { },
        openProductReviewSection: function () { },
        openReviewLogin: function () { },
        getReviewersNickname: function () { }
    };

    return pubsub.extend(events);
});