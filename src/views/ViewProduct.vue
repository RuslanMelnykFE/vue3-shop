<template>
  <BaseLayout>
    <BaseBreadcrumbs
      :breadcrumbsList="[
        {
          name: 'main',
          text: productCategory,
        },
      ]"
      :lastBreadcramb="productData?.title || ''"
    />

    <TheProduct :productData="productData" />
  </BaseLayout>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import TheProduct from '@/components/Product/TheProduct.vue';

export default {
  name: 'ViewProduct',

  components: {
    TheProduct,
  },

  setup() {
    const $store = useStore();
    const $route = useRoute();

    const productData = computed(() => $store.getters['products/product']);
    const productCategory = computed(() => (productData.value?.category ? productData.value.category.title : ''));

    watch(
      () => $route.params.productId,
      (newVal) => {
        if (newVal) {
          $store.dispatch('products/getProduct', newVal);
        }
      },
      {
        immediate: true,
      },
    );

    return {
      productData,
      productCategory,
    };
  },
};
</script>
