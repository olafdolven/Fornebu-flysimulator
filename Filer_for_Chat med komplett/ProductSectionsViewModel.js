define([
    "ksc-breakpoint-notifier",
    "Components/ProductMainInfo/events",
    "Components/ProductSections/events",
    "JScript/Common/requestContext"
], function (
    breakpointNotifier,
    productMainInfoEvents,
    events,
    requestContext
) {
    function ViewModel(initObject, when) {
        var currentLocation = location.hash.replace("#", "");
        var self = this;

        this.user = requestContext;
        this.sectionId = initObject.section;
        this.isOpen = ko.observable(self.sectionId === currentLocation);
        this.screenIsMd = ko.observable(false);
        this.screenIsLg = ko.observable(false);
        this.ariaExpanded = ko.computed(function () {
            if (self.screenIsMd() || self.screenIsLg()) {
                return true;
            }
            return self.isOpen().toString();
        });
        self.activeSectionId = ko.observable(currentLocation);
        this.isSelected = ko.observable(false);

        this.toggle = function () {
            self.isOpen(!self.isOpen());
            events.sectionOpen.publish(self.sectionId, self.isOpen());
        };

        when(events.activeSectionId).do(function (sectionId) {
            self.activeSectionId(sectionId);

            if (self.screenIsMd() || self.screenIsLg()) {
                if (sectionId === self.sectionId) {
                    self.isOpen(true);
                } else {
                    self.isOpen(false);
                }
                events.sectionOpen.publish(self.sectionId, self.isOpen());
            }
        });

        when(productMainInfoEvents.openProductReviewSection).do(function () {
            if (self.sectionId === "reviews") {
                self.isOpen(true);
            }
        });

        events.sectionOpen.publish(self.sectionId, false);

        when(events.sectionOpen).isSubscribedTo(function (trigger) {
            trigger(self.sectionId, false);
        });

        when(breakpointNotifier.events.isMd).do(function (isMd) {
            self.screenIsMd(isMd);
        });

        when(breakpointNotifier.events.isLg).do(function (isLg) {
            self.screenIsLg(isLg);
        });

        when(events.sectionMenuItemChosen).do(function (sectionId) {
            if (sectionId === self.sectionId) {
                self.isSelected(true);
            }
        });
    }

    return ViewModel;
});