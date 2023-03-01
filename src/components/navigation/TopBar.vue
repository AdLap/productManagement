<template>
  <VToolbar>
    <VBtn @click="goBack" fab sticky top left
      ><VIcon size="large">mdi-arrow-u-left-top</VIcon></VBtn
    >
    <VToolbarTitle class="text-uppercase grey--text">
      <VBtn @click="goHome">
        <span class="font-weight-light">Products</span>
        <span>Manager</span>
      </VBtn>
    </VToolbarTitle>
    <VBtn @click="logOut" flat color="grey">
      <span>Logout</span>
      <VIcon size="large">mdi-logout</VIcon>
    </VBtn>
  </VToolbar>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'

const { user, logout } = useAuthStore()

const goHome = (): void => {
  router.push({ name: 'home' })
}
const goBack = (): void => {
  router.back()
}
const logOut = (): void => {
  logout()
  goHome()
}
</script>
