define([
    "Components/ProductCarusel/events",
    "ksc-breakpoint-notifier",
    "Layout/events"
], function (
    caruselEvents,
    breakpointNotifier,
    layoutEvents
) {
    function LargeImageCarouselViewModel(initObject, when) {
        var self = this;
        var selectedSlide;
        var videoUrl;

        this.isOpen = ko.observable(false);
        this.swiper = ko.observable();
        this.showLoader = ko.observable(false);
        this.showSwiper = ko.observable(true);

        self.isOpen.subscribe(function (isOpen) {
            layoutEvents.disableScrolling.publish(isOpen);
        });

        self.click = function () {
            self.swiper().slideNext(false, 0);
        };

        this.close = function () {
            updateVideoUrl(selectedSlide);
            self.isOpen(false);
        };

        function getVideoUrl(videoWrapper) {
            if (videoWrapper) {
                var iFrame = videoWrapper.querySelector('iframe.embed-responsive-item');
                if (iFrame) {
                    return iFrame.getAttribute("src");
                }
            }

            return null;
        }

        function updateVideoUrl(slide) {
            if (slide) {
                var videoWrapper = slide.querySelector('.video-wrapper');

                if (videoWrapper) {
                    var iFrame = videoWrapper.querySelector('iframe.embed-responsive-item');
                    if (iFrame) {
                        iFrame.setAttribute("src", videoUrl);
                    }
                }
            }
        }

        when(caruselEvents.largeGalleryOpened).do(function (slideIndex) {
            if (self.showSwiper()) {
                self.isOpen(true);

                var swiper = self.swiper();
                swiper.params.mousewheelControl = false;
                swiper.update(true);
                swiper.slideTo(slideIndex, 0);

                selectedSlide = swiper.slides[slideIndex];
                // Video is always set as last element. Swiper in loop mode adds duplicated nodes so we need to use lenght-2.
                videoUrl = getVideoUrl(swiper.slides[swiper.slides.length - 2].querySelector('.video-wrapper'));

                swiper.on('onSlideChangeStart', function (instance) {
                    updateVideoUrl(selectedSlide);
                    selectedSlide = instance.slides[instance.activeIndex];
                });
            }
        });

        when(breakpointNotifier.events.isXs).do(function (isXs) {
            self.showSwiper(!isXs);
            if (isXs) {
                self.isOpen(false);
            }
        });
    }
    return LargeImageCarouselViewModel;
});