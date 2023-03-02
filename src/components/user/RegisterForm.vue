<template>
  <VDialog max-width="600">
    <template v-slot:activator="{ props }">
      <VBtn v-bind="props" variant="plain">Sign up</VBtn>
    </template>
    <VSheet width="400" class="mx-auto">
    <h2 class="text-center">WorkInProgress</h2>
      <VForm fast-fail ref="form" class="pa-6">
        <VTextField
          v-model="registerData.email"
          label="Login"
          required
          :rules="formRules.email"
        />
        <VTextField
          v-model="registerData.password"
          label="Password"
          required
          :type="showPassword ? 'password' : 'text'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="formRules.password"
        />
        <VTextField
          v-model="registerData.name"
          label="Name"
          required
          :rules="formRules.name"
        />
        <VSelect
          v-model="registerData.role"
          :items="['customer']"
          label="Role"
          required
          :rules="formRules.role"
        />
        <VTextField
          v-model="registerData.avatar"
          label="Avatar"
          hint="add the full url to the picture"
          persistent-hint
          required
          :rules="formRules.avatar"
        />
        <VBtn @click="registerUser" block class="mt-2">Sign up</VBtn>
      </VForm>
    </VSheet>
  </VDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import type { RegisterData } from '@/type/types'

const authStore = useAuthStore()

const registerData = ref<RegisterData>({
  email: '',
  password: '',
  name: '',
  role: '',
  avatar: ''
})

const formRules = ref({
  email: [
    (value: string): boolean | string => {
      if (value.length < 3) return 'Enter more than 3 characters'
      if (
        !/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i.test(
          value
        )
      )
        return 'Enter valid email'
      return true
    }
  ],
  password: [
    (value: string): boolean | string => {
      if (value.length < 3) return 'Enter more than 3 characters'
      return true
    }
  ],
  name: [],
  role: [],
  avatar: []
})

const form = ref(null)
const showPassword = ref(false)
const showPassword2 = ref(false)

const valid = async () => {
  // @ts-ignore
  return await form.value.validate()
}

const registerUser = async () => {
  valid().then((response) => {
    if (!response.valid) {
      return
    }
    const { email, password, name, role, avatar } = registerData.value
  })
}
</script>
