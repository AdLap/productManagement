<template>
  <VDialog max-width="600">
    <template v-slot:activator="{ props }">
      <VBtn v-bind="props">Sign in</VBtn>
    </template>
    <VSheet width="300" class="mx-auto">
      <VForm fast-fail ref="form" class="pa-4">
        <VTextField
          v-model="loginData.email"
          label="Login"
          :rules="formRules.email"
        />
        <VTextField
          v-model="loginData.password"
          label="Password"
          :type="showPassword ? 'password' : 'text'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="formRules.password"
        />
        <VBtn @click="loginUser" block class="mt-2">Sign in</VBtn>
      </VForm>
    </VSheet>
  </VDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import type { LoginData } from '@/type/types'

const authStore = useAuthStore()

const loginData = ref<LoginData>({
  email: '',
  password: ''
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
  ]
})

const form = ref(null)
const showPassword = ref(false)

const valid = async () => {
  // @ts-ignore
  return await form.value.validate()
}

const loginUser = async () => {
  console.log(
    `Login: ${loginData.value.email}, Password: ${loginData.value.password}`
  )

  valid().then((response) => {
    if (!response.valid) {
      return
    }
    const { email, password } = loginData.value
    authStore.login(email, password)
  })
}
</script>

<style scoped lang="scss"></style>
