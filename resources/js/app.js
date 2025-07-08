// import '../scss/app.scss';
// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import LoginPage from '../pages/LoginPage.vue'

// // 1. Crée une instance Pinia
// const pinia = createPinia()

// // 2. Crée ton app Vue
// const app = createApp(LoginPage)

// // 3. Utilise Pinia dans l'app
// app.use(pinia)

// // 4. Monte l'app
// app.mount('#app')


import '../scss/app.scss'
import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import { createInertiaApp } from '@inertiajs/vue3'

createInertiaApp({
  resolve: name => {
    console.log('Résolution de la page :', name)

    const pages = import.meta.glob('./pages/**/*.vue')
    const page = pages[`./pages/${name}.vue`]

    if (!page) {
      throw new Error(`La page ${name} est introuvable.`)
    }

    return page() // <-- ici on exécute la fonction retournée (Promise)
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })

    app.use(plugin)
    app.use(createPinia())
    app.mount(el)
  },
})
