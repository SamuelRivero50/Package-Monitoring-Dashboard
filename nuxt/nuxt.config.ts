// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // - /warehouses/** rendered server-side on each request (SSR)
  routeRules: {
    '/warehouses/**': { ssr: true },
  },

  app: {
    head: {
      title: 'PackTrack Hybrid',
    },
  },

  modules: ['@nuxt/eslint'],
});
