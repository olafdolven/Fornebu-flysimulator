define(["ksc-interaction-tracking", "JScript/Common/colorChanger"], function (GAEvents, lightenDarkenColor) {
    function ProductVariantsViewModel(initObject) {
        var self = this;
        this.products = initObject.products;
        this.type = initObject.type;
        this.lightenDarkenColor = lightenDarkenColor;
        var NUMBER_OF_VARIANTS_TO_SHOW = 5;

        this.trackInteractionClick = function (sku) {
            return function () {
                GAEvents.trackFullInteraction("ProductList", "ClickVariant", "ProductId", sku);
                return true;
            };
        };

        this.showMore = ko.pureComputed(function() {
            return self.products.length > NUMBER_OF_VARIANTS_TO_SHOW;
        });

        this.visibleProducts = ko.pureComputed(function() {
            return self.products.slice(0, NUMBER_OF_VARIANTS_TO_SHOW);
        });

    }

    return ProductVariantsViewModel;
});