export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  routeRules: {
    '/': {
      isr: 60 
    }
  },

  typescript: {
    strict: true
  }
})
