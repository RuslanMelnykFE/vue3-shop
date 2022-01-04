import { ProductsError, ProductsService } from '@/services/api/products.service';
import { saveRequestError, formatteParams } from '@/services/store.service';

const products = {
  namespaced: true,
  state: () => ({
    products: null,
    pagination: null,
    productsError: null,
  }),
};

const getters = {
  products: (state) => state.products,
  pagination: (state) => state.pagination,
  productsError: (state) => state.productsError,
};

const mutations = {
  updateProducts(state, productsData) {
    state.products = productsData;
  },
  updatePagination(state, paginationData) {
    state.pagination = paginationData;
  },
  updateProductsError(state, errorData) {
    state.productsError = errorData;
  },
};

const actions = {
  async getProducts(context, params) {
    const { commit } = context;
    try {
      const formattedParams = formatteParams(params);
      const { items, pagination } = await ProductsService.getProducts(formattedParams);
      commit('updateProducts', items);
      commit('updatePagination', pagination);

      return true;
    } catch (error) {
      saveRequestError(commit, 'updateProductsError', error, ProductsError);
      return false;
    }
  },
};

export default {
  ...products,
  getters,
  mutations,
  actions,
};
