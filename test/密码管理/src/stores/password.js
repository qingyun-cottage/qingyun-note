import { defineStore } from 'pinia'
import { AV } from '@/utils/leancloud'

export const usePasswordStore = defineStore('password', {
  state: () => ({
    passwords: []
  }),
  actions: {
    async fetchPasswords() {
      const query = new AV.Query('Password')
      query.equalTo('owner', AV.User.current())
      this.passwords = await query.find()
    },
    async addPassword(website, username, password) {
      const Password = AV.Object.extend('Password')
      const newPassword = new Password()
      newPassword.set('website', website)
      newPassword.set('username', username)
      newPassword.set('password', password)
      newPassword.set('owner', AV.User.current())
      await newPassword.save()
      await this.fetchPasswords()
    },
    async deletePassword(id) {
      const password = AV.Object.createWithoutData('Password', id)
      await password.destroy()
      await this.fetchPasswords()
    }
  }
})