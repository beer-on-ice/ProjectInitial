export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: resolve => import('pages/home').then(module => resolve(module))
  }
]
