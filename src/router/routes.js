
const routes = [
  { path: '/', component: () => import('pages/login/login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/dashboard/dashboard.vue'), meta: { requiresAuth: true } },
      { path: '/registration-page', component: () => import('pages/registration/registration.vue') },
      { path: '/booking-page', component: () => import('pages/registration/ticket_booking.vue') },
    ]
  }
]


export default routes
