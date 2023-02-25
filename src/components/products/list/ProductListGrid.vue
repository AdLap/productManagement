<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="3"
      v-for="product in products"
      :key="product.id"
      @click="goToCard(product.id)"
    >
      <VCard class="product-card-grid text-sx-center ma-3">
        <VImg :src="product.images[0]" cover class="mx-auto" max-width="200">
          <template v-slot:placeholder>
            <VRow class="fill-height ma-0" align="center" justify="center">
              <VProgressCircular indeterminate color="grey-lighten-5" />
            </VRow>
          </template>
        </VImg>
        <VCardTitle>
          {{ product.title }}
        </VCardTitle>
        <VCardText>
          {{ product.description }}
        </VCardText>
        <ProductActions :product-id="product.id" />
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import router from '@/router'
import type { Product } from '@/type/types'
import ProductActions from '@/components/products/ProductActions.vue'

defineProps<{
  products: Product[]
}>()

defineEmits(['product'])

const goToCard = (id: number): void => {
  router.push({ name: 'product', params: { id } })
}
</script>
