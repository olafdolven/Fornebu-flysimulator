define(["PagesAsync/Login/LoginResponsiveViewModel", "Components/ProductMainInfo/events"], function (LoginViewModel, events) {
    function viewModel(initObject, when) {
        var self = this;

        $.extend(this, new LoginViewModel(initObject, when()));

        var uboTriggeredWithoutElement = false;

        self.element = ko.observable();

        self.element.subscribe(function () {
            if (uboTriggeredWithoutElement) {
                openUbo();
            }
        });

        function openUbo() {
            if (self.element() === void 0) {
                uboTriggeredWithoutElement = true;
            } else {
                self.open(null, null, self.element());
                uboTriggeredWithoutElement = false;
            }
        }

        when(events.openReviewLogin).do(function () {
            openUbo();
        });

        if (initObject.show) {
            openUbo();
        }
    }

    return viewModel;
});