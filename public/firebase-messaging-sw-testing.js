importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyARFLZlegbkfyX3B7TjMfKS4ZdVb5sr_hE",
  authDomain: "playsbo-f4ab9.firebaseapp.com",
  projectId: "playsbo-f4ab9",
  storageBucket: "playsbo-f4ab9.appspot.com",
  messagingSenderId: "109912632497",
  appId: "1:109912632497:web:cadc55705d673f37180690",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
