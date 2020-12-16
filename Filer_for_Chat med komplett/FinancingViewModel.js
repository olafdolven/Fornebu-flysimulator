define(["ksc-ubo", "JScript/Common/requestContext"], function (kscUbo, requestContext) {
    function FinancingViewModel(initObject) {
        var self = this;

        this.header = initObject.title;
        this.sku = initObject.sku;
        this.isVisible = ko.observable();
        this.isVisibleThrottled = ko.computed(self.isVisible).extend({ "throttle": 5 });

        setTimeout(function () {
            self.isVisible(!requestContext.isBusinessCustomer);
        }, 0);

        this.financingContentModel = function () {
        };

        this.open = function (data, event) {
            var financingViewModel = new kscUbo.uboAsyncContentModel();

            financingViewModel.header = self.header;
            financingViewModel.contentViewModel = self.financingContentModel;
            financingViewModel.url = "/PagesAsync/FinancingInfo/Show/" + self.sku;

            financingViewModel.actionElement = event.currentTarget;

            return kscUbo.uboService.openAsync(financingViewModel);
        };
    }

    return FinancingViewModel;
});