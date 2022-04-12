
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/meu-perfil',
        component: () => import('pages/meu-perfil.vue'),
        meta: { requireLogin: true }
      },
      {
        path: '/usuario',
        component: () => import('pages/admin/usuario.vue'),
        meta: { requireLogin: true }
      },
      {
        path: '/cliente',
        component: () => import('pages/arquiteto/cliente.vue'),
        meta: { requireLogin: true }
      }
    ]
  },
  {
    name: 'LoginIn',
    path: '/login',
    component: () => import('pages/login.vue')
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
