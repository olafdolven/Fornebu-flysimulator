define(["Pages/ProductPage/events"], function (events) {
    function ProductPageViewModel(model, when) {
        var self = this;
        self.productPageHtml = ko.observable();
        self.isLoading = ko.observable(false);

        when(events.productPageLoading).do(function(state) {
            self.isLoading(state);
        });

        when(events.productPageChange).do(function (html) {
            self.productPageHtml(html);
        });
    }

    return ProductPageViewModel;
});