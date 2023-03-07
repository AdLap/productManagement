import { defineStore } from 'pinia'
import { fetching } from '@/fetch/fetch'
import type { Product, ProductFull, CurrentProduct } from '@/type/types'

const baseUrl = `${import.meta.env.VITE_API_URL}/products`

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as ProductFull[],
    currentProduct: {} as CurrentProduct,
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
        .then(
          (product) =>
            (this.currentProduct = Object.assign(this.currentProduct, product))
        )
        .catch((error) => (this.error = error))
        .finally(() => (this.loading = false))
    },
    findProduct(id: number): ProductFull {
      if (!this.products.length) {
        this.getProduct(id)
        return this.currentProduct[0]
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
