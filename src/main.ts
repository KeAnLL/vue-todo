import { createPinia } from "pinia";
import { createApp } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";

import AccountPage from "@/components/AccountPage.vue";
import TheHomepage from "@/components/TheHomepage.vue";
import TheNotFoundPage from "@/components/TheNotFoundPage.vue";
import TodoPage from "@/components/TodoPage.vue";
import UserConfirmationPage from "@/components/UserConfirmationPage.vue";
import UserPage from "@/components/UserPage.vue";
import UserProfilePage from "@/components/UserProfilePage.vue";

import App from "./App.vue";

import "./main.css";

const accountGuard = (to: RouteLocationNormalized) => {
  const params: string[] = ["signin", "signup", "confirm"];
  const dest: string | string[] = to.params.type;

  if (typeof dest === "object") {
    return { name: "NotFound" };
  } else if (!params.includes(dest)) {
    return { name: "NotFound" };
  }
};

const routes = [
  { path: "/", name: "Homepage", component: TheHomepage, alias: "/homepage" },
  {
    path: "/account/:type",
    name: "Account",
    component: AccountPage,
    beforeEnter: [accountGuard],  // can change to children
  },
  {
    path: "/user",
    component: UserPage,
    children: [
      {
        path: "confirmation",
        component: UserConfirmationPage,
      },
      {
        path: ":id/profile",
        component: UserProfilePage,
      },
    ],
  },
  { path: "/todo/:userid?", name: "Dashboard", component: TodoPage },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: TheNotFoundPage },
  { path: "/:pathMatch(.*)", name: "BadNotFound", component: TheNotFoundPage },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
});

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");
