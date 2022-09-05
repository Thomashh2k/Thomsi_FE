export {}

import { ApiManagerPlugin } from "./ApiManagers";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $apiManager: ApiManagerPlugin
    }
  }
  