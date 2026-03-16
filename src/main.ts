/** @author David Hdez */
// external imports
import { createApp } from "vue";

// internal imports
import App from "./App.vue";
import "./assets/css/input.css";
import PiniaConfig from "./PiniaConfig";
import router from "./router";

const app = createApp(App);

app.use(PiniaConfig.init());
app.use(router);

app.mount("#app");
