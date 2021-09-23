import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../views/Sign-up.vue";
import SignIn from "../views/Sign-in.vue";

const routes = [
  {
    path: "/",
    name: "Sign-Up",
    component: SignUp,
    meta: { transition: "slide-left" },
  },
  {
    path: "/sign-in",
    name: "Sign-in",
    component: SignIn,
    meta: { transition: "slide-right" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
