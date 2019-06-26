export default [
  {
    path: '/',
    component: '../layouts/index.jsx',
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        component: './home/index.jsx'
      }
    ]
  },
  {
    component: '404'
  }
]
