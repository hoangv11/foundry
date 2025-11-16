export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
  INTEGRATIONS: '/integrations',
  ANALYTICS: '/analytics',
  REPORTS: '/reports',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  LOGIN: '/login',
} as const

export const API_ROUTES = {
  CHAT: '/api/chat',
  TEST_CHAT: '/api/test-chat',
  PITCHDECK_EXPORT: '/api/pitchdeck/export',
  PITCHDECK_UPLOAD: '/api/pitchdeck/upload',
} as const
