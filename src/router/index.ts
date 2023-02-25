import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/products/ProductListView.vue')
      // children: [
      //   {
      //     path: 'product/:id',
      //     component: () => import('@/components/products/card/ProductCard.vue')
      //   }
      // ]
    },
    {
      path: '/product/:id',
      name: 'product',
      // component: ProductCard
      component: () => import('@/views/products/ProductCardView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/', '/register']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()

  if (authRequired && !auth.user) {
    // auth.returnUrl = to.fullPath
    return '/'
  }
})

export default router
