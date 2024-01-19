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
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
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
