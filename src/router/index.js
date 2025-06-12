import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CitiyView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Weather App - Home",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CitiyView,
      meta: {
        title: "Weather App - City",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Set the document title based on the route meta title
  document.title = `${to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title} | Weather App`;
  next();
});

export default router;
