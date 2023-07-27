import { createApp } from "vue";
import App from "./App.vue";
import pinia from "./stores";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss";
import "./permission";

import { registerIcons } from "@/utils/common";

const app = createApp(App);

registerIcons(app);

app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.mount("#app");
