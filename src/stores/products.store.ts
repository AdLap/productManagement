import { defineStore } from 'pinia'
import { fetching } from '@/fetch/fetch'
import type { Product } from '@/type/types'

const baseUrl = `${import.meta.env.VITE_API_URL}/products`

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    currentProduct: ({} as Product) ?? null,
    displayGrid: true,
    loading: false,
    error: null
    // editedProduct: {} as () => Product
  }),
  getters: {
    getToEdit(state) {
      return (productId: number) =>
        state.products.filter((product) => product.id === productId)
    }
  },
  actions: {
    getAll(): void {
      this.loading = true
      fetching
        .get(baseUrl)
        .then((products) => {
          if (products instanceof Error) {
            throw new Error('Wrong data')
          }
          this.products = [...products]
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
    findProduct(id: number): Product | null {
      if (!this.products.length) {
        this.getProduct(id)
        return this.currentProduct
      }
      const product = this.products.find((p: Product) => p.id === id)

      return product ?? null
    },
    addProduct(product: Product): void {
      console.log('add', product)
      this.loading = true
      fetching
        .post(baseUrl, product)
        .then((resp) => console.log('add::', resp))
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false))
    },
    updateProduct(id: number, product: Product) {
      // this.editProduct = this.findProduct(id)
      console.log('update::', id, product)
      this.loading = true
      fetching
        .put(`${baseUrl}/${id}`, product)
        .then((resp) => console.log('put', resp))
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false))
    },
    deleteProduct(id: number) {
      console.log('del::', id)
      fetching
        .delete(`${baseUrl}/${id}`)
        .then((resp) => {
          if (!resp) {
            console.error('błąd')
            throw new Error('Something went wrong')
          }
          this.getAll()
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false))
    },
    changeListGrid() {
      this.displayGrid = !this.displayGrid
    }
  }
})
