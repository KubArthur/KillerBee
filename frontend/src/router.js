import { createRouter, createWebHistory } from "vue-router";
import IngredientPage from "./views/IngredientPage.vue";
import ModelePage from "./views/ModelePage.vue";
import ProcessPage from "./views/ProcessPage.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/ingredients", component: IngredientPage },
  { path: "/modeles", component: ModelePage },
  { path: "/process", component: ProcessPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
