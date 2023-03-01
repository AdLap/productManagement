<template>
  <VRow>
    <VCol>
      <VList lines="one" max-width="1024" class="mx-auto mt-4">
        <VListItem
          v-for="product in products"
          :key="product.id"
          @click="goToCard(product.id)"
        >
          <VRow class="pa-5 align-center">
            <VCol cols="2" class="d-none d-sm-flex">
              <VImg max-width="200" height="200" :src="product.images[0]" cover>
                <template v-slot:placeholder>
                  <VRow
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <VProgressCircular indeterminate color="grey-lighten-5" />
                  </VRow>
                </template>
              </VImg>
            </VCol>
            <VCol cols="10" sm="8">
              <VCardTitle>
                {{ product.title }}
              </VCardTitle>
              <VCardText>
                {{ product.description }}
              </VCardText>
            </VCol>
            <VCol cols="2">
              <ProductActions :product-id="product.id" />
            </VCol>
          </VRow>
        </VListItem>
      </VList>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import router from '@/router'
import type { Products } from '@/type/types'
import ProductActions from '@/components/catalog/products/ProductActions.vue'

defineProps<{
  products: Products
}>()

const goToCard = (id: number): void => {
  router.push({ name: 'product', params: { id } })
}
</script>
