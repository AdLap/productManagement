<template>
  <VRow justify="center">
    <VDialog v-model="formVisible" max-width="1024">
      <template v-slot:activator="{ props }">
        <VBtn prepend-icon="mdi-note-edit" v-bind="props">add</VBtn>
      </template>
      <VCard>
        <VCardTitle>
          <span class="text-h5">Add product</span>
        </VCardTitle>
        <VForm fast-fail ref="form">
          <VContainer>
            <VRow>
              <VCol cols="12" sm="6" md="4">
                <VTextField label="Title" required v-model="product.title" :rules="formRules.title"></VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="4">
                <VTextarea label="Description" hint="example of helper text only on focus" v-model="product.description"
                  :rules="formRules.description">
                </VTextarea>
              </VCol>
              <VCol cols="12" sm="6" md="4">
                <VTextField label="Price" hint="example of persistent helper text" persistent-hint required
                  v-model="product.price" :rules="formRules.price"></VTextField>
              </VCol>
              <VCol cols="12">
                <VTextField label="Add image" required v-model="images" :rules="formRules.images"></VTextField>
              </VCol>
              <VCol cols="12" sm="6">
                <v-select :items="[1, 2, 3, 4, 5]" label="category" required v-model="product.categoryId"
                  :rules="formRules.category"></v-select>
              </VCol>
            </VRow>
          </VContainer>
        </VForm>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="blue-darken-1" variant="text" @click="formVisible = false">
            Close
          </VBtn>
          <VBtn color="blue-darken-1" variant="text" @click="submitForm">
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

const productStore = useProductsStore()

// @ts-expect-error
const product = ref<Product>({
  title: '',
  price: 0.01,
  description: '',
  images: '',
  categoryId: 0
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
      if (value.length < 3) return 'Tytuł powinien być dłuższy niż 3 znaki'
      if (value.length > 63) return 'Tytuł pownien mieć mniej niż 64 znaki'
      return true
    }
  ],
  description: [
    (value: string): boolean | string => {
      if (value.length < 32) return 'Opis powinien być dłuższy niż 32 znaków'
      if (value.length > 128) return 'Opis pownien mieć mniej niż 128 znaków'
      return true
    }
  ],
  price: [
    (value: number): boolean | string => {
      if (value <= 0) return 'Cena musi być dodatnia'
      // @ts-expect-error
      if (!/[0-9]*(\.[0-9]{0,2})/g.test(value)) return 'Cena musi być liczbą'
      return true
    }
  ],
  images: [
    (value: string): boolean | string => {
      if (!/^((http(s):\/\/.)[-a-zA-Z0-9@:%. \+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:% \+.~#?&//=]*)([^ ,;$]*[ ]*))/gm.test(value)) return 'Url jest nieprawidłowy'
      if (!value) return 'Dodaj zdjęcie'
      return true
    }
  ],
  category: [
    (value: string): boolean | string => {
      if (!value) return 'Kategoria nie może być pusta'
      return true
    }
  ]
})

const formVisible = ref(false)
const form = ref(null)

const valid = async () => {
  // @ts-ignore
  return await form.value.validate()
}

const submitForm = (): void => {
  valid().then(response => {
    console.log(response)
    if (!response.valid) {
      console.error(response.errorMessages)
      return
    }

    productStore.addProduct(product.value)
  })
}
</script>
