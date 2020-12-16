define(["Components/ComparisonWidget/events", "Components/ComparisonWidget/ComparisonWidgetStorageProvider"], function (events, storageProvider) {
    function ComparisonWidgetViewModel(initObject, when) {
        var self = this;
        var safeDelay = 300;

        this.fallbackCookie = ko.observable(false);
        try {
            storageProvider({
                onToggleWidget: onToggleWidget,
                onAddProduct: onAddProduct,
                onRemoveProduct: onRemoveProduct
            });
        } catch (err) {
            self.fallbackCookie(true);
        }

        function onToggleWidget() {
            self.isMinimized(!self.isMinimized());
            setHeight();
        }

        function onAddProduct(product) {
            return fetchProduct(product);
        }

        function onRemoveProduct(sku) {
            var removedProduct = self.products().filter(function (product) {
                return product.sku === sku;
            })[0];
            if (!removedProduct.willBeRemoved()) {
                return self.removeElement(removedProduct);
            }
        }

        this.products = ko.observable([]);
        this.productsIds = ko.computed(function () {
            return self.products().map(function (product) {
                return product.sku;
            });
        });

        this.isAvailable = ko.observable(false);
        this.isVisible = ko.observable(false);

        this.isMinimized = ko.observable(false);
        this.isMinimizedThrottled = ko.computed(function () {
            return self.isMinimized();
        }).extend({ throttle: 100 });
        this.minimizedText = ko.observable("");

        this.expandIconClass = ko.computed(function () {
            return self.isMinimized()
                ? 'icon icon-sm icomoon-plus-circle-2 comparison-widget__icon'
                : 'icon icon-sm icomoon-minus-circle comparison-widget__icon';
        });

        this.measureHeight = ko.observable(0);
        this.currentHeight = ko.observable(0);
        this.lastHeight = ko.observable(0);
        this.initialHeight = ko.observable(70);

        if (!self.fallbackCookie()) {
            this.isMinimized(storageProvider.isMinimized());
        }

        this.compareLink = ko.computed(function () {
            var ids = getVisibleElements().map(function (item) {
                return "id=" + item.sku;
            });

            return "/compare?" + ids.join("&");
        });

        when(events.loadComparisonWidget).do(function () {
            self.isAvailable(true);
            fetchProducts();
        });

        when(events.addedToComparison).do(function (sku) {
            if (self.isAvailable()) {
                fetchProduct(sku);
            }
        });

        function fetchProduct(sku) {
            var useCookie = "";

            if (self.fallbackCookie()) {
                useCookie = "&cookie=true";
            }

            if (self.productsIds().indexOf(sku) === -1) {
                $.getJSON("/ComparisonWidget/GetProduct?sku=" + sku + useCookie, function (data) {
                    if (data) {
                        var object = new ComparisonWidgetModel(data, true);
                        var currentValue = self.products();
                        currentValue.push(object);

                        self.isVisible(true);
                        self.products(currentValue);

                        setHeight({ add: true });

                        if (!self.fallbackCookie()) {
                            storageProvider.updateLocaleStorage(sku);
                        }

                        setTimeout(function () {
                            object.hidden(false);
                            setPlaceholderText();
                        }, safeDelay);
                    }
                });
            }
        }

        function fetchProducts() {
            var query = "";

            if (self.fallbackCookie()) {
                query = "?cookie=true";
            } else {
                var values = storageProvider.getLocalStorageValue().join("&skus=");

                if (!values) {
                    return;
                }
                query = "?skus=" + values;
            }

            $.getJSON("/ComparisonWidget/GetProducts" + query,
                function (data) {
                    if (data && data.length) {
                        self.products(data.map(function (elem) {
                            return new ComparisonWidgetModel(elem, false);
                        }));
                        self.isVisible(true);
                        setPlaceholderText();
                        setHeight();
                    } else {
                        self.isVisible(false);
                    }
                });
        }

        this.removeElement = function (element) {
            if (self.fallbackCookie()) {
                fetch("/comparisonwidget/remove-product?sku=" + element.sku)
            }

            setHeight({ remove: true });

            element.hidden(true);
            element.willBeRemoved(true);

            setPlaceholderText();

            if (!self.fallbackCookie()) {
                storageProvider.removeFromLocalStorage(element.sku);
            }

            setTimeout(function () {
                var filteredProducts = self.products().filter(function (product) {
                    return product.sku !== element.sku;
                });

                self.products(filteredProducts);
            }, safeDelay);
        };

        this.minimize = function () {
            var newValue = !self.isMinimized();
            self.isMinimized(newValue);
            setHeight();

            if (!self.fallbackCookie()) {
                storageProvider.toggleWidget(newValue);
            }
        };

        function setHeight(addAdditional) {
            self.lastHeight(calculateHeight(addAdditional));

            if (self.isMinimized()) {
                self.lastHeight(self.currentHeight());
                self.currentHeight(self.initialHeight() + "px");
            } else {
                self.currentHeight(self.lastHeight());
            }
        }

        function calculateHeight(addAdditional) {
            var visibleProducts = getVisibleElements();
            var length = visibleProducts.length - 1;

            if (addAdditional) {
                if (addAdditional.add) {
                    length += 1;
                }

                if (addAdditional.remove) {
                    length -= 1;
                }
            }

            if (length < 0) {
                self.isVisible(false);
                self.currentHeight(0 + "px");
            } else if (length > 0) {
                return self.initialHeight() + (length * 45) + "px";
            } else {
                return self.initialHeight() + "px";
            }
        }

        function setPlaceholderText() {
            var visibleElements = getVisibleElements();
            if (visibleElements.length > 1) {
                return self.minimizedText(visibleElements[0].name + " + " + (visibleElements.length - 1).toString() + " andre produkter");
            }

            if (visibleElements[0]) {
                return self.minimizedText(visibleElements[0].name);
            }

            return self.minimizedText("");
        }

        function getVisibleElements() {
            return self.products().filter(function (value) {
                return !value.hidden();
            });
        }

        function ComparisonWidgetModel(data, hidden) {
            return {
                image: data.image,
                name: data.name,
                sku: data.sku,
                hidden: ko.observable(hidden || false),
                willBeRemoved: ko.observable(false),
                removeElement: self.removeElement,
                isMinimized: self.isMinimized
            };
        }
    }

    return ComparisonWidgetViewModel;
});