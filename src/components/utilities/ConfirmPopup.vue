<template>
  <VCardActions>
    <VDialog v-model="dialog" persistent width="600">
      <template v-slot:activator="{ props }">
        <VBtn v-bind="props" :prepend-icon="icon">{{ title }}</VBtn>
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

const props = defineProps<{
  title: string
  message: string
}>()

const emit = defineEmits(['agree'])
const dialog = ref(false)

let icon = ''
switch (props.title) {
  case 'save':
    icon = 'mdi-note-plus'
    break
  case 'update':
    icon = 'mdi-note-edit'
    break
  case 'delete':
    icon = 'mdi-delete'
    break
  default:
    icon = 'mdi-checkbox-multiple-blank-outline'
}

const agree = () => {
  dialog.value = false
  emit('agree', true)
}

const cancel = () => {
  dialog.value = false
}
</script>
