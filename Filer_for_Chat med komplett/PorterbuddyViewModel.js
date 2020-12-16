define([], function() {
  function PorterbuddyViewModel(initObject) {
    init: {
      if (initObject.showPorterbuddyWidget) {
        dataLayer.push({
          event: "showPorterbuddyWidget"
        });
      }
    }
  }

  return PorterbuddyViewModel;
});
