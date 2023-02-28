import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/ar-fire",
    name: "ar-fire",
    component: () => import("../views/ArSceneFire.vue"),
  },
  {
    path: "/ar-trio",
    name: "ar-trio",
    component: () => import("../views/ArSceneTrio.vue"),
  },
  {
    path: "/viewer-fire",
    name: "viewer-fire",
    component: () => import("../views/ViewerSceneFire.vue"),
  },
  {
    path: "/viewer-trio",
    name: "viewer-trio",
    component: () => import("../views/ViewerSceneTrio.vue"),
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
