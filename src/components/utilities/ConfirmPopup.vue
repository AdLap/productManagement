<template>
  <VCardActions>
    <VDialog v-model="dialog" persistent width="600">
      <template v-slot:activator="{ props }">
        <VBtn v-bind="props" prepend-icon="mdi-delete">{{ title }}</VBtn>
      </template>
      <VCard>
        <VCardTitle class="text-h5">Confirm</VCardTitle>
        <VCardText>{{ message }}</VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="green-darken-1" variant="text" @click="cancel">
            Cancel
          </VBtn>
          <VBtn color="green-darken-1" variant="text" @click="agree">
            Confirm
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VCardActions>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
  message: string
}>()

const emit = defineEmits(['agree'])
const dialog = ref(false)

const agree = () => {
  dialog.value = false
  emit('agree', true)
}

const cancel = () => {
  dialog.value = false
}
</script>
