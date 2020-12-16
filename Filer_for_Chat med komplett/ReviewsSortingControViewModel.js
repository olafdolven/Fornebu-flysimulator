define(["Components/ReviewsSortingControl/events"], function (events) {
    function ReviewsSortingControViewModel(initobject) {
        var self = this;

        this.ariaExpanded = ko.observable(false);
        this.sortTypes = ko.observableArray(initobject.sortTypes);
        this.selectedSortingType = ko.observable(initobject.sortTypes[0]);
        this.displayPopover = ko.observable(false);

        this.selectedSortingTypeText = ko.computed(function () {
            if (!self.selectedSortingType()) {
                return "";
            }

            return self.selectedSortingType().text;
        });

        this.selectedSortingType.subscribe(function (newSortType) {
            events.sortTypeSelected.publish(newSortType);
        });

        this.togglePopoverVisibility = function () {
            self.displayPopover(true);
        };

        this.select = function (sortType) {
            if (sortType.id != self.selectedSortingType().id) { // eslint-disable-line eqeqeq
                self.selectedSortingType(sortType);
            }
            self.displayPopover(false);
        };
    }

    return ReviewsSortingControViewModel;
});