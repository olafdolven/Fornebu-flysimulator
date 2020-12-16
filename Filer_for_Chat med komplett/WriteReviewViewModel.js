define(["ksc-ubo",
    "JScript/Common/validator",
    "ksc-alert",
    "Components/ProductMainInfo/events",
    "Components/ProductSections/events"], function (kscUbo, validator, kscAlert, writeReviewEvents, showWriteReviewEvents) {
    function WriteReviewViewModel(initObject, when) {
        var self = this;
        this.productNumber = initObject.productNumber;
        this.isLoading = ko.observable(false);
        this.fadeVisible = ko.observable(false);

        this.fields = {
            title: validator.observable(""),
            nickname: validator.observable(""),
            rating: validator.observable(0),
            text: validator.observable(""),
            sku: initObject.productNumber
        };

        this.textWithFormating = ko.computed(function () {
            var result = "<p>" + self.fields.text() + "</p>";
            result = result.replace(/\r\n/g, "</p><p>").replace(/\n\n/g, "</p><p>");
            result = result.replace(/\n/g, "<br />");
            return result;
        });

        this.temporaryRating = ko.observable(0);
        this.rating = ko.computed(function () {
            return self.temporaryRating() || self.fields.rating();
        });

        this.show = ko.observable(initObject.show);
        this.toggleShow = function () {
            self.show(true);
        };

        this.postReview = function () {
            var url = "/PagesAsync/WriteReview/PostProductReview";
            self.isLoading(true);
            $.ajax({
                url: url,
                data: validator.unwrapValues(self.fields),
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                async: true,
                success: self.reviewSent,
                error: self.responseError,
                fail: self.responseError
            });

            return false;
        };

        this.reviewSent = function (data) {
            if (data && !data.IsSuccess) {
                validator.mapErrors(data.Errors, self.fields);
            } else {
                self.showThankYou();
            }

            self.isLoading(false);
        };

        this.responseError = function (xmlHttpRequest, textStatus, error) {
            var errorText = error.name || error;
            if (typeof error === "string" && error.trim() === "") {
                errorText = textStatus;
            }

            kscAlert.events.alertAdded.publish(errorText, "error", "writeReview");
            self.isLoading(false);
        };

        this.showThankYou = function () {
            self.clearFields();
            self.show(false);
            kscAlert.events.alertAdded.publish(initObject.successMessage, "success", "writeReview");

            showWriteReviewEvents.showWriteProductReviewButton.publish();
        };

        this.clearFields = function () {
            self.fields.title("");
            self.fields.rating(0);
            self.fields.text("");
        };

        this.getReviewersNickname = ko.computed(function () {
            if (self.show()) {
                $.getJSON("/PagesAsync/WriteReview/GetReviewersNickname",
                    function (data) {
                        self.fields.nickname(data.Nickname);
                    });
            }
        });

        when(writeReviewEvents.writeProductReview).do(function () {
            self.show(true);
        });

        when(showWriteReviewEvents.showWriteProductReviewForm).do(function () {
            self.show(true);
        });

        when(showWriteReviewEvents.hideWriteProductReviewForm).do(function () {
            self.show(false);
        });

        when(writeReviewEvents.getReviewersNickname).do(function () {
            self.getReviewersNickname();
        });
    }
    return WriteReviewViewModel;
});