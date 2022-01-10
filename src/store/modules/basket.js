import { saveRequestError } from '@/services/store.service';
import { BasketError, BasketService } from '@/services/api/basket.service';

const basket = {
  namespaced: true,
  state: () => ({
    basketProducts: null,
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

  async addProductToBasket(context, productData) {
    const { commit, rootGetters } = context;
    const accessKey = rootGetters['users/accessKey'];

    try {
      const { items } = await BasketService.addToBasket(accessKey, productData);
      commit('updateBasketProducts', items);
      return true;
    } catch (error) {
      saveRequestError(commit, 'updateBasketProducts', error, BasketError);
      return false;
    }
  },
};

export default {
  ...basket,
  getters,
  mutations,
  actions,
};
