<template>
  <VCardActions class="justify-end">
    <VBtn>
      <VIcon icon="mdi-menu" />
      <VMenu activator="parent">
        <VList>
          <VListItem>
            <EditProductForm :product-id="productId" />
            <VBtn
              @click="productStore.deleteProduct(productId)"
              prepend-icon="mdi-delete"
              >delete</VBtn
            >
          </VListItem>
        </VList>
      </VMenu>
    </VBtn>
  </VCardActions>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products.store'
import EditProductForm from '@/components/products/EditProductForm.vue'

defineProps<{
  productId: number
}>()

const productStore = useProductsStore()
</script>
