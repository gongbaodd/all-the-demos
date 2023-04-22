import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Counter from '../views/1-Counter.vue'
import DomPortal from '../views/2-DomPortal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/1-counter',
      name: '1-counter',
      component: Counter
    },
    {
      path: '/2-domportal',
      name: '2-domportal',
      component: DomPortal
    }
  ]
})

export default router
