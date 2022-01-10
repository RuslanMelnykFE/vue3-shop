import { computed, ref, watch } from 'vue';
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

const useProductColors = (productData) => {
  const selectedColor = ref('');
  const selectedColorId = ref(0);
  const galleryActiveIdx = ref(0);

  const picturesGallery = computed(() => {
    const colors = productData.value?.colors || null;
    return colors ? colors[galleryActiveIdx.value].gallery : [];
  });

  const colorsList = computed(() => {
    const colors = productData.value?.colors || [];

    return colors.reduce((accum, item) => [...accum, item.color], []);
  });

  const selectColor = () => {
    selectedColor.value = colorsList.value[0].code;
  };

  watch(
    colorsList,
    () => {
      selectColor();
    },
    { deep: true },
  );

  watch(selectedColor, (newVal) => {
    const colorsActiveIdx = colorsList.value.findIndex((color) => color.code === newVal);
    selectedColorId.value = colorsActiveIdx !== -1 ? colorsList.value[colorsActiveIdx].id : 0;
    galleryActiveIdx.value = colorsActiveIdx !== -1 ? colorsActiveIdx : 0;
  });

  return {
    colorsList,
    selectedColor,
    selectedColorId,
    picturesGallery,
    galleryActiveIdx,
  };
};

export { useColors, useProductColors };
