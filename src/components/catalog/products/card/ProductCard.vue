<template>
  <VContainer fluid class="d-flex justify-sm-center align-center h-90 ma-auto">
    <VCard
      max-width="800"
      min-height="60vh"
      class="product-card pa-4 d-flex flex-column"
    >
      <VCardTitle class="text-h5">{{ product?.title }}</VCardTitle>
      <VCardText>{{ product?.description }}</VCardText>
      <VRow
        class="imgs-slider pa-3 justify-start justify-sm-center flex-nowrap flex-sm-wrap overflow-x-auto"
      >
        <VCol v-for="(image, index) in product?.images" :key="index">
          <VImg :src="image" height="200" width="200" cover />
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VCardText>Price: {{ product?.price }}</VCardText>
        </VCol>
      </VRow>
      <ProductActions :product-id="id" />
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products.store'
import type { ProductFull } from '@/type/types'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductActions from '@/components/catalog/products/ProductActions.vue'

onBeforeMount((): void => {
  product.value = productStore.findProduct(id)
})

const productStore = useProductsStore()

const product = ref<ProductFull | null>(null)

const route = useRoute()
const id = Number(route.params.id)
</script>

<style lang="scss">
@import '@/style/productCard';
</style>
