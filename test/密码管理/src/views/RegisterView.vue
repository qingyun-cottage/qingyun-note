<template>
  <div class="auth-container">
    <h2>用户注册</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>用户名</label>
        <input v-model="form.username" type="text" required />
      </div>
      <div class="form-group">
        <label>密码</label>
        <input v-model="form.password" type="password" required />
      </div>
      <button type="submit" :disabled="userStore.isLoading">
        {{ userStore.isLoading ? '注册中...' : '注册' }}
      </button>
      <p v-if="userStore.error" class="error">{{ userStore.error }}</p>
    </form>
    <p>已有账号？<router-link to="/login">立即登录</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const handleRegister = async () => {
  const success = await userStore.register(form.value.username, form.value.password)
  if (success) {
    router.push('/')
  }
}
</script>

<style scoped>
/* 复用LoginView的样式 */
</style>