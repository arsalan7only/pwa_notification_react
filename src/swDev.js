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
