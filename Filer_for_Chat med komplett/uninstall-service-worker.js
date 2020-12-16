if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
        registration.unregister();
    });
}