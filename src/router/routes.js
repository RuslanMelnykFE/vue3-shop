import ViewMain from '@/views/ViewMain.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: ViewMain,
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: () => import('@/views/ViewProduct.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/ViewCart.vue'),
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/ViewOrders.vue'),
  },
  {
    path: '/orders/:orderId',
    name: 'orderInfo',
    component: () => import('@/views/ViewOrdersInfo.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
];

export default routes;
