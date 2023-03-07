<template>
  <VDialog v-model="formVisible" max-width="800">
    <template v-slot:activator="{ props }">
      <VBtn prepend-icon="mdi-note-plus" v-bind="props">Add</VBtn>
    </template>
    <VCard>
      <VCardTitle>
        <span class="text-h5">Add product</span>
      </VCardTitle>
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
                :items="categories"
                item-title="name"
                item-value="id"
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
        <VBtn color="blue-darken-1" variant="text" @click="formVisible = false">
          Close
        </VBtn>
        <ConfirmPopup
          title="save"
          message="Are you sure to save the changes?"
          prepend-icon="mdi-content-plus"
          @agree="submitForm"
        />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products.store'
import type { Product } from '@/type/types'
import { computed, ref } from 'vue'
import ConfirmPopup from '@/components/utilities/ConfirmPopup.vue'
import { useCategoriesStore } from '@/stores/categories.store'
import { storeToRefs } from 'pinia'

const productStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

const product = ref<Product>({
  title: '',
  price: null,
  description: '',
  images: '',
  categoryId: null
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

const formRules = ref({
  title: [
    (value: string): boolean | string => {
      if (!value) return 'Enter title'
      if (value.length < 3)
        return 'The title should be longer than 3 characters'
      if (value.length > 63)
        return 'The title should be less than 64 characters'
      return true
    }
  ],
  description: [
    (value: string): boolean | string => {
      if (!value) return 'Enter description'
      if (value.length < 32)
        return 'The description should be longer than 32 characters'
      if (value.length > 128)
        return 'The description should be less than 128 characters long'
      return true
    }
  ],
  price: [
    (value: number): boolean | string => {
      if (!value) return 'Enter price'
      if (value <= 0) return 'Price must be positive'
      //@ts-expect-error
      if (!/[0-9]?[0-9]?(\.[0-9][0-9]?)?/gm.test(value)) return 'Enter a number'
      return true
    }
  ],
  images: [
    (value: string): boolean | string => {
      if (!value) return 'Add links to pictures'
      if (
        !/^((http(s):\/\/.)[-a-zA-Z0-9@:%.~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%.~#?&//=]*)([^ ,;$]*[ ]*))/gm.test(
          value
        )
      )
        return 'Enter the correct URL'
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
const formVisible = ref(false)
const form = ref(null)

const valid = async () => {
  //@ts-expect-error
  return await form.value.validate()
}

const submitForm = (): void => {
  valid().then((response) => {
    console.log(response)
    if (!response.valid) {
      console.error(response.errorMessages)
      return
    }
    productStore.addProduct(product.value)
  })
}
</script>
