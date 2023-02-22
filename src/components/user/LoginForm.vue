<template>
  <VDialog max-width="600">
    <template v-slot:activator="{ props }">
      <VBtn v-bind="props">Zaloguj się</VBtn>
    </template>
    <VSheet width="300" class="mx-auto">
      <VForm fast-fail @submit.prevent="loginUser">
        <VTextField
          v-model="loginData.email"
          label="Login"
          :rules="loginRules.emailRules"
        />
        <VTextField
          v-model="loginData.password"
          label="Password"
          :rules="loginRules.passwordRules"
        />
        <VBtn @click="loginUser" type="submit" block class="mt-2">Zaloguj</VBtn>
      </VForm>
    </VSheet>
  </VDialog>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

interface LoginData {
  email: string
  password: string
}

export default {
  setup() {
    const loginData = ref<LoginData>({
      email: '',
      password: ''
    })

    const loginRules = ref({
      emailRules: [
        (value: string): boolean | string => {
          if (value.length > 3) return true
          return 'Login za krótki'
        }
      ],
      passwordRules: [
        (value: string): boolean | string =>
          value.length > 3 || 'Więcej niż 3 znaki'
      ]
    })

    const loginUser = async () => {
      console.log(
        `Login: ${loginData.value.email}, Password: ${loginData.value.password}`
      )

      const authStore = useAuthStore()
      const { email, password } = loginData.value

      try {
        return await authStore.login(email, password)
      } catch (error) {
        return console.error(error)
      }

      // router.push({ name: 'products' })
    }

    return {
      loginData,
      loginRules,
      loginUser
    }
  }
}
</script>

<style scoped lang="scss"></style>
