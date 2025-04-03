import "./assets/main.css";
import { projectAuth } from "./firebase/config";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(router);

    app.mount("#app");
  }
});
