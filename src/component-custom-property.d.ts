import { apiManager } from './ApiManagers/types/apiManager'

export {}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $apiManager: apiManager
    }
  }
