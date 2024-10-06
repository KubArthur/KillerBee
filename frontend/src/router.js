import { createRouter, createWebHistory } from "vue-router";
import IngredientPage from "./views/IngredientPage.vue";
//import ModelePage from "./views/ModelePage.vue";
//import ProcessPage from "./views/ProcessPage.vue";
import Auth from "./views/AuthPage.vue";
import ProcessPage from "./views/ProcessPage.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/ingredients", component: IngredientPage },
  { path: "/processes", component: ProcessPage },
  { path: "/auth", component: Auth },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");

  if ((to.path === "/ingredients" || to.path === "/processes") && !accessToken) {
    next("/auth");
  } else {
    next();
  }
});


export default router;
