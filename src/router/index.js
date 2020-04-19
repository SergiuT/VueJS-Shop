import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Overview from "../views/Overview.vue";
import Products from "../views/Products.vue";
import About from '../views/About.vue';
import ProductsPage from '../views/ProductsPage.vue';
import Checkout from '../views/Checkout.vue';
import Profile from "../views/Profile.vue";
import Orders from "../views/Orders.vue";
import { fb } from "../firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "",
  routes: [
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "overview",
          name: "Overview",
          component: Overview
        },
        {
          path: "products",
          name: "Products",
          component: Products
        },
        {
          path: "orders",
          name: "Orders",
          component: Orders
        },
        {
          path: "profile",
          name: "Profile",
          component: Profile
        }
      ]
    },
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/productsPage",
      name: "ProductsPage",
      component: ProductsPage
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
