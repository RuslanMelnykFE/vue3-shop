import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ApiService from '@/services/api/api.service';

const baseURL = 'https://vue-tzr.skillbox.cc';

ApiService.init(baseURL);

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
