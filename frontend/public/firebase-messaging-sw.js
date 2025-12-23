
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDn2zOHfC0xLgJkLrvWqWpXftxuNjtOFNQ",
  authDomain: "campuscare-bba1c.firebaseapp.com",
  projectId: "campuscare-bba1c",
  messagingSenderId: "563899413760",
   appId:"1:563899413760:web:4fe2d3716cf52d47ddefe5",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/favicon.ico",
    }
  );
});
