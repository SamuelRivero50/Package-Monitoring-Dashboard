/** @author David Hdez */
// external imports
import App from "./App.vue";
import "./assets/css/input.css";
import router from "./router";
import { createApp } from "vue";

// internal imports
import PiniaConfig from "./PiniaConfig";

const app = createApp(App);

app.use(PiniaConfig.init());
app.use(router);

app.mount("#app");
