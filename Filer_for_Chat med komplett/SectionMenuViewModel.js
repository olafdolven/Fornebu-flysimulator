define([
    "JScript/Common/pushStateNavigationService",
    "Components/ProductSections/events",
    "ksc-breakpoint-notifier",
    "Components/ProductMainInfo/events",
    "ksc-alert"
], function (pushState, events, breakpointNotifier, productMainInfoEvents, kscAlert) {
    function SectionMenuViewModel(initObject, when) {
        var self = this;
        this.isStuck = ko.observable(false);
        this.isOutOfView = ko.observable({ topExceeded: false, bottomExceeded: false });
        this.activeSectionId = ko.observable("");
        this.sections = ko.observableArray();
        this.currentScreenSize = ko.observable("");
        this.previousScreenSize = ko.observable("");
        var percentageOfViewportHeight = 5;// indicates percentage of the viewport height


        this.isOutOfView.subscribe(function (newValue) {
            self.isStuck(newValue.topExceeded);
            kscAlert.events.toggleWrapperCss.publish("product-offset", newValue.topExceeded);
        });

        this.activeSectionId.subscribe(function (elementId) {
            pushState.replaceState("#" + elementId);
            events.activeSectionId.publish(elementId);
        });

        when(events.sectionOpen).do(function (sectionId, isOpen) {
            var index = -1;
            for (var i = 0; i < self.sections().length; i++) {
                if (self.sections()[i].id == sectionId) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                self.sections.push({ id: sectionId, isOpen: isOpen });
            } else {
                self.sections()[index].isOpen = isOpen;
            }
            detectActiveSection();
        });

        function getSectiontbyId(id) {
            return document.getElementById(id);
        }

        function findElementClosesttoZoneBorder(elements, activeZoneBorder) {
            var closestId = elements[0];
            var closestDistance = activeZoneBorder - getSectiontbyId(closestId).getBoundingClientRect().top;

            elements.forEach(function (e) {
                var currentId = e;
                var currentDistance = activeZoneBorder - getSectiontbyId(e).getBoundingClientRect().top;

                if (currentDistance < closestDistance) {
                    closestId = currentId;
                    closestDistance = currentDistance;
                }
            });
            return closestId;
        }

        function detectActiveSection() {
            var windowHeight = window.innerHeight;
            var activeZoneBorder = windowHeight / 100 * percentageOfViewportHeight;
            var spyableElements;
            if (self.currentScreenSize() === "md" || self.currentScreenSize() === "lg") {
                spyableElements = self.sections().slice();
            } else {
                spyableElements = self.sections().slice().filter(function (e) {
                    return e.isOpen;
                });
            }
            spyableElements.reverse();

            var elementId;

            if (spyableElements.length === 0) {
                elementId = "";
            } else {
                var elements = spyableElements.filter(function (e, i) {
                    var elementTop = getSectiontbyId(e.id).getBoundingClientRect().top;
                    if (i === 0) {// If the last section is too low its not possible to scroll down to trigger it (accessories sect with only 1 product)
                        elementTop = elementTop - 90;
                    }
                    return elementTop < activeZoneBorder;
                }).map(function (e) {
                    return e.id;
                }) || "";

                if (elements.length < 1) {
                    elementId = "";
                } else if (elements.length === 1) {
                    elementId = elements[0];
                } else {
                    elementId = findElementClosesttoZoneBorder(elements, activeZoneBorder);
                }
            }
            if (self.activeSectionId() !== elementId) {
                self.activeSectionId(elementId);
            }
        }

        function scrollToTopOfSection(sectionId) {
            var activeSection = getSectiontbyId(sectionId);
            if (activeSection != null) {
                var activeSectionScrollPosition = $(activeSection).offset().top;
                $("body, html").scrollTop(activeSectionScrollPosition);
            }
            when.addEventListener(window, "scroll", detectActiveSection, false);
        }

        function screenChangeBigSmall() {
            when.removeEventListener(window, "scroll", detectActiveSection);
            setTimeout(function () {
                scrollToTopOfSection(self.activeSectionId());
            }, 500);
        }

        function screenWasChangedBetweenBigAndSmall() {
            if (self.currentScreenSize() === "xs" || self.currentScreenSize() === "sm") {
                if (self.previousScreenSize() === "md" || self.previousScreenSize() === "lg") {
                    return true;
                }
            } else if (self.currentScreenSize() === "md" || self.currentScreenSize() === "lg") {
                if (self.previousScreenSize() === "xs" || self.previousScreenSize() === "sm") {
                    return true;
                }
            }
            return false;
        }

        when(breakpointNotifier.events.screenSizeChanged).do(function (size) {
            self.previousScreenSize(self.currentScreenSize());
            self.currentScreenSize(size);
            if (screenWasChangedBetweenBigAndSmall()) {
                screenChangeBigSmall();
            }
        });

        detectActiveSection();

        when.addEventListener(window, "scroll", detectActiveSection, false);

        when(productMainInfoEvents.openProductReviewSection).do(function () {
            scrollToTopOfSection("reviews");
        });

        this.sectionMenuItemChosen = function (id) {
            events.sectionMenuItemChosen.publish(id);
        };
    }

    return SectionMenuViewModel;
});