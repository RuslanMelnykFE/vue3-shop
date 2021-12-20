<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" @submit.prevent="doSubmitForm">
      <FilterFieldset legend="Цена">
        <FilterInput
          input-name="min-price"
          input-label="От"
          input-type="number"
          v-model.number="priceFrom"
        />
        <FilterInput
          input-name="min-price"
          input-label="До"
          input-type="number"
          v-model.number="priceTo"
        />
      </FilterFieldset>

      <FilterFieldset v-if="options" legend="Категория">
        <label class="form__label form__label--select">
          <BaseSelect
            select-name="category"
            default-option="Все категории"
            :options="options"
            v-model.number="productsCategoryId"
          />
        </label>
      </FilterFieldset>

      <FilterFieldset v-if="productsCategoryId && colorsList" legend="Цвет">
        <ListInputColors v-model="selectedColor" :colors-list="colorsList" />
      </FilterFieldset>

      <FilterFieldset
        v-for="productProp in productProps"
        :key="`product-prop-${productProp.id}`"
        :legend="productProp.title"
      >
        <ListChkeckboxes
          checkbox-name="volume"
          v-model="selectedVolume"
          :checkboxes-list="productProp.availableValues"
        />
      </FilterFieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import {
  defineComponent, ref, toRefs, watch,
} from 'vue';
import useColors from '@/hooks/useColors';
import useProductCategories from '@/hooks/useProductCategories';
import FilterFieldset from '@/components/Form/FilterFieldset.vue';
import FilterInput from '@/components/Form/FilterInput.vue';
import BaseSelect from '@/components/Form/BaseSelect.vue';
import ListInputColors from '@/components/Form/ListRadioInputsColors.vue';
import ListChkeckboxes from '@/components/Form/ListCheckboxes.vue';

export default defineComponent({
  name: 'CatalogFilter',

  components: {
    FilterFieldset,
    FilterInput,
    BaseSelect,
    ListInputColors,
    ListChkeckboxes,
  },

  props: {
    minPrice: {
      type: [String, Number],
      default: 0,
    },
    maxPrice: {
      type: [String, Number],
      default: 0,
    },
    categoryId: {
      type: [String, Number],
      default: 0,
    },
  },

  emits: ['loadProducts', 'update:minPrice', 'update:maxPrice', 'update:categoryId'],

  setup(props, { emit: $emit }) {
    const { minPrice, maxPrice, categoryId } = toRefs(props);
    const { colorsList, selectedColor, asyncColors } = useColors();
    const {
      productCategories: options,
      productsCategoryId,
      productProps,
      asyncProductCategories,
    } = useProductCategories(categoryId);

    const priceFrom = ref(0);
    const priceTo = ref(0);

    const selectedVolume = ref(0);

    const doSubmitForm = () => {
      $emit('update:minPrice', priceFrom.value);
      $emit('update:maxPrice', priceTo.value);
      $emit('update:categoryId', productsCategoryId.value);
      $emit('loadProducts');
    };

    watch(minPrice, (newVal) => {
      priceFrom.value = newVal || 0;
    });
    watch(maxPrice, (newVal) => {
      priceTo.value = newVal || 0;
    });

    asyncProductCategories();
    asyncColors();

    return {
      priceFrom,
      priceTo,
      options,
      productsCategoryId,
      productProps,
      colorsList,
      selectedColor,
      selectedVolume,

      doSubmitForm,
    };
  },
});
</script>
