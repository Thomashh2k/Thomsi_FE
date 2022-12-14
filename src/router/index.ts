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
        path: "languages",
        name: 'languagePanel',
        component: () => import(/* webpackChunkName: "about" */ '../views/controlpanelViews/languagePanel.vue'),
      },
      {
        path: "languages/create",
        name: 'createLanguage',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/LanguageForm.vue'),
      },
      {
        path: "languages/edit/:id",
        name: 'editLanguage',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/LanguageForm.vue'),
      },
      {
        path: "pages",
        name: 'pagesPanel',
        component: () => import(/* webpackChunkName: "about" */ '../views/controlpanelViews/pagePanel.vue'),
      },
      {
        path: "pages/create",
        name: 'createPages',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/PageForm.vue'),
      },
      {
        path: "pages/edit/:id",
        name: 'editPages',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/PageForm.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
