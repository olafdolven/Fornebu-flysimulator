define(["Components/ProductSections/events", "Components/ProductMainInfo/events"], function (events, productMainInfoEvents) {
    function WriteProductReviewViewModel(initObject, when) {
        var self = this;

        this.show = ko.observable(initObject && initObject.show);

        this.open = function () {
            events.showWriteProductReviewForm.publish();
            self.show(false);
        };

        when(events.showWriteProductReviewButton).do(function () {
            self.show(true);
        });

        when(productMainInfoEvents.writeProductReview).do(function () {
            self.show(false);
        });
    }

    return WriteProductReviewViewModel;
});