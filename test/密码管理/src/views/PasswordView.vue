<template>
  <div class="password-manager">
    <h2 class="title">我的密码本</h2>
    
    <div class="password-list">
      <div v-for="item in passwordStore.passwords" :key="item.id" class="password-item">
        <div class="password-info">
          <div class="website">{{ item.get('website') }}</div>
          <div class="username">{{ item.get('username') }}</div>
          <input 
            :type="showPassword[item.id] ? 'text' : 'password'" 
            :value="item.get('password')" 
            readonly
            class="password-input"
          >
          <button 
            @click="togglePasswordVisibility(item.id)" 
            class="toggle-btn"
          >
            {{ showPassword[item.id] ? '隐藏' : '显示' }}
          </button>
        </div>
        <div class="password-actions">
          <button @click="copyToClipboard(item.get('password'))" class="copy-btn">复制</button>
          <button @click="deletePassword(item.id)" class="delete-btn">删除</button>
        </div>
      </div>
    </div>
    
    <form @submit.prevent="addPassword" class="add-form">
      <h3>添加新密码</h3>
      <div class="form-group">
        <label>网站</label>
        <input v-model="newWebsite" placeholder="例如: github.com" required />
      </div>
      <div class="form-group">
        <label>用户名</label>
        <input v-model="newUsername" placeholder="您的用户名" required />
      </div>
      <div class="form-group">
        <label>密码</label>
        <input 
          v-model="newPassword" 
          :type="showNewPassword ? 'text' : 'password'" 
          placeholder="输入密码" 
          required
        />
        <button 
          type="button" 
          @click="showNewPassword = !showNewPassword" 
          class="toggle-btn"
        >
          {{ showNewPassword ? '隐藏' : '显示' }}
        </button>
      </div>
      <button type="submit" class="submit-btn">添加密码</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePasswordStore } from '@/stores/password'

const passwordStore = usePasswordStore()
const newWebsite = ref('')
const newUsername = ref('')
const newPassword = ref('')
const showNewPassword = ref(false)
const showPassword = ref({})

onMounted(() => {
  passwordStore.fetchPasswords()
})

const togglePasswordVisibility = (id) => {
  showPassword.value = {
    ...showPassword.value,
    [id]: !showPassword.value[id]
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => alert('密码已复制到剪贴板'))
    .catch(err => console.error('复制失败:', err))
}

const addPassword = async () => {
  if (!newWebsite.value || !newUsername.value || !newPassword.value) {
    alert('请填写所有字段')
    return
  }
  
  await passwordStore.addPassword(
    newWebsite.value,
    newUsername.value,
    newPassword.value
  )
  newWebsite.value = ''
  newUsername.value = ''
  newPassword.value = ''
}

const deletePassword = async (id) => {
  if (confirm('确定要删除这个密码吗？')) {
    await passwordStore.deletePassword(id)
  }
}
</script>

<style scoped>
.password-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.password-list {
  margin-bottom: 40px;
}

.password-item {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.password-info {
  flex: 1;
}

.website {
  font-weight: bold;
  margin-bottom: 5px;
}

.username {
  color: #666;
  margin-bottom: 5px;
}

.password-input {
  width: 150px;
  margin-right: 10px;
}

.add-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-btn {
  background: #e0e0e0;
}

.copy-btn {
  background: #4CAF50;
  color: white;
  margin-right: 10px;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.submit-btn {
  background: #2196F3;
  color: white;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}
</style>