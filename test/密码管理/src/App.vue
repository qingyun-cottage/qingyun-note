<template>
  <div id="app">
    <header class="app-header">
      <h1>密码本管理系统</h1>
      <nav>
        <router-link to="/" v-if="isAuthenticated">密码本</router-link>
        <router-link to="/login" v-if="!isAuthenticated">登录</router-link>
        <router-link to="/register" v-if="!isAuthenticated">注册</router-link>
        <button 
          v-if="isAuthenticated" 
          @click="handleLogout" 
          class="logout-btn"
        >
          退出
        </button>
      </nav>
    </header>
    
    <main class="app-content">
      <router-view />
    </main>
    
    <footer class="app-footer">
      <p>© 2023 密码本管理系统 - 安全存储您的密码</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const isAuthenticated = computed(() => userStore.currentUser !== null)

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.app-header {
  background: #2196F3;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  margin: 0;
  font-size: 24px;
}

.app-header nav {
  display: flex;
  gap: 15px;
  align-items: center;
}

.app-header a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
}

.app-header a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.app-header a.router-link-active {
  background: rgba(255, 255, 255, 0.3);
}

.logout-btn {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.app-content {
  flex: 1;
  padding: 20px;
}

.app-footer {
  background: #f5f5f5;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  color: #666;
}
</style>
