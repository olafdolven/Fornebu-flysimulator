define(["Components/ProductCarusel/events"], function (caruselEvents) {
    function SmallImageCaruselViewModel(initObject) {
        var self = this;

        this.initializeSlider = ko.observable(false);
        this.initializedSwiper = ko.observable(); // Will be initialized by custombinding
        this.slidesPerView = ko.observable();
        this.spaceBetweenSlides = ko.observable(0);
        this.isSwiper = ko.observable(false);

        this.slidesPerView.subscribe(function () {
            self.initializeSlider(true);
        });
        this.spaceBetweenSlides.subscribe(function () {
            self.initializeSlider(true);
        });

        this.clickedIndex = ko.observable();
        this.numberOfSlides = ko.observable(initObject.numberOfSlides);

        this.displaySwipeArrow = ko.computed(
            function () {
                return self.numberOfSlides() > self.slidesPerView();
            });

        this.clickedIndex.subscribe(function (slideNumber) {
            caruselEvents.slideClicked.publish(slideNumber);
        });

        this.goToSlide = function (slideNumber) {
            self.clickedIndex(slideNumber);
        };

        this.nextSlide = function () {
            var swiper = self.initializedSwiper();
            if (swiper) {
                swiper.slideNext();
            }
        };

        this.prevSlide = function () {
            var swiper = self.initializedSwiper();
            if (swiper) {
                swiper.slidePrev();
            }
        };
    }

    return SmallImageCaruselViewModel;
});