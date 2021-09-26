import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../views/Sign-up.vue";
import SignIn from "../views/Sign-in.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Sign-in",
    component: SignIn,
    meta: { transition: "slide-left" },
  },
  {
    path: "/sign-up",
    name: "Sign-up",
    component: SignUp,
    meta: { transition: "slide-right" },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { transition: "slide-right" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
