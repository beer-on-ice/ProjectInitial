export default [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    component: resolve =>
      import('pages/welcome').then(module => resolve(module))
  },
  {
    path: '/home/:id',
    component: resolve =>
      import('components/Layout').then(module => resolve(module)),
    children: [
      {
        path: '/home/1',
        component: resolve =>
          import('pages/test').then(module => resolve(module))
      },
      {
        path: '/home/2',
        component: resolve =>
          import('pages/tests').then(module => resolve(module))
      }
    ]
  }
]
