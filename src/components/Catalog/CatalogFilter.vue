<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" @submit.prevent="doSubmitForm()" ref="filterForm">
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
          :checkbox-name="productProp.code"
          @changeCheckboxValues="updateCheckboxValues"
          :checkboxes-list="productProp.availableValues"
        />
      </FilterFieldset>

      <button
        class="filter__submit button button--primery"
        type="submit"
        :disabled="!isShowResetBtn"
      >
        Применить
      </button>
      <button
        v-show="isShowResetBtn"
        class="filter__reset button button--second"
        type="button"
        @click.prevent="doResetForm"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
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
    minPriceModifiers: {
      default: () => ({}),
    },
    maxPrice: {
      type: [String, Number],
      default: 0,
    },
    maxPriceModifiers: {
      default: () => ({}),
    },
    categoryId: {
      type: [String, Number],
      default: 0,
    },
    categoryProps: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  emits: [
    'loadProducts',
    'update:minPrice',
    'update:maxPrice',
    'update:categoryId',
    'update:categoryProps',
  ],

  setup(props, { emit: $emit }) {
    const filterForm = ref(null);
    const { colorsList, selectedColor, asyncColors } = useColors();
    const {
      productCategories: options,
      productsCategoryId,
      productProps,
      asyncProductCategories,
    } = useProductCategories();

    const priceFrom = ref(0);
    const priceTo = ref(0);
    const isShowResetBtn = ref(false);

    const updateCheckboxValues = () => {
      const formData = new FormData(filterForm.value);

      if (!productProps.value) {
        $emit('update:categoryProps', {});
        return;
      }

      const checkboxValues = productProps.value.reduce(
        (accum, item) => ({
          ...accum,
          [item.code]: formData.getAll(`${item.code}[]`),
        }),
        {},
      );

      $emit('update:categoryProps', checkboxValues);
    };

    const doSubmitForm = () => {
      $emit('loadProducts');
    };

    const doShowResetBtn = () => {
      const isSelectedParameters = productsCategoryId.value || priceFrom.value || priceTo.value;
      isShowResetBtn.value = isSelectedParameters;
    };

    const doResetForm = () => {
      priceFrom.value = 0;
      priceTo.value = 0;
      productsCategoryId.value = 0;
      $emit('update:minPrice', 0);
      $emit('update:maxPrice', 0);
      $emit('update:categoryId', 0);
      $emit('update:categoryProps', {});
      $emit('loadProducts');
    };

    watch(priceFrom, (newVal) => {
      $emit('update:minPrice', newVal || 0);
      doShowResetBtn();
    });
    watch(priceTo, (newVal) => {
      $emit('update:maxPrice', newVal || 0);
      doShowResetBtn();
    });
    watch(productsCategoryId, (newVal) => {
      $emit('update:categoryId', newVal);
      doShowResetBtn();
    });

    asyncProductCategories();
    asyncColors();

    return {
      filterForm,
      priceFrom,
      priceTo,
      options,
      productsCategoryId,
      productProps,
      colorsList,
      selectedColor,
      isShowResetBtn,

      doSubmitForm,
      doResetForm,
      updateCheckboxValues,
    };
  },
});
</script>
