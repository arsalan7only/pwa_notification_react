// src/App.js
import React, { useEffect, useState } from "react";

const Test = () => {
  const [count, setCount] = useState(0);
  //   useEffect(() => {
  //     if ("serviceWorker" in navigator) {
  //       navigator.serviceWorker.ready
  //         .then((registration) => {
  //           if (registration.pushManager) {
  //             return registration.pushManager.getSubscription();
  //           }
  //           throw new Error("PushManager not available");
  //         })
  //         .then((subscription) => {
  //           if (subscription === null) {
  //             subscribeUser();
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error checking pushManager:", error);
  //         });
  //     }
  //   }, []);

  //   useEffect(() => {
  //     if (count > 0) {
  //       subscribeUser();
  //     }
  //   }, [count]);

  //   const subscribeUser = async () => {
  //     try {
  //       const registration = await navigator.serviceWorker.ready;
  //       const convertedVapidKey = urlBase64ToUint8Array(
  //         "BKdeaCCBxk3lnIJGRRHlhxKcF1kDyFiWeh0YX0Pfr6rXaPTEDWmL-E-h6vmbIXJntVnEhBNx6Y9QmBcbP5MyWAo"
  //         // "BKdeaCCBxk3lnIJGRRHlhxKcF1kDyFiWeh0YX0Pfr6rXaPTEDWmL-E-h6vmbIXJntVnEhBNx6Y9QmBcbP5MyWAo"
  //       );

  //       const subscription = await registration.pushManager.subscribe({
  //         userVisibleOnly: true,
  //         applicationServerKey: convertedVapidKey,
  //       });

  //       console.log("User is subscribed:", subscription);

  //       // Send the subscription to the server
  //       sendSubscriptionToServer(subscription);
  //     } catch (error) {
  //       console.error("Failed to subscribe the user:", error);
  //     }
  //   };

  //   const sendSubscriptionToServer = (subscription) => {
  //     // Simulate sending the subscription to the server
  //     // fetch(
  //     //   // "http://localhost:5000/.netlify/functions/api/subscribe",
  //     //   "https://react-notification-pwa-api.netlify.app/.netlify/functions/api/subscribe",
  //     //   {
  //     //     method: "POST",
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //     body: JSON.stringify(subscription),
  //     //   }
  //     // )
  //     //   .then((response) => response.json())
  //     //   .then((data) => console.log("Subscription sent to server:", data))
  //     //   .catch((error) => console.error("Error sending subscription:", error));
  //     // const triggerPushNotification = () => {
  //     const options = {
  //       body: "Your Notification Body",
  //     };

  //     navigator.serviceWorker.ready.then((registration) => {
  //       registration.showNotification("First Notification", options);
  //     });
  //     // };
  //   };

  //   const urlBase64ToUint8Array = (base64String) => {
  //     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  //     const base64 = (base64String + padding)
  //       .replace(/-/g, "+")
  //       .replace(/_/g, "/");
  //     const rawData = window.atob(base64);
  //     const outputArray = new Uint8Array(rawData.length);

  //     for (let i = 0; i < rawData.length; ++i) {
  //       outputArray[i] = rawData.charCodeAt(i);
  //     }

  //     return outputArray;
  //   };

  return (
    <div className="App">
      <h1>React PWA with Push Notifications</h1>
      <button
        // onClick={subscribeUser}
        style={{ width: "300px", backgroundColor: "red" }}
      >
        Enable Push Notifications
      </button>
    </div>
  );
};

export default Test;
