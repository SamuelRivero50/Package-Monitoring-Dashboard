/** @author David Hdez */
// external imports
import { createRouter, createWebHistory } from "vue-router";

// internal imports
import { AuthService } from "@/services/AuthService";
import DashboardView from "@/views/home/DashboardView.vue";
import HomeView from "@/views/home/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import PackagesCreateView from "@/views/packages/PackagesCreateView.vue";
import PackagesIndexView from "@/views/packages/PackagesIndexView.vue";
import PackagesShowView from "@/views/packages/PackagesShowView.vue";
import SettingsView from "@/views/settings/SettingsView.vue";
import SignUpView from "@/views/auth/SignupView.vue";
import UsersIndexView from "@/views/users/UsersIndexView.vue";
import WarehousesIndexView from "@/views/warehouses/WarehousesIndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView, meta: { title: "Home" } },

    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { title: "Sign In", guestOnly: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
      meta: { title: "Sign Up", guestOnly: true },
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { title: "Dashboard", requiresAuth: true },
    },

    {
      path: "/packages",
      name: "packages",
      component: PackagesIndexView,
      meta: { title: "Packages", requiresAuth: true },
    },
    {
      path: "/packages/create",
      name: "packages.create",
      component: PackagesCreateView,
      meta: { title: "Create Package", requiresAuth: true },
    },
    {
      path: "/packages/:id",
      name: "packages.show",
      component: PackagesShowView,
      meta: { title: "Package Details", requiresAuth: true },
    },

    {
      path: "/warehouses",
      name: "warehouses",
      component: WarehousesIndexView,
      meta: { title: "Warehouses", requiresAuth: true },
    },
    {
      path: "/users",
      name: "users",
      component: UsersIndexView,
      meta: { title: "Users", requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
      meta: { title: "Settings", requiresAuth: true, requiresAdmin: true },
    },
  ],
});

router.beforeEach((to) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const isAdmin = AuthService.isAdmin();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return { name: "dashboard" };
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    return { name: "dashboard" };
  }
});

export default router;
