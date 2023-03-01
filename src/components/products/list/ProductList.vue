<template>
  <VSheet
    elevation="4"
    max-max-width="600"
    class="d-flex justify-space-between pa-3"
  >
    <h2>Product List</h2>
    <AddProductForm />
    <VBtn @click="productStore.changeListGrid">
      <VIcon :icon="displayGrid ? 'mdi-view-list' : 'mdi-view-grid'" />
    </VBtn>
  </VSheet>

  <VContainer fluid>
    <ProductListGrid v-if="displayGrid" :products="paginatedProducts" />
    <ProductListList v-else :products="paginatedProducts" />
    <VRow justify="center">
      <VCol cols="6">
        <VContainer class="max-width">
          <VPagination
            v-model="page.currPage"
            :length="paginationLength"
            rounded="0"
            class="my-4"
          ></VPagination>
        </VContainer>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.store'
import ProductListGrid from '@/components/products/list/ProductListGrid.vue'
import ProductListList from '@/components/products/list/ProductListList.vue'
import AddProductForm from '@/components/products/AddProductForm.vue'
import { computed, onBeforeMount, ref } from 'vue'
import type { Product } from '@/type/types'

const productStore = useProductsStore()
const { products, displayGrid } = storeToRefs(productStore)

onBeforeMount(() => {
  if (!products.value.length) {
    productStore.getAll()
  }
})

const page = ref({
  currPage: 1,
  length: 100,
  perPage: 25
})

const paginationLength = computed<number>(() => page.value.length / page.value.perPage)

const paginatedProducts = computed<Product[]>(() => {
  const lastProduct = page.value.perPage * page.value.currPage
  return products.value.slice(lastProduct - page.value.perPage, lastProduct)
})
</script>
