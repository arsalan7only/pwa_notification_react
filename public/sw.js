// let cacheData = "appV1";
// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll([
//         // "/static/js/main.chunk.js",
//         // "/static/js/0.chunk.js",
//         "/static/js/bundle.js",
//         // "/static/css/main.chunk.css",
//         // "/bootstrap.min.css",
//         "/index.html",
//         "/",
//         // "/users",
//       ]);
//     })
//   );
// });
// this.addEventListener("fetch", (event) => {
//   // console.warn("url",event.request.url)

// import { getData } from "../src/utils";

//   if (!navigator.onLine) {
//     if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
//       event.waitUntil(
//         this.registration.showNotification("Internet", {
//           body: "internet not working",
//         })
//       );
//     }
//     event.respondWith(
//       caches.match(event.request).then((resp) => {
//         if (resp) {
//           return resp;
//         }
//         let requestUrl = event.request.clone();
//         fetch(requestUrl);
//       })
//     );
//   }
// });

// this.addEventListener("fetch", (event) => {
//   //   debugger;
//   let data = [
//     { title: "Actify", body: "this is first " },
//     { title: "Actify", body: "this is first " },
//   ];
//   //   fetch("https://jsonplaceholder.typicode.com/todos")
//   //     .then((response) => response.json())
//   //     .then((json) => localStorage.setItem("data", json));

//   //   //   const getData = localStorage.getItem("data");
//   //   console.log(getData);

//   //   console.log(data);

//   event.waitUntil(
//     this.registration.showNotification("Actify", {
//       body: "test",
//       icon: "https://globalprimenews.com/wp-content/uploads/2020/03/IMG_20200326_143535-777x437.png",
//     })
//   );
// });

// public/service-worker.js

const getData = () => {
  debugger;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        if (registration.pushManager) {
          return registration.pushManager.getSubscription();
        }
        throw new Error("PushManager not available");
      })
      .then((subscription) => {
        if (subscription === null) {
          subscribeUser();
        }
      })
      .catch((error) => {
        console.error("Error checking pushManager:", error);
      });
  }

  const subscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const convertedVapidKey = urlBase64ToUint8Array(
        "BKdeaCCBxk3lnIJGRRHlhxKcF1kDyFiWeh0YX0Pfr6rXaPTEDWmL-E-h6vmbIXJntVnEhBNx6Y9QmBcbP5MyWAo"
        // "BKdeaCCBxk3lnIJGRRHlhxKcF1kDyFiWeh0YX0Pfr6rXaPTEDWmL-E-h6vmbIXJntVnEhBNx6Y9QmBcbP5MyWAo"
      );

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      console.log("User is subscribed:", subscription);

      // Send the subscription to the server
      sendSubscriptionToServer(subscription);
    } catch (error) {
      console.error("Failed to subscribe the user:", error);
    }
  };

  const sendSubscriptionToServer = (subscription) => {
    // Simulate sending the subscription to the server
    // fetch(
    //   // "http://localhost:5000/.netlify/functions/api/subscribe",
    //   "https://react-notification-pwa-api.netlify.app/.netlify/functions/api/subscribe",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(subscription),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => console.log("Subscription sent to server:", data))
    //   .catch((error) => console.error("Error sending subscription:", error));
    // const triggerPushNotification = () => {
    const options = {
      body: "Your Notification Body",
    };

    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("First Notification", options);
    });
    // };
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("appv1").then((cache) => {
      cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/static/js/bundle.js",
        // Add other assets as needed
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("i am call");
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("push", (event) => {
  const notification = event.data.text();
  const convertParse = JSON.parse(notification);
  const options = {
    body: convertParse.body,
    icon: convertParse.icon,
    vibrate: [100, 50, 100],
    data: { url: convertParse.url },
    badge: 5,
  };
  console.log("options", notification);

  if (Object.keys(convertParse).length > 0) {
    event.waitUntil(
      self.registration.showNotification(convertParse.title, options)
    );
  }
});
