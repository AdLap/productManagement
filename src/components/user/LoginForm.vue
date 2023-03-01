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
          :type="show ? 'password' : 'text'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          :rules="formRules.password"
        />
        <VBtn @click="loginUser" block class="mt-2">Sign in</VBtn>
      </VForm>
    </VSheet>
  </VDialog>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import type { LoginData } from '@/type/types'

export default {
  setup() {
    const authStore = useAuthStore()

    const loginData = ref<LoginData>({
      email: '',
      password: ''
    })

    const formRules = ref({
      email: [
        (value: string): boolean | string => {
          if (value.length > 3) return true
          return 'Enter more than 3 characters'
        }
      ],
      password: [
        (value: string): boolean | string =>
          value.length > 3 || 'Enter more than 3 characters'
      ]
    })

    const form = ref(null)
    const show = ref(false)

    const valid = async () => {
      // @ts-ignore
      return await form.value.validate()
    }

    const loginUser = async () => {
      console.log(
        `Login: ${loginData.value.email}, Password: ${loginData.value.password}`
      )

      // TODO validation on submit
      // valid().then(response => {
      //   if (!response.valid) {
      //     return
      //   }
      const { email, password } = loginData.value
      try {
        return await authStore.login(email, password)
      } catch (error) {
        return console.error(error)
      }
    }

    return {
      loginData,
      formRules,
      loginUser,
      show
    }
  }
}
</script>

<style scoped lang="scss"></style>
