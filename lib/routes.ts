export const pageRoutes = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
} as const;

export const apiRoutes = {
  register: '/api/register',
  stats: '/api/stats',
  subscribe: '/api/subscribe',
} as const;
