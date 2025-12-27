<template>
  <div>
    <Navbar :user="currentUser" @open-login="loginOpen = true" />
    <Login v-if="loginOpen" @close="loginOpen = false" @login-success="onLoginSuccess" />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue'
import Login from '~/components/layout/Login.vue'
import type { User } from '~/types/user'
import { ref } from 'vue'
import { useFetch } from '#app'

const loginOpen = ref(false)
const currentUser = ref<User | null>(null)

const { data: users, error } = await useFetch<User[]>('/api/users', {
  server: true,
})

if (error.value) console.error('Failed to fetch users:', error.value)

const onLoginSuccess = (user: User) => {
  currentUser.value = user
}
</script>
