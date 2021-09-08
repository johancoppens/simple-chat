
const routes = [
  {
    path: '/',
    component: () => import('layouts/PrivateChatLayout.vue'),
    children: [
      { path: '', name: 'chat', component: () => import('pages/Chat.vue') }
    ]
  },
  {
    path: '/login', name:'login',
    component: () => import('pages/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
