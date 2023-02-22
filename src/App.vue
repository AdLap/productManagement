<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from '@/components/navigation/TopBar.vue'
import SideBar from '@/components/navigation/SideBar.vue'
</script>

<template>
  <VApp>
    <TopBar />
    <SideBar />

    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>
