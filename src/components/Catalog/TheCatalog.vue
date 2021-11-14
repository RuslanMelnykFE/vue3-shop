<template>
  <div class="content__catalog">
    <CatalogFilter />

    <section class="catalog">
      <CatalogList />
      <CatalogPagiantion />
    </section>
  </div>
</template>

<script>
import CatalogFilter from './CatalogFilter.vue';
import CatalogList from './CatalogList.vue';
import CatalogPagiantion from './CatalogPagination.vue';

export default {
  name: 'TheCatalog',

  components: {
    CatalogFilter,
    CatalogList,
    CatalogPagiantion,
  },
};
</script>
