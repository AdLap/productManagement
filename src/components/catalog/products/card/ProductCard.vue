<template>
  <VContainer fluid class="d-flex justify-center align-center h-100">
    <VCard max-width="800" class="h-50 pa-4">
      <VCardTitle class="text-h5">{{ product?.title }}</VCardTitle>
      <VCardText>{{ product?.description }}</VCardText>
      <VRow class="pa-3 justify-center">
        <VCol v-for="(image, index) in product?.images" :key="index">
          <VImg :src="image" height="200" width="200" cover />
        </VCol>
      </VRow>
      <ProductActions :product-id="id" />
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products.store'
import type { Product } from '@/type/types'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductActions from '@/components/catalog/products/ProductActions.vue'

onBeforeMount((): void => {
  product.value = productStore.findProduct(id)
})

const productStore = useProductsStore()
const product = ref<Product | null>(null)

const route = useRoute()
const id = Number(route.params.id)
</script>
