import { ref, computed, watch } from 'vue';
import { formatedNumber } from '@/services/formatting.service';

const useProductOffers = (productData) => {
  const selectedOffer = ref('');
  const offer = ref({});

  const findByPropValues = (item) => item.id === selectedOffer.value;

  const mainProp = computed(() => productData.value?.mainProp || null);
  const offersValues = computed(() => {
    if (!productData.value?.offers) {
      return [];
    }

    return productData.value.offers.reduce(
      (accum, item) => [...accum, { id: item.id, text: item.propValues[0].value }],
      [],
    );
  });
  const offersLegend = computed(() => {
    switch (mainProp.value?.code) {
      case 'built_in_memory':
        return 'Объемб в ГБ:';
      default:
        return `${mainProp.value?.title || ''}:`;
    }
  });
  const productPrice = computed(() => {
    if (!Object.keys(offer.value).length) {
      return formatedNumber(productData.value?.price || 0);
    }

    return formatedNumber(offer.value.price);
  });
  const productTitle = computed(() => {
    if (!Object.keys(offer.value).length) {
      return productData.value?.title || '';
    }

    return offer.value.title;
  });

  const selectOffer = () => {
    selectedOffer.value = offersValues.value[0].id;
  };

  watch(
    offersValues,
    () => {
      selectOffer();
    },
    { deep: true },
  );

  watch(selectedOffer, () => {
    offer.value = productData.value.offers.find(findByPropValues) || {};
  });

  return {
    mainProp,
    offersValues,
    offersLegend,
    offer,
    selectedOffer,
    productPrice,
    productTitle,
  };
};

export default useProductOffers;
