define([], function () {
    function ReviewItemViewModel(initObject) {
        var self = this;

        var initRowId = initObject.initialId;

        this.sku = initObject.sku;
        this.productReviewId = initObject.productReviewId;

        this.itemIsDeleted = ko.observable(false);

        this.countOfLikes = ko.observable(initObject.countOfLikes);
        this.totalVotes = ko.observable(initObject.totalVotes);

        this.isLoading = ko.observable(false);
        this.hasVoted = ko.observable(false);

        self.isFocused = ko.observable(false);

        this.upVote = function () {
            self.requestVote(true);
        };

        this.downVote = function () {
            self.requestVote(false);
        };

        this.requestVote = function (upVote) {
            self.isLoading(true);
            self.hasVoted(true);
            self.countOfLikes(self.countOfLikes() + (upVote ? 1 : 0));
            self.totalVotes(self.totalVotes() + 1);
            var direction = upVote ? "Up" : "Down";
            fetch("/PagesAsync/ReviewList/VoteReview" + direction, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productReviewId: self.productReviewId,
                    sku: self.sku,
                }),
            }).then(function (response) {
                if (!response.ok) return;
                self.responseHandlerVote();
            });
        };

        this.responseHandlerVote = function () {
            self.isLoading(false);
        };

        init: {
            if (self.productReviewId === initRowId) {
                self.isFocused(true);
            }
        }

        this.setNewSelf = function (newSelf) {
            self = newSelf;
        };
    }

    return ReviewItemViewModel;
});
