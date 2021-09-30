import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../views/Sign-up.vue";
import SignIn from "../views/Sign-in.vue";
import Profile from "../views/Profile.vue";
import ProfileVisit from "../views/ProfileVisit.vue";

const routes = [
  {
    path: "/",
    name: "Sign-in",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign-up",
    component: SignUp,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    meta: { transitionName: "slide" },
  },
  {
    path: "/profileVisit/:id",
    name: "ProfileVisit",
    component: ProfileVisit,
    meta: { transitionName: "slide" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
