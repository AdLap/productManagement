<template>
  <VDialog max-width="600">
    <template v-slot:activator="{ props }">
      <VBtn v-bind="props">Zaloguj się</VBtn>
    </template>
    <VSheet width="300" class="mx-auto">
      <VForm fast-fail ref="form">
        <VTextField v-model="loginData.email" label="Login" :rules="formRules.email" />
        <VTextField v-model="loginData.password" label="Password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show" :rules="formRules.password" />
        <VBtn @click="loginUser" block class="mt-2">Zaloguj</VBtn>
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
          return 'Login za krótki'
        }
      ],
      password: [
        (value: string): boolean | string =>
          value.length > 3 || 'Więcej niż 3 znaki'
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
      // router.push({ name: 'dashboard' })
      // })
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
