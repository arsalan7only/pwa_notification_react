// export default async function swDev() {
//   function determineAppServerKey() {
//     const vapidPublicKey =
//       "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
//     return urlBase64ToUint8Array(vapidPublicKey);
//   }

//   function urlBase64ToUint8Array(base64String) {
//     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding)
//       .replace(/\-/g, "+")
//       .replace(/_/g, "/");

//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }

//   let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
//   navigator.serviceWorker.register(swUrl).then((response) => {});
//   // if ("serviceWorker" in navigator && "PushManager" in window) {
//   //   navigator.serviceWorker.register(swUrl).then((response) => {

//   //        Notification.requestPermission().then((permission)=>{
//   //           if(permission === 'granted'{
//   //             const ragistration =
//   //           })
//   //        })
//   //       return response.pushManager
//   //         .getSubscription()
//   //         .then(function (subscription) {
//   //           response.pushManager.subscribe({
//   //             userVisibleOnly: true,
//   //             applicationServerKey: determineAppServerKey(),
//   //           });
//   //         });

//   //   });
//   // } else {
//   //   console.warn("Push messaging is not supported");
//   //   // pushButton.textContent = 'Push Not Supported';
//   // }
//   // debugger;
//   const permission = await Notification.requestPermission();
//   if (permission === "granted") {
//     const registration = await navigator.serviceWorker.ready;
//     const subscription = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: determineAppServerKey(),
//     });
//   }
// }

// public/service-worker.js

export default function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  }
}
