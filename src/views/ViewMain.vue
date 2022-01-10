<template>
  <BaseLayout>
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info"> {{ amountProducts }}</span>
    </div>

    <TheCatalog />
  </BaseLayout>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { formatedNumber, formatedTextProducts } from '@/services/formatting.service';
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import TheCatalog from '@/components/Catalog/TheCatalog.vue';

export default {
  name: 'ViewMain',

  components: {
    BaseLayout,
    TheCatalog,
  },

  setup() {
    const $store = useStore();
    const amountProducts = computed(() => {
      const amount = $store.getters['products/pagination']?.total;
      if (!amount) {
        return '';
      }
      const productText = formatedTextProducts(amount);

      return `${formatedNumber(amount)} ${productText}`;
    });
    return { amountProducts };
  },
};
</script>
