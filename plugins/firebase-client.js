import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyARFLZlegbkfyX3B7TjMfKS4ZdVb5sr_hE",
    authDomain: "playsbo-f4ab9.firebaseapp.com",
    projectId: "playsbo-f4ab9",
    storageBucket: "playsbo-f4ab9.appspot.com",
    messagingSenderId: "109912632497",
    appId: "1:109912632497:web:cadc55705d673f37180690",
  });

  return {
    provide: {
      messaging: getMessaging(firebaseApp),
      firebaseApp: firebaseApp,
    },
  };
});
