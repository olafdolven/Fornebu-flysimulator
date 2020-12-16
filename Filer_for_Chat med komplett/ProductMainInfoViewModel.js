define(
  [
    "Components/ProductMainInfo/events",
    "Components/ProductSections/events",
    "JScript/Common/requestContext"
  ],
  function(events, productSectionsEvents, requestContext) {
    function ProductMainInfoViewModel(initObject) {
      this.open = function() {
        events.writeProductReview.publish();
        return true;
      };

      this.openReviewSection = function() {
        productSectionsEvents.hideWriteProductReviewForm.publish();
        productSectionsEvents.showWriteProductReviewButton.publish();
        events.openProductReviewSection.publish();
        return true;
      };

      this.openReviewWriteForm = function() {
        events.getReviewersNickname.publish();
        events.writeProductReview.publish();
        events.openProductReviewSection.publish();
        if (requestContext.isProfileAuthenticated) {
          events.openReviewLogin.publish();
        }
        return true;
      };
    }
    return ProductMainInfoViewModel;
  }
);
