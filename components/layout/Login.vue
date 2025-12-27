<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full mb-3 p-2 border rounded"
          required
        />
        <button
          type="submit"
          class="w-full bg-yellow-400 text-black p-2 rounded font-semibold hover:bg-yellow-300"
        >
          Login
        </button>
      </form>
      <button @click="$emit('close')" class="mt-4 text-sm text-gray-500 hover:underline">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '#app'

const email = ref('')
const password = ref('')
const emit = defineEmits(['login-success', 'close'])

const login = async () => {
  const { data: users } = await useFetch('/api/users')
  const user = users.value?.find(u => u.email === email.value && u.password === password.value)

  if (user) {
    alert(`Logged in as ${user.name}`)
    emit('login-success', user)
    emit('close')
  } else {
    alert('Invalid email or password')
  }
}
</script>
