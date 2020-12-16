define([], function () {
    var localStorageKey = "Komplett.ProductComparisonIds";
    var localStorageKeyClosed = "Komplett.ProductComparisonClosed";

    function StorageProvider(handlers) {
        try {
            localStorage.setItem("IsAvailable", true);

            window.addEventListener("storage", function (evt) {
                if (evt.key === localStorageKey) {
                    onProductChange(evt);
                }

                if (evt.key === localStorageKeyClosed) {
                    handlers.onToggleWidget();
                }
            });
        } catch (err) {
            throw new Error("Not Available");
        }

        function onProductChange(evt) {
            var newValue = JSON.parse(evt.newValue) || [];
            var oldValue = JSON.parse(evt.oldValue) || [];

            var productAdded = newValue.filter(function (i) {
                return oldValue.indexOf(i) < 0;
            });
            var productRemoved = oldValue.filter(function (i) {
                return newValue.indexOf(i) < 0;
            });

            if (productAdded.length > 0) {
                handlers.onAddProduct(productAdded[0]);
            }

            if (productRemoved.length > 0) {
                handlers.onRemoveProduct(productRemoved[0]);
            }
        }
    }

    StorageProvider.updateLocaleStorage = function updateLocalStorage(id) {
        var comparisonIds = localStorage.getItem(localStorageKey);
        if (comparisonIds) {
            var ids = JSON.parse(comparisonIds);
            if (ids.indexOf(id) === -1) {
                ids.push(id);
                localStorage.setItem(localStorageKey, JSON.stringify(ids));
            }
        } else {
            localStorage.setItem(localStorageKey, JSON.stringify([id]));
        }
    };

    StorageProvider.removeFromLocalStorage = function removeFromLocalStorage(id) {
        var comparisonIds = localStorage.getItem(localStorageKey);
        if (comparisonIds) {
            var ids = JSON.parse(comparisonIds);
            if (ids.indexOf(id) > -1) {
                var newValue = ids.filter(function (elem) {
                    return elem !== id;
                });
                localStorage.setItem(localStorageKey, JSON.stringify(newValue));
            }
        }
    };

    StorageProvider.getLocalStorageValue = function getLocalStorageValue() {
        var value = localStorage.getItem(localStorageKey);
        if (value) {
            return JSON.parse(value);
        }

        return [];
    };

    StorageProvider.isMinimized = function () {
        return JSON.parse(localStorage.getItem(localStorageKeyClosed));
    };

    StorageProvider.toggleWidget = function (status) {
        localStorage.setItem(localStorageKeyClosed, status);
    };

    return StorageProvider;
});