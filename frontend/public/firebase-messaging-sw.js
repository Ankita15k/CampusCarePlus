importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDn2zOHfC0xLgJkLrvWqWpXftxuNjtOFNQ",
  authDomain: "campuscare-bba1c.firebaseapp.com",
  projectId: "campuscare-bba1c",
  messagingSenderId: "563899413760",
  appId: "1:563899413760:web:4fe2d3716cf52d47ddefe5",
});

const messaging = firebase.messaging();

/**
 * SHOW NOTIFICATION (ONLY ONCE)
 */
messaging.onBackgroundMessage((payload) => {
  const { title, body, url } = payload.data;

  self.registration.showNotification(title, {
    body,
    data: { url }, // 👈 store URL here
    icon: "/favicon.ico",
  });
});

/**
 * HANDLE CLICK → OPEN URL
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
