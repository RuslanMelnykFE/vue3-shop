<template>
  <BaseLayout>
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <TheCatalog />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import TheCatalog from '@/components/Catalog/TheCatalog.vue';

export default {
  name: 'ViewMain',

  components: {
    BaseLayout,
    TheCatalog,
  },
};
</script>
