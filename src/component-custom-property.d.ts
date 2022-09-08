export {}

import { ApiManagerPlugin } from "./ApiManagers";
import { apiManager } from "./ApiManagers/types/apiManager";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $apiManager: apiManager
    }
  }
  