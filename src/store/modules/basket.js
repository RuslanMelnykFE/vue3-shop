import { saveRequestError } from '@/services/store.service';
import { BasketError, BasketService } from '@/services/api/basket.service';

const asyncBasketAction = async (context, productData, method) => {
  const { commit, rootGetters } = context;
  const accessKey = rootGetters['users/accessKey'];

  try {
    const { items } = await BasketService[method](accessKey, productData);
    commit('updateBasketProducts', items);
    return true;
  } catch (error) {
    saveRequestError(commit, 'updateBasketError', error, BasketError);
    return false;
  }
};

const basket = {
  namespaced: true,
  state: () => ({
    basketProducts: null,
    basketError: null,
  }),
};

const getters = {
  basketProducts: (state) => state.basketProducts,
  amountsProducts: (state) => {
    const { basketProducts } = state;
    if (!basketProducts) {
      return 0;
    }

    return basketProducts.reduce((accum, product) => accum + product.quantity, 0);
  },
  totalCostProducts: (state) => {
    const { basketProducts } = state;
    if (!basketProducts) {
      return 0;
    }

    return basketProducts.reduce((accum, product) => accum + product.quantity * product.price, 0);
  },
};

const mutations = {
  updateBasketProducts(state, productsData) {
    state.basketProducts = productsData;
  },
  updateBasketError(state, errorData) {
    state.basketError = errorData;
  },
};

const actions = {
  async loadBasketProducts(context) {
    const { commit, rootGetters } = context;
    const accessKey = rootGetters['users/accessKey'];

    try {
      const { items } = await BasketService.getBasket(accessKey);
      commit('updateBasketProducts', items);
      return true;
    } catch (error) {
      saveRequestError(commit, 'updateBasketProducts', error, BasketError);
      return false;
    }
  },

  addProductToBasket(context, productData) {
    asyncBasketAction(context, productData, 'addToBasket');
  },

  changeProductQuantity(context, productData) {
    asyncBasketAction(context, productData, 'changeBasket');
  },

  deleteProduct(context, productData) {
    asyncBasketAction(context, productData, 'deleteFromBasket');
  },
};

export default {
  ...basket,
  getters,
  mutations,
  actions,
};
