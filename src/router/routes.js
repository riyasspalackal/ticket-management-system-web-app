
const routes = [
  { path: '/', component: () => import('pages/login/login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/dashboard/dashboard.vue'), meta: { requiresAuth: true } },
      { path: '/registration-page', component: () => import('pages/registration/registration.vue') },
    ]
  }
]


export default routes
