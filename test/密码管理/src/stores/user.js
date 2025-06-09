import { defineStore } from 'pinia'
import { AV } from '@/utils/leancloud'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null
  }),
  actions: {
    async login(username, password) {
      try {
        this.currentUser = await AV.User.logIn(username, password)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async register(username, password) {
      const user = new AV.User()
      user.setUsername(username)
      user.setPassword(password)
      try {
        await user.signUp()
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    logout() {
      AV.User.logOut()
      this.currentUser = null
    }
  }
})