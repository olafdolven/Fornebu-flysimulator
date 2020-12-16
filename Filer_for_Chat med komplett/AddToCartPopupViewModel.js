define(["ksc-ubo", "JScript/ShoppingCart/events", "JScript/Common/helper", "Components/BuyButton/AddToCartNotificationViewModel"], function (kscUbo, events, helper, AddToCartVM) {
    function AddToCartPopupViewModel(initObject, when) {
        when(events.cartNewItem).do(function (product, preventPopup) {
            if (!preventPopup) {
                helper.triggerCustomEvent("openAddToCartPopup", { productId: product.sku, price: product.price });
            }
        });

        document.addEventListener("addToCart", function (data) {
            var product = data.detail;

            var addToCartInitObject = {
                id: product.regionalProductSku,
                linkURL: product.clickTrackingUrl,
                url: product.url,
                preventPopup: true,
                sellerId: product.sellerId,
                sellerName: product.sellerName,
                brand: product.brand,
                navigationPath: product.navigationPath,
                price: product.price,
                name: product.name,
                currencyCode: product.currencyCode,
                groupId: product.groupId,
                subGroupId: product.subGroupId,
                divisionId: product.divisionId,
                groupName: product.groupName,
                subGroupName: product.subGroupName,
                divisionName: product.divisionName
            };

            var addToCart = new AddToCartVM(addToCartInitObject, 1);

            addToCart.addToCartNotification();

            navigator.sendBeacon(product.clickTrackingUrl);
        });

        document.addEventListener("addToCart_showInsuranceInformation", function (data) {
            var contentModel = new kscUbo.uboAsyncContentModel();

            contentModel.header = "";
            contentModel.uboClass = "wide-content";
            contentModel.contentViewModel = function () { };
            contentModel.url = "/cart/api/safetydeal/getinfo";

            contentModel.actionElement = data.detail.element;

            kscUbo.uboService.openAsync(contentModel);
        });
    }

    return AddToCartPopupViewModel;
});