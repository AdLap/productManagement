<template>
  <VApp>
    <SideBar />
    <VMain class="h-screen d-flex flex-column">
      <TopBar v-if="smAndUp" />
      <RouterView />
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from '@/components/navigation/TopBar.vue'
import SideBar from '@/components/navigation/SideBar.vue'
import { useDisplay } from 'vuetify'

const { smAndUp } = useDisplay()
</script>
