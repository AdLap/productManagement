<template>
  <VRow justify="center">
    <VDialog v-model="formVisible" max-width="1024">
      <template v-slot:activator="{ props }">
        <VBtn prepend-icon="mdi-note-edit" v-bind="props">edit</VBtn>
      </template>
      <VCard>
        <VCardTitle>
          <span class="text-h5">Edit product</span>
        </VCardTitle>
        <VForm>
          <VContainer>
            <VRow>
              <VCol cols="12" sm="6" md="4">
                <VTextField
                  label="Title"
                  required
                  v-model="product.title"
                ></VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="4">
                <VTextarea
                  label="Description"
                  hint="example of helper text only on focus"
                  v-model="product.description"
                >
                </VTextarea>
              </VCol>
              <VCol cols="12" sm="6" md="4">
                <VTextField
                  label="Price"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="product.price"
                ></VTextField>
              </VCol>
              <VCol cols="12">
                <VTextField
                  label="Add image"
                  required
                  v-model="images"
                ></VTextField>
              </VCol>
              <VCol cols="12" sm="6">
                <v-select
                  :items="[1, 2, 3, 4, 5]"
                  label="category"
                  required
                  v-model="product.categoryId"
                ></v-select>
              </VCol>
            </VRow>
          </VContainer>
        </VForm>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
            color="blue-darken-1"
            variant="text"
            @click="formVisible = false"
          >
            Close
          </VBtn>
          <VBtn
            color="blue-darken-1"
            variant="text"
            @click="productStore.updateProduct(productId, product)"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products.store'
import type { Product } from '@/type/types'
import { computed, ref } from 'vue'

const props = defineProps<{
  productId: number
}>()

const productStore = useProductsStore()
const editedProduct = productStore.findProduct(props.productId)

// @ts-expect-error
const product = ref<Product>({
  title: editedProduct.title,
  price: editedProduct.price,
  description: editedProduct.description,
  images: editedProduct.images,
  categoryId: editedProduct.category.id
})

const images = computed({
  get() {
    return product.value.images
  },
  set(value) {
    const images = value.toString().split(',')
    product.value.images = [...images]
  }
})

const formVisible = ref(false)
</script>
