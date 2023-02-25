<template>
  <VSheet
    elevation="4"
    max-max-width="600"
    class="d-flex justify-space-between pa-3"
  >
    <h2>Product List</h2>
    <AddProductForm />
    <VBtn @click="productStore.changeListGrid">
      <VIcon v-if="displayGrid" icon="mdi-view-list" />
      <VIcon v-else icon="mdi-view-grid" />
    </VBtn>
  </VSheet>

  <VContainer fluid>
    <ProductListGrid v-if="displayGrid" :products="products" />
    <ProductListList v-else :products="products" />
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.store'
import ProductListGrid from '@/components/products/list/ProductListGrid.vue'
import ProductListList from '@/components/products/list/ProductListList.vue'
import AddProductForm from '@/components/products/AddProductForm.vue'

const productStore = useProductsStore()
const { products, displayGrid } = storeToRefs(productStore)

if (!products.value.length) {
  productStore.getAll()
}
</script>
