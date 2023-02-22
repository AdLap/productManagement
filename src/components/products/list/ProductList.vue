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
      :goToCard="goToCard"
    />
    <ProductListList
      v-else
      :products="products"
      :card-actions="cardActions"
      :goToCard="goToCard"
    />
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.store'
import type { CardActions } from '@/type/types'
import router from '@/router'
import ProductListGrid from '@/components/products/list/ProductListGrid.vue'
import ProductListList from '@/components/products/list/ProductListList.vue'

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

const goToCard = (): void => {
  console.log('goToCard')
  router.push({})
}

productStore.getAll()
</script>
