import { defineStore } from 'pinia'
import { fetching } from '@/fetch/fetch'
import type { Category } from '@/type/types'

const baseUrl = `${import.meta.env.VITE_API_URL}/categories`

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[],
    currentCategory: ({} as Category) ?? null,
    loading: false,
    error: null
  }),
  actions: {
    getAll(): void {
      this.loading = true
      fetching
        .get(baseUrl)
        .then((categories) => {
          if (categories instanceof Error) {
            throw new Error('Wrong data')
          }
          this.categories = [...categories]
          console.log('cate::', categories)
        })
        .catch((error) => (this.error = error))
        .finally(() => (this.loading = false))
    }
  }
})
