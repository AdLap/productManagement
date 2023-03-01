<template>
  <VList lines="one">
    <VListItem
      v-for="category in categories"
      :key="category.id"
      @click="showProducts(category.id)"
    >
      <VRow class="justify-space-between align-center">
        <VCol cols="4" class="">
          <VImg max-width="200" :src="category.image" cover>
            <template v-slot:placeholder>
              <VRow class="fill-height ma-0" align="center" justify="center">
                <VProgressCircular indeterminate color="grey-lighten-5" />
              </VRow>
            </template>
          </VImg>
        </VCol>
        <VCol cols="4">
          <VListItemTitle>
            {{ category.name }}
          </VListItemTitle>
        </VCol>
        <VCol cols="2">
          <ProductActions :product-id="category.id" />
        </VCol>
      </VRow>
    </VListItem>
  </VList>
</template>

<script setup lang="ts">
import type { Category } from '@/type/types'
import ProductActions from '@/components/catalog/products/ProductActions.vue'

defineProps<{
  categories: Category[]
}>()

const showProducts = (id: number): void => {
  // TODO show products with this category
  console.log('category id::', id)
}
</script>
