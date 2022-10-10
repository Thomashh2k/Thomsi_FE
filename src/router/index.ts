import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
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
    component: () => import(/* webpackChunkName: "about" */ '../views/ControlPanel.vue'),
    children: [
      {
        path: 'main',
        name: 'mainPanel',
        component: () => import(/* webpackChunkName: "about" */ '../views/controlpanelViews/MainPanel.vue')
      },
      {
        path: 'custom-forms',
        name: 'customForms',
        component: () => import(/* webpackChunkName: "about" */ '../views/controlpanelViews/CustomFormPanel.vue')
      },
      {
        path: 'custom-forms/view/:id',
        name: 'viewCustomForms',
        component: () => import(/* webpackChunkName: "about" */ '../components/CustomFormView.vue')
      },
      {
        path: 'custom-forms/create',
        name: 'createCustomForm',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/CustomFormForm.vue')
      },
      {
        path: 'custom-forms/edit/:id',
        name: 'editCustomForm',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/CustomFormForm.vue')
      },
      {
        path: 'languages',
        name: 'languagePanel',
        component: () => import(/* webpackChunkName: "about" */ '../views/controlpanelViews/LanguagePanel.vue')
      },
      {
        path: 'languages/create',
        name: 'createLanguage',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/LanguageForm.vue')
      },
      {
        path: 'languages/edit/:id',
        name: 'editLanguage',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/LanguageForm.vue')
      },
      {
        path: 'pages',
        name: 'pagesPanel',
        component: () => import(/* webpackChunkName: "about" */ '../views/controlpanelViews/PagePanel.vue')
      },
      {
        path: 'pages/create',
        name: 'createPages',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/PageForm.vue')
      },
      {
        path: 'pages/edit/:id',
        name: 'editPages',
        component: () => import(/* webpackChunkName: "about" */ '../components/controlPanelControls/PageForm.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const userInfoStore = useUserInfoStore()
  if(to.path != '/'){
    if (userInfoStore.getToken == null || userInfoStore.getToken == '') {
      return "/"
    }
  }
  return true
})

export default router
