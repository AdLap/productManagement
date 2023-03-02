import { defineStore } from 'pinia'
import { fetching } from '@/fetch/fetch'
import router from '@/router'

const baseUrl = `${import.meta.env.VITE_API_URL}`

export const useAuthStore = defineStore('auth', {
  state: () => ({
    //@ts-expect-error //TODO
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(email: string, password: string) {
      const user = await fetching.post(`${baseUrl}/auth/login`, {
        email,
        password
      })

      this.user = user
      console.log('user::', user)

      localStorage.setItem('user', JSON.stringify(user))

      router.push(this.returnUrl || '/')
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push({ name: 'home' })
    }
  }
})
