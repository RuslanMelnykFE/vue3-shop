<template>
  <TheHeader />
  <router-view :key="$route.fullPath" />
  <TheFooter />
</template>

<script>
import TheHeader from '@/components/Header/TheHeader.vue';
import TheFooter from '@/components/Footer/TheFooter.vue';

export default {
  name: 'BaseLayout',

  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
