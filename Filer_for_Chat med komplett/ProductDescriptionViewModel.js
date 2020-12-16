define([], function () {
    function ProductDescriptionViewModel(initObject) {
        var self = this;
        this.webtext1 = ko.observable(initObject.webtextLimited);
        this.displayShowAllButton = ko.observable(initObject.displayShowAllButton);

        this.showAll = function () {
            self.webtext1(initObject.webtext1All);
            self.displayShowAllButton(false);
        };
    }

    return ProductDescriptionViewModel;
});