define(["PagesAsync/ReviewList/events", "Components/ReviewsSortingControl/events"], function (events, sortingControlsEvents) {
    function ViewModel(initObject, when) {
        var self = this;
        var loadReviewCount = 0;
        var replaceContent = false;
        var chunckSize = initObject.loadSize;

        this.productTitle = ko.observable(initObject.title);
        this.pageIndex = ko.observable(0);
        this.content = ko.observable("");
        this.loadedSize = ko.observable(0);
        this.totalSize = ko.observable(initObject.totalSize);
        this.isLoading = ko.observable(false);
        this.sizeToLoad = ko.observable(initObject.initialLoadSize);
        this.isLoadingMore = ko.observable(false);
        this.selectedSortingType = ko.observable({ id: "ByDate" });

        this.hasMore = ko.computed(function () {
            return self.loadedSize() < self.totalSize();
        });

        this.isInitialLoadWithMore = ko.computed(function () {
            return self.hasMore() && !self.isLoadingMore();
        });

        this.countShown = ko.computed(function () {
            if (!self.hasMore()) {
                return initObject.totalSize;
            }
            return self.pageIndex() + initObject.loadSize;
        });

        this.showMoreCount = function () {
            var count = self.totalSize() - self.loadedSize();
            if (count > chunckSize) {
                return chunckSize;
            }

            return count;
        };

        when(events.reviewRemoved).do(function () {
            self.totalSize(self.totalSize() - 1);
            self.loadedSize(self.loadedSize() - 1);
        });

        when(sortingControlsEvents.sortTypeSelected).do(function (sortType) {
            self.selectedSortingType(sortType);

            loadReviewCount = 0;
            replaceContent = true;

            self.pageIndex(0);
            self.loadedSize(0);
            self.sizeToLoad(initObject.initialLoadSize);

            self.loadReviews();
        });

        this.loadReviews = function () {
            if (!self.hasMore()) {
                return;
            }

            self.isLoading(true);
            self.isLoadingMore(true);

            var url = '/PagesAsync/ReviewList/' + initObject.actionName + "/" + initObject.id;
            var params = {
                startIndex: self.loadedSize(),
                size: self.sizeToLoad(),
                reviewRowsType: initObject.reviewRowsType,
                sortType: self.selectedSortingType().id,
                title: self.productTitle()
            };
            var query = Object.keys(params)
                .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); } )
                .join('&');

            fetch(url + "?" + query)
                .then(function (response) {
                    if (!response.ok) { return; }
                    return response.text();
                })
                .then(function (data) {
                    if (!data) {
                        self.isLoading(false);
                        self.loadedSize(0);
                        self.totalSize(-1);
                        return;
                    }
                    loadReviewCount++;

                    if (replaceContent) {
                        self.content(data);
                        replaceContent = false;
                    } else {
                        self.content(self.content() + data);
                    }

                    self.pageIndex(self.pageIndex() + 1);
                    self.loadedSize(self.loadedSize() + self.sizeToLoad());
                    self.sizeToLoad(self.showMoreCount());
                    self.isLoading(false);
                });
        };

        self.loadReviews();
    }

    return ViewModel;
});