import { BasicLayout } from '@/layouts'
export default [
  {
    path: '/',
    redirect: '/welcome',
    component: BasicLayout,
    children: [
      {
        path: '/welcome',
        title: '热烈欢迎',
        component: resolve =>
          import('@pages/welcome').then(module => resolve(module))
      },
      {
        path: '/about',
        title: '关于我们',
        keywords: '关于我们关键词',
        description: '关于我们关键词描述',
        component: resolve =>
          import('@pages/about').then(module => resolve(module))
      }
    ]
  }
]
