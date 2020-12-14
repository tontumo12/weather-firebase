importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAz4cecT3HvDHlcLz-wCNyOOClhjC_6Jio",
  authDomain: "tunt-16c2b.firebaseapp.com",
  databaseURL: "https://tunt-16c2b.firebaseio.com",
  projectId: "tunt-16c2b",
  storageBucket: "tunt-16c2b.appspot.com",
  messagingSenderId: "1038660838040",
  appId: "1:1038660838040:web:1afe957768c354c19ba6ed",
  measurementId: "G-GS6LJMLP6R"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: 'public/tunt.png'
  };

  // Save to local-storage async
  const userNotifications = localStorage.getItem('FCM_notifications');
  userNotifications.push(payload);
  localStorage.setItem('FCM_notifications', userNotifications);
  // End Save to local-storage async


  return self.registration.showNotification(notificationTitle, notificationOptions);
});