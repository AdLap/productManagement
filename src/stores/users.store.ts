import { defineStore } from 'pinia'
import { fetching } from '@/fetch/fetch'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {}
  }),
  actions: {
    async getAll() {
      this.users = { loading: true }
      fetching
        .get(baseUrl)
        .then((users) => (this.users = users))
        .catch((error) => (this.users = { error }))
    }
  }
})
