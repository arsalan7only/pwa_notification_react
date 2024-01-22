export default function swDev(config) {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
        registerValidSW(swUrl, config);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register()
    .then((registration) => {
      // Registration was successful.
      registration.onupdatefound = () => {
        const instalingWorker = registration.installing;
        if (instalingWorker == null) {
          return null;
        }
        instalingWorker.onstatechange = () => {
          if (instalingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log("content is cachec for offline");
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.log("error", error);
    });
}
