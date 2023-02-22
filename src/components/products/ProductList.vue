<template>
  <VContainer>
    <VList v-if="products.length">
      <VListItem v-for="product in products" :key="product.id">
        <VCard>
          {{ product }}
        </VCard>
      </VListItem>
    </VList>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.store'

const productStore = useProductsStore()
const { products } = storeToRefs(productStore)

productStore.getAll()
</script>
