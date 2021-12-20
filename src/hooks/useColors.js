import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const useColors = () => {
  const $store = useStore();
  const selectedColor = ref(0);
  const colorsList = computed(() => $store.getters['filter/colors']);
  const asyncColors = () => $store.dispatch('filter/getColors');

  return {
    colorsList,
    selectedColor,
    asyncColors,
  };
};

export default useColors;
