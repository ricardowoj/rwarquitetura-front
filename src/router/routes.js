
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/meu-perfil',
        component: () => import('src/pages/perfil/meu-perfil.vue'),
        meta: { requireLogin: true }
      },
      {
        path: '/usuario',
        component: () => import('pages/admin/usuario.vue'),
        meta: { requireLogin: true }
      },
      {
        path: '/cliente',
        component: () => import('pages/arquiteto/cliente/cliente.vue'),
        meta: { requireLogin: true }
      },
      {
        path: '/projeto-cadastro',
        component: () => import('src/pages/arquiteto/projeto/projeto-cadastro.vue'),
        meta: { requireLogin: true }
      },
      {
        path: '/projeto-levantamento',
        component: () => import('src/pages/arquiteto/projeto/projeto-levantamento.vue'),
        meta: { requireLogin: true }
      }
    ]
  },
  {
    name: 'LoginIn',
    path: '/login',
    component: () => import('src/pages/login/login.vue')
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/error/Error404.vue')
  }
]

export default routes
