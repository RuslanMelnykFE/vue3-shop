<template>
  <TheHeader />
  <router-view :key="$route.fullPath" />
  <TheFooter />
</template>

<script>
import { useStore } from 'vuex';
import TheHeader from '@/components/Header/TheHeader.vue';
import TheFooter from '@/components/Footer/TheFooter.vue';

export default {
  name: 'BaseLayout',

  components: {
    TheHeader,
    TheFooter,
  },

  setup() {
    const $store = useStore();
    $store.dispatch('users/setAccessKey');
    $store.dispatch('basket/loadBasketProducts');
  },
};
</script>
