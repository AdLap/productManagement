<template>
  <VCardActions>
    <VDialog v-model="formVisible" max-width="800">
      <template v-slot:activator="{ props }">
        <VBtn
          prepend-icon="mdi-note-edit"
          v-bind="props"
          class="w-100 justify-start"
          >edit</VBtn
        >
      </template>
      <VCard class="pa-4">
        <VCardTitle class="text-h5">Edit product</VCardTitle>
        <VForm fast-fail ref="form">
          <VContainer>
            <VRow>
              <VCol cols="12" sm="6">
                <VTextField
                  label="Title"
                  required
                  v-model="product.title"
                  :rules="formRules.title"
                />
                <VTextField
                  label="Price"
                  required
                  v-model="product.price"
                  :rules="formRules.price"
                />
                <VSelect
                  :items="[1, 2, 3, 4, 5]"
                  label="Category"
                  required
                  v-model="product.categoryId"
                  :rules="formRules.category"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextarea
                  label="Description"
                  required
                  v-model="product.description"
                  :rules="formRules.description"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <VTextField
                  label="Add pictures"
                  hint="add the full url to the pictures by separating them with a comma"
                  persistent-hint
                  required
                  v-model="images"
                  :rules="formRules.images"
                />
              </VCol>
            </VRow>
          </VContainer>
        </VForm>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="blue-darken-1"
            variant="text"
            @click="formVisible = false"
          >
            Close
          </VBtn>
          <ConfirmPopup
            title="update"
            message="Are you sure to save the changes?"
            prepend-icon="mdi-note-edit"
            @agree="submitForm"
          />
        </VCardActions>
      </VCard>
    </VDialog>
  </VCardActions>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products.store'
import type { Product } from '@/type/types'
import { computed, ref } from 'vue'
import ConfirmPopup from '@/components/utilities/ConfirmPopup.vue'

const props = defineProps<{
  productId: number
}>()

const productStore = useProductsStore()
const editedProduct = productStore.findProduct(props.productId)

// @ts-ignore
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
    const image = value.toString().split(',')
    product.value.images = [...image]
  }
})

const formVisible = ref(false)
const form = ref(null)

const formRules = ref({
  title: [
    (value: string): boolean | string => {
      if (value.length < 3)
        return 'The title should be longer than 3 characters'
      if (value.length > 63)
        return 'The title should be less than 64 characters'
      return true
    }
  ],
  description: [
    (value: string): boolean | string => {
      if (value.length < 32)
        return 'The description should be longer than 32 characters'
      if (value.length > 128)
        return 'The description should be less than 128 characters long'
      return true
    }
  ],
  price: [
    (value: number): boolean | string => {
      if (value <= 0) return 'Price must be positive'
      //@ts-expect-error
      if (!/[0-9]?[0-9]?(\.[0-9][0-9]?)?/gm.test(value)) return 'Enter a number'
      return true
    }
  ],
  images: [
    (value: string): boolean | string => {
      if (
        !/^((http(s):\/\/.)[-a-zA-Z0-9@:%.~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%.~#?&//=]*)([^ ,;$]*[ ]*))/gm.test(
          value
        )
      )
        return 'Enter the correct URL'
      if (!value) return 'Add links to pictures'
      return true
    }
  ],
  category: [
    (value: string): boolean | string => {
      if (!value) return 'Select a category'
      return true
    }
  ]
})

const valid = async () => {
  // @ts-ignore
  return await form.value.validate()
}

const submitForm = (): void => {
  valid().then((response) => {
    console.log(response)
    if (!response.valid) {
      console.error(response.errorMessages)
      return
    }

    productStore.updateProduct(props.productId, product.value)
  })
}
</script>
