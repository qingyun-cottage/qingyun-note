<template>
  <div class="auth-container">
    <h2>用户登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>用户名</label>
        <input v-model="form.username" type="text" required />
      </div>
      <div class="form-group">
        <label>密码</label>
        <input v-model="form.password" type="password" required />
      </div>
      <button type="submit" :disabled="userStore.isLoading">
        {{ userStore.isLoading ? '登录中...' : '登录' }}
      </button>
      <p v-if="userStore.error" class="error">{{ userStore.error }}</p>
    </form>
    <p>还没有账号？<router-link to="/register">立即注册</router-link></p>
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

const handleLogin = async () => {
  const success = await userStore.login(form.value.username, form.value.password)
  if (success) {
    router.push('/')
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.error {
  color: red;
}
</style>