<template>
  <ul class="catalog__list">
    <li v-for="product in products" :key="product.slug" class="catalog__item">
      <CatalogItem :item-data="product" />
    </li>
  </ul>

  <p v-if="products && !products.length" class="catalog__error">
    Товары не найдены
  </p>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import CatalogItem from './CatalogItem.vue';

export default defineComponent({
  name: 'CatalogList',

  components: {
    CatalogItem,
  },

  setup() {
    const $store = useStore();
    const products = computed(() => $store.getters['products/products']);

    return {
      products,
    };
  },
});
</script>

<style>
.catalog__error {
  font-size: 25px;
  text-align: center;
}
</style>
