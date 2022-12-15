import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/ar",
    name: "ar",
    component: () => import("../views/ArScene.vue"),
  },
  {
    path: "/viewer",
    name: "viewer",
    component: () => import("../views/ViewerScene.vue"),
  },
  {
    path: "/delete-storage",
    name: "deleteStorage",
    component: () => import("../views/DeleteStorage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
