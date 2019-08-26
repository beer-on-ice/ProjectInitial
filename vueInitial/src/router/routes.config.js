import { BasicLayout } from '@/layouts'

export default [
  {
    path: '/',
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: resolve =>
          import('pages/home').then(module => resolve(module))
      }
    ]
  }
]
