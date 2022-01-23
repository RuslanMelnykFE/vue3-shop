<template>
  <ul class="cart__list">
    <CartListItem v-for="product in productList" :key="product.id" :product="product" />
  </ul>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CartListItem from './CartListItem.vue';

export default {
  components: {
    CartListItem,
  },

  setup() {
    const $store = useStore();
    const productList = computed(() => $store.getters['basket/basketProducts']);

    return { productList };
  },
};
</script>
