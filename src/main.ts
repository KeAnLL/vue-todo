import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Account from "@/components/AccountPage.vue";
import Homepage from "@/components/TheHomepage.vue";
import Dashboard from "@/components/TodoDashboard.vue";
import App from "./App.vue";

import "./main.css";

const routes = [
  { path: "/", name: "Homepage", component: Homepage },
  { path: "/account", name: "Account", component: Account },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");
