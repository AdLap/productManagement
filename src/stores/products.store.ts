import { defineStore } from 'pinia'
import { fetching } from '@/fetch/fetch'
import type { Product, ProductAdd } from '@/type/types'

const baseUrl = `${import.meta.env.VITE_API_URL}/products`

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    currentProduct: {} as Product,
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
    getProduct(id: number): void {
      this.loading = true
      fetching
        .get(`${baseUrl}/${id}`)
        .then((product) => Object.assign(this.currentProduct, product))
        .catch((error) => (this.error = error))
        .finally(() => (this.loading = false))
    },
    findProduct(id: number): Product {
      if (!this.products.length) {
        this.getProduct(id)
        return this.currentProduct
      }
      const pr = this.products.filter((p: Product) => p.id === id)
      const product = Object.assign(this.currentProduct, pr)
      return product
    },
    addProduct(product: ProductAdd): void {
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
