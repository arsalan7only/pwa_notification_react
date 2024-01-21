// src/App.js
import React, { useEffect, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
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
  }, []);

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
      // sendSubscriptionToServer(subscription);
      console.log("User is subscribed:", subscription);
      return subscription;

      // Send the subscription to the server
      // sendSubscriptionToServer(subscription);
    } catch (error) {
      console.error("Failed to subscribe the user:", error);
    }
  };

  const sendSubscriptionToServer = (subscription) => {
    // Simulate sending the subscription to the server
    fetch(
      "http://localhost:5000/.netlify/functions/api/subscribe",
      // "https://react-notification-pwa-api.netlify.app/.netlify/functions/api/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log("Subscription sent to server:", data))
      .catch((error) => console.error("Error sending subscription:", error));
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

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    let test = await subscribeUser();
    console.log("test", test);
    let payload = {
      username,
      password,
      token: test,
    };
    fetch(
      // "http://localhost:5000/.netlify/functions/api/login",
      "https://node-mongo-api-g1v4.onrender.com/api/v1/login",
      // "https://react-notification-pwa-api.netlify.app/.netlify/functions/api/login",
      // "https://react-notification-pwa-api.netlify.app/.netlify/functions/api/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    ).then((res) => {
      console.log("test", res);
    });
  };

  return (
    <div className="App">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button class="btn btn-primary" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
      <h1>React PWA with Push Notifications</h1>
      <button
        onClick={subscribeUser}
        style={{ width: "300px", backgroundColor: "red" }}
      >
        Enable Push Notifications
      </button>
    </div>
  );
};

export default App;
