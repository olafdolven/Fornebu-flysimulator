define([
    "Components/ProductCarusel/events"
], function (
    caruselEvents
) {
    function MediumImageCaruselViewModel(initObject, when) {
        var self = this;

        this.activeSlideIndex = ko.observable(1);
        this.swiper = ko.observable();
        this.fullScreenVideo = ko.observable(false);

        this.click = function () {
            var slideIndex = self.swiper() ? self.swiper().clickedIndex || self.activeSlideIndex() : self.activeSlideIndex();
            caruselEvents.largeGalleryOpened.publish(slideIndex);
        };

        this.slideTo = function (number) {
            var swiper = self.swiper();
            if (swiper) {
                swiper.slideTo(number + 1, 0);
            }
        };

        this.onSlideChange = function (options) {
            stopVideo(options.activeSlide);
        }

        if (initObject && initObject.displayVideo) {
            this.videoPlaylist = ko.observableArray(initObject.videoPlaylist);
        }

        function stopVideo(slide) {
            if (slide) {
                var iFrame = slide.querySelector('.video-wrapper iframe.embed-responsive-item');
                if (iFrame) {
                    iFrame.src = iFrame.getAttribute('src');
                }
            }
        }

        when(caruselEvents.slideClicked).do(function (number) {
            self.slideTo(number);
        });
    }

    return MediumImageCaruselViewModel;
});