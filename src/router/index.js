import { createRouter, createWebHistory } from "vue-router";
import ProductListView from "../views/product/ProductListView.vue";

const routes = [
  {
    path: "/",
    name: "products",
    component: ProductListView,
  },
  {
    path: "/products/:id",
    name: "product_detail",
    component: () => import("../views/product/ProductDetailView.vue"),
  },
  {
    path: "/hardwares",
    name: "hardware_list",
    component: () => import("../views/hardware/HardwareListView.vue"),
  },
  {
    path: "/hardwares/:id",
    name: "hardware_detail",
    component: () => import("../views/hardware/HardwareDetailView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
