define(["ksc-ubo"], function (kscUbo) {
    function WriteReviewTermsViewModel(initObject) {
        var self = this;
        this.header = "";
        this.contentElementId = "";

        this.open = function (data, event) {
            var uboWriteReviewContentModel = new kscUbo.uboSyncContentModel();

            uboWriteReviewContentModel.header = self.header;
            uboWriteReviewContentModel.contentViewModel = function () { };
            uboWriteReviewContentModel.content = { element: self.contentElementId };

            uboWriteReviewContentModel.actionElement = event.currentTarget;

            return kscUbo.uboService.openSync(uboWriteReviewContentModel);
        };

        init: {
            self.header = initObject.title;
            self.contentElementId = initObject.contentElementId;
        }
    }
    return WriteReviewTermsViewModel;
});