define(["Components/ComparisonWidget/events"],
    function (events) {
        function ComparisonShowViewModel(model, when) {
            when.setTimeout(function () {
                events.loadComparisonWidget.publish();
            }, 100);
        }

        return ComparisonShowViewModel;
    });