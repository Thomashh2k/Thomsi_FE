import { defineStore } from 'pinia'
import { aspNetUser } from '@/dbTables'


// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({ user: {} as aspNetUser, token: '', expiration: Date }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getExpiration: (state) => state.expiration,
  },
  actions: {
    setUser(user: aspNetUser) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    setExpiration(expiration: Date) {
      this.expiration = expiration
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['user', 'token', 'expiration'],
  },
})
