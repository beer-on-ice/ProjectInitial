import { BasicLayout } from '@/layouts'
export default [
  {
    path: '/',
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        title: '热烈欢迎',
        component: resolve =>
          import(
            /* webpackChunkName: "home" */ '@/views/Home.vue'
          ).then(module => resolve(module))
      }
    ]
  }
]
