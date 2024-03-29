import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Counter from '../views/1-Counter.vue'
import DomPortal from '../views/2-DomPortal.vue'
import Functional from '../views/3-Functional.vue'
import Toggle from '../views/4-Toggle.vue'
import Counter2 from '../views/5-Counter.vue'
import LocalStorage from '../views/6-LocalStorage.vue'
import Mouse from '../views/7-Mouse.vue'
import LifeCycle from '../views/8-LifeCycle.vue'
import Ref from '../views/9-Ref.vue'
import CustomRef from '../views/A-CustomRef.vue'
import Capitalize from '../views/B-Capitalize.vue'
import Focus from '../views/C-Focus.vue'

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
    },
    {
      path: '/3-functional',
      name: '3-functional',
      component: Functional
    },
    {
      path: '/4-toggle',
      name: '4-toggle',
      component: Toggle
    },
    {
      path: '/5-counter',
      name: '5-counter',
      component: Counter2
    },
    {
      path: '/6-localstorage',
      name: '6-localstorage',
      component: LocalStorage
    },
    {
      path: '/7-mouse',
      name: '7-mouse',
      component: Mouse
    },
    {
      path: '/8-lifecycle',
      name: '8-lifecycle',
      component: LifeCycle
    },
    {
      path: '/9-ref',
      name: '9-ref',
      component: Ref
    },
    {
      path: '/A-customref',
      name: 'A-customref',
      component: CustomRef
    },
    {
      path: '/B-capitalize',
      name: 'B-capitalize',
      component: Capitalize
    },
    {
      path: '/C-focus',
      name: 'C-focus',
      component: Focus
    }
  ]
})

export default router
