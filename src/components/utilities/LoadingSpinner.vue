<template>
  <VRow v-if="loading" class="fill-height ma-0" align="center" justify="center">
    <VProgressCircular
      indeterminate
      :size="size"
      :width="width"
      :color="color"
    />
  </VRow>
</template>

<script setup lang="ts">
defineProps<{
  size: number
  width: number
  color: string
  loading: boolean
}>()
</script>
