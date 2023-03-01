<template>
  <VCardActions :class="displayGrid ? 'justify-end' : 'justify-center'">
    <VBtn>
      <VIcon icon="mdi-menu" />
      <VMenu activator="parent">
        <VList>
          <VListItem>
            <EditProductForm :product-id="productId" />
            <ConfirmPopup
              title="delete"
              message="Are you sure to remove?"
              prepend-icon="mdi-delete"
              @agree="productStore.deleteProduct(productId)"
            />
          </VListItem>
        </VList>
      </VMenu>
    </VBtn>
  </VCardActions>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products.store'
import EditProductForm from '@/components/catalog/products/EditProductForm.vue'
import ConfirmPopup from '@/components/utilities/ConfirmPopup.vue'
import { storeToRefs } from 'pinia'

defineProps<{
  productId: number
}>()

const productStore = useProductsStore()
const { displayGrid } = storeToRefs(productStore)
</script>
