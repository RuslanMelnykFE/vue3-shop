import { computed } from 'vue';
import { useStore } from 'vuex';
import { formatedNumber } from '@/services/formatting.service';

const useProductCart = (product) => {
  const $store = useStore();
  const quantityProduct = computed({
    get: () => product.value.quantity,
    set: (val) => {
      const productData = {
        basketItemId: product.value.id,
        quantity: val,
      };

      $store.dispatch('basket/changeProductQuantity', productData);
    },
  });

  const offer = computed(() => product.value?.productOffer);
  const previewUrl = computed(() => offer.value?.product.preview.file.url);
  const title = computed(() => (offer.value ? offer.value?.title : product.value?.title));
  const color = computed(() => product.value?.color.color);
  const productInfo = computed(() => {
    if (!offer.value) {
      return false;
    }

    return {
      title: offer.value.product.mainProp.title,
      value: offer.value.propValues[0].value,
    };
  });
  const price = computed(() => {
    if (!offer.value) {
      return 0;
    }
    const priceValue = offer.value.price * product.value.quantity;
    return formatedNumber(priceValue);
  });

  const asyncDeleteProduct = () => {
    const productData = {
      basketItemId: product.value.id,
    };
    $store.dispatch('basket/deleteProduct', productData);
  };

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
};

export default useProductCart;
