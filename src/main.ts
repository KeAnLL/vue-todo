import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import AccountPage from "@/components/AccountPage.vue";
import TheHomepage from "@/components/TheHomepage.vue";
import TodoDashboard from "@/components/TodoDashboard.vue";
import TheNotFoundPage from "./components/TheNotFoundPage.vue";

import App from "./App.vue";

import "./main.css";

const routes = [
  { path: "/", name: "Homepage", component: TheHomepage },
  { path: "/account", name: "Account", component: AccountPage },
  { path: "/dashboard", name: "Dashboard", component: TodoDashboard },
  { path: "/notfound", name: "Not Found", component: TheNotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");
