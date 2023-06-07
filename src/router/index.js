import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "home",
      path: "/home",
      component: () => import("../views/HomePage.vue"),
      children: [
        {
          name: "home",
          path: "",
          component: () => import("../views/HomePage.vue"),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", redirect: "/home" },
    {
      name: "product",
      path: "/product/:id",
      component: () => import("../views/SingleProductPage.vue"),
    },
    {
      name: "cart",
      path: "/cart",
      component: () => import("../views/CartPage.vue"),
    },
    {
      name: "result",
      path: "/home/Result",
      component: () => import("../views/ResultPage.vue"),
    },
  ],
});

export default router;
