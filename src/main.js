import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import BaseLayout from '@/components/Layout/BaseLayout.vue';
import BaseBreadcrumbs from '@/components/Breadcrumbs/BaseBreadcrumbs.vue';

import ApiService from '@/services/api/api.service';

const baseURL = 'https://vue-tzr.skillbox.cc';

ApiService.init(baseURL);

const app = createApp(App);

app.component('BaseLayout', BaseLayout);
app.component('BaseBreadcrumbs', BaseBreadcrumbs);
app
  .use(store)
  .use(router)
  .mount('#app');
