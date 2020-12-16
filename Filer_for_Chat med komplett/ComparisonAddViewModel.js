define(["Components/ComparisonWidget/events"],
    function (events) {
        function CompareAddViewModel(initObject) {
            this.addToCompare = function setCookie() {
                events.addedToComparison.publish(initObject.sku);
            };
        }

        return CompareAddViewModel;
    });