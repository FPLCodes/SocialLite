import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAz0UIhALssPcxQz9ulmiMayGQTisREC4w",
  authDomain: "testing-9f46c.firebaseapp.com",
  projectId: "testing-9f46c",
  storageBucket: "testing-9f46c.appspot.com",
  messagingSenderId: "206257575060",
  appId: "1:206257575060:web:41c54429fd7f185a8e5081",
  measurementId: "G-YCSW4FR6QW",
};

firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .mount("#app");
