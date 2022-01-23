<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img v-if="previewUrl" :src="previewUrl" width="120" height="120" :alt="title" />
    </div>
    <h3 v-if="title" class="product__title">
      {{ title }}
    </h3>
    <p v-if="color" class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ backgroundColor: color.code }"></i>
        {{ color.title }}
      </span>
    </p>
    <p v-if="productInfo" class="product__info">
      {{ productInfo.title }}: <span>{{ productInfo.value }}</span>
    </p>
    <span v-if="product?.id" class="product__code"> Артикул: {{ offer.product.id }} </span>

    <FormCounter class="product__counter" width="10" height="10" v-model.number="quantityProduct" />

    <b class="product__price"> {{ price }} у.е. </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="asyncDeleteProduct"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { toRefs } from 'vue';
import useProductCart from '@/composables/useProductCart';
import FormCounter from '@/components/Form/FormCounter.vue';

export default {
  name: 'CartListItem',

  components: {
    FormCounter,
  },

  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const { product } = toRefs(props);
    const {
      offer,
      quantityProduct,
      previewUrl,
      title,
      color,
      productInfo,
      price,

      asyncDeleteProduct,
    } = useProductCart(product);

    return {
      offer,
      quantityProduct,
      previewUrl,
      title,
      color,
      productInfo,
      price,

      asyncDeleteProduct,
    };
  },
};
</script>

<style lang="scss">
.product {
  grid-template-rows: repeat(4, min-content);
}
.product__pic {
  img {
    height: 120px;
  }
}
.product__info {
  grid-row: 2/3;
}
.product__info--color {
  grid-row: 1/4;
  margin-bottom: 5px;
}
</style>
