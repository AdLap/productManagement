import { defineStore } from 'pinia'
import { fetching } from '@/fetch/fetch'
import type { Product, ProductFull } from '@/type/types'

const baseUrl = `${import.meta.env.VITE_API_URL}/products`

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as ProductFull[],
    displayGrid: true,
    loading: false,
    error: null
  }),
  actions: {
    getAll(): void {
      this.loading = true
      fetching
        .get(baseUrl)
        .then((products) => {
          if (products instanceof Error) {
            throw new Error('Wrong data')
          }
          if (Array.isArray(products)) this.products = [...products]
        })
        .catch((error) => (this.error = error))
        .finally(() => (this.loading = false))
    },
    async getProduct(id: number): Promise<ProductFull> {
      this.loading = true
      const product: ProductFull = await fetching
        .get(`${baseUrl}/${id}`)
        .then((product) => {
          if (product instanceof Error) {
            throw new Error('Wrong data')
          }
          return product
        })
        .catch((error) => (this.error = error))
        .finally(() => (this.loading = false))
      return product
    },
    async findProduct(id: number): Promise<ProductFull> {
      if (!this.products.length) {
        const product = await this.getProduct(id)
        return product
      }

      const product = this.products.filter((p: ProductFull) => p.id === id)
      return product[0]
    },
    addProduct(product: Product): void {
      this.loading = true
      fetching
        .post(baseUrl, product)
        .then((resp) => console.log('add::', resp))
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false))
    },
    updateProduct(id: number, product: Product): void {
      this.loading = true
      fetching
        .put(`${baseUrl}/${id}`, product)
        .then((resp) => console.log('put', resp))
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false))
    },
    deleteProduct(id: number): void {
      fetching
        .delete(`${baseUrl}/${id}`)
        .then((resp) => {
          if (!resp) {
            throw new Error('Something went wrong')
          }
          this.getAll()
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false))
    },
    changeListGrid(): void {
      this.displayGrid = !this.displayGrid
    }
  }
})
