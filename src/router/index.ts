import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login.vue'
import { useUserInfoStore } from '@/store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/controlpanel',
    name: 'controlpanel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/controlpanelViews/controlPanel.vue'),
    beforeEnter(to, from) {
      //This function only checks if a token exists
      //a better way would be if it also checks the token validity
      const userInfoStore = useUserInfoStore();

      if(userInfoStore.getToken == null || userInfoStore.getToken == "") {
        console.log("redirection failed")
        return false
      }
      return true;
    },
    children: [
      {
        path: "language",
        name: 'languagePanel',
        component: () => import(/* webpackChunkName: "about" */ '../views/controlpanelViews/languagePanel.vue'),
      },
      {
        path: "language/create",
        name: 'language',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/CreateLanguageForm.vue'),
      },
      {
        path: "pages",
        name: 'pagesPanel',
        component: () => import(/* webpackChunkName: "about" */ '../views/controlpanelViews/pagePanel.vue'),
      },
      {
        path: "pages/create",
        name: 'createPages',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/CreatePageForm.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
