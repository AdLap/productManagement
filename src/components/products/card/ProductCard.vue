<template>
  <VContainer fluid class="d-flex justify-center align-center">
    <VCard>
      <VCardTitle>{{ product?.title }}</VCardTitle>
      <VCardText>{{ product?.description }}</VCardText>
      <VRow v-if="product?.images.length" class="pa-3 justify-center">
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
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductActions from '@/components/products/ProductActions.vue'

const productStore = useProductsStore()
// const { products } = storeToRefs(productStore)

const product = ref<Product | null>(null)

const route = useRoute()
// const { id } = route.params
const id = Number(route.params.id)

onBeforeMount(() => {
  product.value = productStore.findProduct(id)
})
</script>
