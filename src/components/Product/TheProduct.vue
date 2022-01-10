<template>
  <section class="item">
    <ProductPicture
      :defaultPicture="productData?.preview.file.url"
      :altPicture="productTitle"
      :gallery="picturesGallery"
    />

    <div class="item__info">
      <span class="item__code">Артикул: {{ productData?.id }}</span>
      <h2 class="item__title">
        {{ productTitle }}
      </h2>
      <div class="item__form">
        <form class="form" action="#" method="POST" @submit.prevent="asyncAddProduct">
          <b class="item__price"> {{ productPrice }} y.e </b>

          <FormFieldset v-if="colorsList.length" legend="Цвет:">
            <ListInputColors v-model="selectedColor" :colors-list="colorsList" />
          </FormFieldset>

          <FormFieldset :legend="offersLegend">
            <ul class="sizes sizes--primery">
              <li class="sizes__item" v-for="inputValue in offersValues" :key="inputValue.id">
                <label class="sizes__label">
                  <input
                    class="sizes__radio sr-only"
                    type="radio"
                    :name="`offer-${mainProp.code}`"
                    :value="inputValue.id"
                    v-model="selectedOffer"
                    :checked="inputValue.id === selectedOffer"
                  />
                  <span class="sizes__value">
                    {{ inputValue.text }}
                  </span>
                </label>
              </li>
            </ul>
          </FormFieldset>

          <div class="item__row">
            <FormCounter v-model.number="quantityProduct" />

            <button class="button button--primery" type="submit">
              В корзину
            </button>
          </div>
        </form>
      </div>
    </div>

    <ProductTabs :productData="productData" />
  </section>
</template>

<script>
import { ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useProductColors } from '@/composables/useColors';
import useProductOffers from '@/composables/useProductOffers';
import FormFieldset from '@/components/Form/FormFieldset.vue';
import ListInputColors from '@/components/Form/ListRadioInputsColors.vue';
import FormCounter from '@/components/Form/FormCounter.vue';
import ProductPicture from './ProductPictures.vue';
import ProductTabs from './ProductTabs.vue';

export default {
  name: 'TheProduct',

  components: {
    FormFieldset,
    ListInputColors,
    FormCounter,
    ProductPicture,
    ProductTabs,
  },

  props: {
    productData: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const $store = useStore();
    const { productData } = toRefs(props);
    const quantityProduct = ref(1);
    const {
      selectedColor, selectedColorId, colorsList, picturesGallery,
    } = useProductColors(
      productData,
    );
    const {
      mainProp,
      offersValues,
      offersLegend,
      selectedOffer,
      offer,
      productPrice,
      productTitle,
    } = useProductOffers(productData);

    const asyncAddProduct = () => {
      const product = {
        productOfferId: selectedOffer.value,
        colorId: selectedColorId.value,
        quantity: quantityProduct.value,
      };

      $store.dispatch('basket/addProductToBasket', product);
    };

    return {
      quantityProduct,
      productPrice,
      selectedColor,
      selectedColorId,
      colorsList,
      picturesGallery,
      mainProp,
      offersValues,
      offersLegend,
      offer,
      selectedOffer,
      productTitle,
      asyncAddProduct,
    };
  },
};
</script>

<style>
.pics__wrapper img {
  max-width: 570px;
  max-height: 570px;
}
</style>
