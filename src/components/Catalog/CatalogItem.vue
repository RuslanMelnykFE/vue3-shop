<template>
  <router-link
    class="catalog__pic"
    :to="{
      name: 'product',
      params: { productId: itemData.slug },
    }"
  >
    <img :src="itemData.preview.file.url" :alt="itemData.title" />
  </router-link>

  <h3 class="catalog__title">
    <router-link
      :to="{
        name: 'product',
        params: { productId: itemData.slug },
      }"
    >
      {{ itemData.title }}
    </router-link>
  </h3>

  <span class="catalog__price"> {{ productPrice }} у.е </span>

  <ListInputColors class="colors--black" v-model="selectedColor" :colors-list="colorsList" />
</template>

<script>
import { computed, ref, toRefs } from 'vue';
import { formatedNumber } from '@/services/formatting.service';
import ListInputColors from '@/components/Form/ListRadioInputsColors.vue';

export default {
  name: 'CatalogItem',

  components: {
    ListInputColors,
  },

  props: {
    itemData: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  setup(props) {
    const selectedColor = ref('');
    const { itemData } = toRefs(props);
    const colorsList = computed(() => {
      const colors = itemData.value.colors || [];

      return colors.reduce((accum, item) => [...accum, item.color], []);
    });
    const productPrice = computed(() => formatedNumber(itemData.value.price));

    return {
      selectedColor,
      colorsList,
      productPrice,
    };
  },
};
</script>
