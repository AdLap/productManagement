<template>
  <VSheet
    elevation="4"
    max-max-width="600"
    class="d-flex justify-space-between pa-3"
  >
    <h2>Product List</h2>
    <VBtn @click="productStore.changeListGrid">
      <VIcon v-if="displayGrid" icon="mdi-view-list" />
      <VIcon v-else icon="mdi-view-grid" />
    </VBtn>
  </VSheet>

  <VContainer fluid>
    <ProductListGrid
      v-if="displayGrid"
      :products="products"
      :card-actions="cardActions"
      :goToCart="goToCart"
    />
    <ProductListList
      v-else
      :products="products"
      :card-actions="cardActions"
      :goToCart="goToCart"
    />
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.store'
import type { CardActions } from '@/type/types'
import router from '@/router'
import ProductListGrid from '@/components/products/ProductListGrid.vue'
import ProductListList from '@/components/products/ProductListList.vue'

const productStore = useProductsStore()
const { products, displayGrid } = storeToRefs(productStore)

const editProduct = (): void => {
  console.log('editClick')
}

const deleteProduct = (): void => {
  console.log('deleteClick')
}

const cardActions: CardActions[] = [
  { name: 'edit', icon: 'mdi-note-edit', action: editProduct },
  { name: 'delete', icon: 'mdi-delete', action: deleteProduct }
]

const goToCart = (): void => {
  console.log('goToCart')
  router.push({})
}

productStore.getAll()
</script>
