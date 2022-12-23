import { createApp } from "vue";
import {createRouter, createWebHistory} from "vue-router"

import App from "./App.vue";
import Homepage from "@/components/Homepage.vue";
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import Dashboard from "@/components/Dashboard.vue";

import "./main.css";

const routes = [
    {path: '/', name: 'Homepage', component: Homepage},
    {path: '/sign-in', name: "Sign In", component: SignIn},
    {path: '/sign-up', name: 'Sign Up', component: SignUp},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App)

app.use(router);
app.mount("#app");
