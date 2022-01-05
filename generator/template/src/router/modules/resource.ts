export default [
  {
    path: 'system/resource',
    component: () => import('@/views/system/resource/index.vue'),
    meta: { cache: true }
  },
  {
    path: 'system/resource/edit',
    component: () => import('@/views/system/resource/edit.vue'),
    meta: { cache: true }
  }
]
