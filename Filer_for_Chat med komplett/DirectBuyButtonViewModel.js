define([
    "ksc-ubo",
    "ksc-alert",
    "JScript/Common/gaGetCookieValue",
    "JScript/Common/requestContext",
], function (kscUbo, kscAlert, gaGetCookieValue, requestContext) {
    function ViewModel(initObject) {
        var self = this;
        var productId = initObject.productId;
        var shippingPrice = initObject.shippingPrice;
        var invoiceInfoContent = initObject.invoiceContent;
        var invoiceInfoTitle = initObject.invoiceTitle;

        this.isLoading = ko.observable(false);
        this.cardsLoaded = ko.observable(false);
        this.hasCards = ko.observable(false);
        this.automationId = ko.computed(function () {
            if (self.hasCards()) {
                return "DirectBuyStoredCards";
            } else {
                return "DirectBuy";
            }
        }, this);

        this.directBuy = function (isStoreCard) {
            if (!self.isLoading()) {
                self.isLoading(true);
                kscAlert.events.removeAlerts();

                fetch("/gotocheckout/directbuy", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productId: productId,
                        shippingPrice: shippingPrice,
                        isStoreCard: isStoreCard,
                    }),
                })
                    .then(function (response) {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then(function (result) {
                        if (
                            Array.isArray(result.errorMessages) &&
                            result.errorMessages.length > 0
                        ) {
                            result.errorMessages.forEach(function (
                                errorMessage
                            ) {
                                kscAlert.events.alertAdded.publish(
                                    errorMessage.message,
                                    errorMessage.level
                                );
                            });
                            self.isLoading(false);
                        } else if (result.redirectUrl) {
                            gaGetCookieValue()
                                .then(function (gaCookieValue) {
                                    location.href = addGaCookieValueToUrl(
                                        result.redirectUrl,
                                        gaCookieValue
                                    );
                                })
                                .catch(function () {
                                    location.href = result.redirectUrl;
                                });
                        } else {
                            kscAlert.events.alertAdded.publish(
                                "No redirect url.",
                                "error"
                            );
                            self.isLoading(false);
                        }
                    })
                    .catch(function () {
                        kscAlert.events.alertAdded.publish(
                            "Could not complete purchase",
                            "error"
                        );
                        self.isLoading(false);
                    });
            }
        };

        function loadCards() {
            fetch("/directbuybutton/getprofilestorecardinfo")
                .then(function (response) {
                    if (!response.ok) {
                        return;
                    }
                    return response.json();
                })
                .then(function (response) {
                    if (!response) {
                        return;
                    }
                    self.cardsLoaded(true);
                    self.hasCards(response.Data.HasCards);
                });
        }

        function addGaCookieValueToUrl(url, gaCookieValue) {
            var gaCookieValueSplit = gaCookieValue.split("=");
            var newUrl = new URL(url);
            newUrl.searchParams.set(
                gaCookieValueSplit[0],
                gaCookieValueSplit[1]
            );
            return newUrl.href;
        }

        this.openInformation = function () {
            var uboInvoiceContentModel = new kscUbo.uboSyncContentModel();

            uboInvoiceContentModel.header = invoiceInfoTitle;
            uboInvoiceContentModel.content = invoiceInfoContent;
            uboInvoiceContentModel.uboClass = "direct-buy-button__modal";

            return kscUbo.uboService.openSync(uboInvoiceContentModel);
        };

        init: {
            var notCrm = (requestContext.isCrm || false) === false;
            var b2c = requestContext.isBusinessCustomer === false;
            var loggedIn = requestContext.isAnonymous === false;

            if (loggedIn && b2c && notCrm) {
                loadCards();
            }
        }
    }

    return ViewModel;
});
