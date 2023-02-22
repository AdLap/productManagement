<template><!-- <nav> -->
  <VToolbar>
    <VBtn @click="goBack" prepend-icon="left-arrow">Wstecz</VBtn>
    <VToolbarTitle class="text-uppercase grey--text">
      <VBtn @click="goHome">
        <span class="font-weight-light">products</span>
        <span>Manager</span>
      </VBtn>
    </VToolbarTitle>
    <VBtn @click="logOut" flat color="grey">
      <span>Sign Out</span>
      <VIcon size="large" color="green-darken-2">mdi-domain</VIcon>
    </VBtn>
    <!-- <VList>
        <VListItem>
          <RouterLink to="/">Home</RouterLink>
        </VListItem>
        <VListItem>
          <RouterLink to="/login">Zaloguj</RouterLink>
        </VListItem>
        <VListItem>
          <RouterLink to="/products">Product List</RouterLink>
        </VListItem>
      </VList> -->
  </VToolbar>
<!-- </nav> -->
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
