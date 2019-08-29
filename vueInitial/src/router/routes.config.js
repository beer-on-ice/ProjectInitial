import { BasicLayout } from '@/layouts'
export default [
  {
    path: '/',
    redirect: '/welcome',
    component: BasicLayout,
    children: [
      {
        path: '/welcome',
        component: resolve =>
          import('pages/welcome').then(module => resolve(module))
      }
    ]
  }
]
