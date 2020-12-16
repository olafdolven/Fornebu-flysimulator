define(["PageDependentComponents/Recommendations/RecommendationsViewModel", "ksc-ubo"],
    function (RecommendationsViewModel, kscUbo) {
        function ProductRecommendationsViewModel(initObject, when) {

            initObject.options = { lgSlidesPerView: 3, mdSlidesPerView: 2 };

            $.extend(this, new RecommendationsViewModel(initObject, when()));

            this.showBuyButton(true);
        }

        this.priceOnRequestModal = function (data, event) {
            var asyncViewModel = new kscUbo.uboAsyncContentModel();
            asyncViewModel.uboClass = "price-on-request__modal";
            asyncViewModel.url = "/PagesAsync/PriceOnRequest/Show/" + data.id;

            asyncViewModel.actionElement = event.currentTarget;
            return kscUbo.uboService.openAsync(asyncViewModel);
        }

        return ProductRecommendationsViewModel;
    });