import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

const useProductCategories = () => {
  const $store = useStore();
  const productsCategoryId = ref(0);
  const productProps = computed(() => $store.getters['filter/productCategory']);
  const productCategories = computed(() => $store.getters['filter/productCategories']);
  const asyncProductCategories = () => $store.dispatch('filter/getProductCategories');
  const asyncProductCategory = () => $store.dispatch(
    'filter/getProductCategory',
    productsCategoryId.value ? `/${productsCategoryId.value}` : '',
  );

  watch(productsCategoryId, () => {
    asyncProductCategory();
  });

  return {
    productCategories,
    productsCategoryId,
    productProps,
    asyncProductCategories,
  };
};

export default useProductCategories;
