<template>
  <VContainer fluid class="h-100 d-flex flex-column">
    <VSheet elevation="4" class="d-flex justify-space-between pa-3">
      <h2 class="me-auto">Product List</h2>
      <AddProductForm />
      <VBtn @click="productStore.changeListGrid" class="ml-4">
        <VIcon :icon="displayGrid ? 'mdi-view-list' : 'mdi-view-grid'" />
      </VBtn>
    </VSheet>

    <LoadingSpinner
      :loading="loading"
      :size="128"
      :width="12"
      color="grey-lighten-5"
    />

    <ProductListGrid v-if="displayGrid" :products="paginatedProducts" />
    <ProductListList v-else :products="paginatedProducts" />
    <VRow justify="center" align="end">
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
import ProductListGrid from '@/components/catalog/products/list/ProductListGrid.vue'
import ProductListList from '@/components/catalog/products/list/ProductListList.vue'
import AddProductForm from '@/components/catalog/products/AddProductForm.vue'
import { computed, onBeforeMount, ref } from 'vue'
import type { Product } from '@/type/types'
import LoadingSpinner from '@/components/utilities/LoadingSpinner.vue'

const productStore = useProductsStore()
const { products, loading, displayGrid } = storeToRefs(productStore)

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

const paginationLength = computed<number>(() =>
  Math.ceil(page.value.length / page.value.perPage)
)

const paginatedProducts = computed<Product[]>(() => {
  const lastProduct = page.value.perPage * page.value.currPage
  return products.value.slice(lastProduct - page.value.perPage, lastProduct)
})
</script>
