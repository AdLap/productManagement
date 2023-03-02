<template>
  <VContainer class="my-auto">
    <VRow align="center" max-width="800">
      <VCol cols="12" class="mx-auto">
        <VCard class="text-center mx-auto pa-5 w-100" max-width="800">
          <VCardTitle class="text-h5 text-sm-h4 pa-6">{{ title }}</VCardTitle>
          <VCardText>{{ description }}</VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow max-width="800" justify="space-evenly">
      <VCol cols="12" sm="6">
        <VCard>
          <VImg
            :src="`https://picsum.photos/500/300?image=1`"
            :lazy-src="`https://picsum.photos/10/6?image=1`"
            cover
          >
            <template v-slot:placeholder>
              <VRow class="fill-height ma-0" align="center" justify="center">
                <VProgressCircular
                  indeterminate
                  color="grey-lighten-5"
                ></VProgressCircular>
              </VRow>
            </template>
          </VImg>
        </VCard>
      </VCol>
      <VCol
        v-if="!user"
        class="align-self-sm-center order-sm-first"
        cols="12"
        sm="6"
      >
        <VRow class="mt-5 justify-center" no-gutters>
          <Login />
          <Register />
        </VRow>
      </VCol>
      <VCol v-else class="align-self-sm-center order-sm-first" cols="12" sm="4">
        <VCard class="text-center">
          <VCardTitle> Hello {{ user.name ?? 'Boss' }} </VCardTitle>
          <VCardText> New opportunities ahead !!! </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'
import Login from '@/components/user/LoginForm.vue'
import Register from '@/components/user/RegisterForm.vue'

defineProps<{
  title: string
  description: string
}>()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>
