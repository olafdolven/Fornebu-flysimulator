define(["PageDependentComponents/RichRelevance/events", "ksc-breakpoint-notifier"], function (events, breakpointNotifier) {
    function EngageViewModel(initObject, when) {
        var self = this;

        this.noPlacementReturned = ko.observable(false);
        this.isRendered = ko.observable(false);
        this.showPlaceholderImage = ko.observable(true);
        this.isXs = ko.observable(false);
        this.engagePlacement = ko.observable();

        init: {
            when(breakpointNotifier.events.isXs).do(function (isXs) {
                self.isXs(isXs);
            });

            when(events.promosLoaded).do(function (placements) {
                var placement = placements.find(function (placement) {
                    return placement.placement_name.split(".").pop() == initObject.placementId;
                });

                if (!placement) {
                    self.noPlacementReturned(true);
                } else {
                    placement.mediaUrlComputed = ko.computed(function () {
                        if (!placement.media_URL_xs) {
                            return placement.media_URL;
                        }

                        return self.isXs() ? placement.media_URL_xs : placement.media_URL;
                    });

                    self.engagePlacement(placement);
                }
            });
        }
    }

    return EngageViewModel;
});