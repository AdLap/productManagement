<template>
  <VDialog activator="parent">
    <VCard
      elevation="4"
      max-width="700"
      class="d-flex justify-space-between pa-3 mx-auto w-75"
    >
      <VCardTitle>Category List</VCardTitle>
      <!-- <AddCategoryForm /> -->
      <VRow justify="center">
        <VCol>
          <CategoryList :categories="paginatedCategories" />
        </VCol>
      </VRow>
      <VRow v-if="paginationLength > 1" justify="center">
        <VCol cols="10">
          <VContainer class="max-width">
            <VPagination
              v-model="page.currPage"
              :length="paginationLength"
              rounded="0"
            />
          </VContainer>
        </VCol>
      </VRow>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/stores/categories.store'
// import AddCategoryForm from '@/components/catalog/categories' // TODO
import { computed, onBeforeMount, ref } from 'vue'
import type { Category } from '@/type/types'
import CategoryList from '@/components/catalog/categories/CategoryList.vue'

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

onBeforeMount(() => {
  if (!categories.value.length) {
    categoriesStore.getAll()
  }
})

const page = ref({
  currPage: 1,
  length: 7,
  perPage: 4
})

const paginationLength = computed<number>(() =>
  Math.ceil(page.value.length / page.value.perPage)
)

const paginatedCategories = computed<Category[]>(() => {
  const lastCategory = page.value.perPage * page.value.currPage
  return categories.value.slice(lastCategory - page.value.perPage, lastCategory)
})
</script>
