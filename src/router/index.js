import { createRouter, createWebHistory } from "vue-router";
import { projectAuth } from "@/firebase/config";
import Home from "../views/Home.vue";
import Login from "@/views/auth/Login.vue";
import Signup from "@/views/auth/Signup.vue";
import CreatePlaylist from "@/views/playlists/CreatePlaylist.vue";
import PlaylistDetails from "@/views/playlists/PlaylistDetails.vue";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;

  if (!user) {
    next({ name: "login" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/playlist/create",
      name: "createplaylist",
      component: CreatePlaylist,
      beforeEnter: requireAuth,
    },
    {
      path: "/playlist/:id",
      name: "playlistdetails",
      component: PlaylistDetails,
      beforeEnter: requireAuth,
      props: true,
    },
  ],
});

export default router;
