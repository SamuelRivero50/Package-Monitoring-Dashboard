/**
 * @description Vue Router configuration with authentication, admin-only, and maintenance-mode guards.
 */

// framework
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

// stores
import { useAuthStore } from '@/stores/auth'

// services
import { SettingsService } from '@/services/settingsService'

// relative
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { public: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      meta: { public: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/packages',
      name: 'packages',
      component: () => import('../views/PackagesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/warehouses',
      name: 'warehouses',
      component: () => import('../views/WarehousesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { requiresAuth: true, adminOnly: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { requiresAuth: true, adminOnly: true },
    },
    {
      path: '/access-denied',
      name: 'access-denied',
      component: () => import('../views/AccessDeniedView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/maintenance',
      name: 'maintenance',
      component: () => import('../views/MaintenanceView.vue'),
      meta: { public: true },
    },
  ],
})

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ): Promise<void> => {
    const auth = useAuthStore()
    const isPublic = to.meta.public === true
    const requiresAuth = to.meta.requiresAuth === true
    const adminOnly = to.meta.adminOnly === true

    // Maintenance-mode check: redirect non-admins to maintenance page
    if (to.name !== 'maintenance' && to.name !== 'login' && to.name !== 'signup') {
      const settings = await SettingsService.getAll()
      if (settings.maintenanceMode && !auth.isAdmin) {
        next({ name: 'maintenance' })
        return
      }
    }

    // If on maintenance page but mode is off (or user is admin), redirect away
    if (to.name === 'maintenance') {
      const settings = await SettingsService.getAll()
      if (!settings.maintenanceMode || auth.isAdmin) {
        next({ name: auth.isAuthenticated ? 'dashboard' : 'home' })
        return
      }
    }

    if (requiresAuth && !auth.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
    if (adminOnly && !auth.isAdmin) {
      next({ name: 'access-denied' })
      return
    }
    if (isPublic && auth.isAuthenticated && (to.name === 'login' || to.name === 'signup')) {
      next({ name: 'dashboard' })
      return
    }
    next()
  },
)

export default router
