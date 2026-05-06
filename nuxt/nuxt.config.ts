// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // Hybrid rendering rules:
  // - /warehouses/** rendered server-side on each request (SSR)
  // - /tools/**      rendered only on the client (CSR)
  routeRules: {
    '/warehouses/**': { ssr: true },
    '/tools/**': { ssr: false },
  },

  app: {
    head: {
      title: 'PackTrack Hybrid',
    },
  },

  modules: ['@nuxt/eslint'],
});
