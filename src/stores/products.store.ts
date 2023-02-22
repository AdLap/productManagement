import { defineStore } from 'pinia'
import { fetching } from '@/fetch/fetch'

const baseUrl = `${import.meta.env.VITE_API_URL}/products`

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: {}
  }),
  actions: {
    async getAll() {
      this.products = { loading: true }
      fetching
        .get(baseUrl)
        .then((products) => (this.products = products))
        .catch((error) => (this.products = { error }))
    }
  }
})
