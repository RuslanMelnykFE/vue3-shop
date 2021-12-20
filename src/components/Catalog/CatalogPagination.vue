<template>
  <ul v-if="pagination" class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': pagination.page === 1 }"
        aria-label="Предыдущая страница"
        href="#"
        @click.prevent="doPrevPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li class="pagination__item" v-for="(page, idx) in pagination.pages" :key="`page--${idx}`">
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': page === pagination.page }"
        href="#"
        @click.prevent="doSelectPage(page)"
      >
        {{ page }}
      </a>
    </li>

    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': pagination.page === pagination.pages }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="doNextPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CatalogPagination',

  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit: $emit }) {
    const $store = useStore();
    const pagination = computed(() => $store.getters['products/pagination']);

    const doSelectPage = (pageNumber) => {
      $emit('update:modelValue', pageNumber);
    };
    const doPrevPage = () => {
      if (pagination.value.page > 1) {
        $emit('update:modelValue', pagination.value.page - 1);
      }
    };
    const doNextPage = () => {
      if (pagination.value.page < pagination.value.pages) {
        $emit('update:modelValue', pagination.value.page + 1);
      }
    };

    return {
      pagination,
      doSelectPage,
      doPrevPage,
      doNextPage,
    };
  },
});
</script>
