<template>
  <VContainer class="chuj h-screen d-flex flex-column justify-evenly" fluid>
    <VRow align="center">
      <VCol cols="12">
        <VCard class="text-center mx-auto pa-5 w-100" max-width="600">
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
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
          <VBtn variant="plain">Sign up</VBtn>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'
import Login from '@/components/user/LoginForm.vue'

defineProps<{
  title: string
  description: string
}>()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<style scoped lang="scss">
@import '@/style/components/homePage.scss';
</style>
