<template>
  <VCardActions class="justify-end">
    <VBtn>
      <VIcon icon="mdi-menu" />
      <VMenu activator="parent">
        <VList>
          <VListItem
            v-for="(item, index) in cardActions"
            :key="index"
            :value="index"
            :prepend-icon="item.icon"
          >
            <VBtn @click="item.action">{{ item.name }}</VBtn>
          </VListItem>
        </VList>
      </VMenu>
    </VBtn>
  </VCardActions>
</template>

<script setup lang="ts">
import type { CardActions } from '@/type/types'

defineProps<{
  cardActions: CardActions[]
}>()
</script>
