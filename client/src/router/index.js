import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../views/Sign-up.vue";
import SignIn from "../views/Sign-in.vue";
import Home from "../views/Home.vue";
import ProfileVisit from "../views/ProfileVisit.vue";
import Profile from "../views/Profile.vue";
import LandingPage from "../views/LandingPage.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/sign-in",
    name: "Sign-in",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign-up",
    component: SignUp,
  },
  {
    path: "/user/:id",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/profileVisit/:id",
    name: "ProfileVisit",
    component: ProfileVisit,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
