<template>
  <div class="content__catalog">
    <CatalogFilter
      v-model:minPrice.number="minPrice"
      v-model:maxPrice.number="maxPrice"
      v-model:categoryId="categoryId"
      @loadProducts="doLoadProducts"
    />

    <section class="catalog">
      <CatalogList />
      <CatalogPagiantion v-model.number="page" />
    </section>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import CatalogFilter from './CatalogFilter.vue';
import CatalogList from './CatalogList.vue';
import CatalogPagiantion from './CatalogPagination.vue';

export default defineComponent({
  name: 'TheCatalog',

  components: {
    CatalogFilter,
    CatalogList,
    CatalogPagiantion,
  },

  setup() {
    const $store = useStore();

    const categoryId = ref(null);
    const page = ref(1);
    const limitInPage = ref(3);
    const minPrice = ref(null);
    const maxPrice = ref(null);

    const doLoadProducts = () => {
      const productsParams = {
        categoryId: categoryId.value || null,
        page: page.value || 1,
        limit: limitInPage.value || null,
        minPrice: minPrice.value || null,
        maxPrice: maxPrice.value || null,
      };

      $store.dispatch('products/getProducts', productsParams);
    };

    doLoadProducts();

    watch(page, () => doLoadProducts());

    return {
      categoryId,
      page,
      limitInPage,
      minPrice,
      maxPrice,

      doLoadProducts,
    };
  },
});
</script>
