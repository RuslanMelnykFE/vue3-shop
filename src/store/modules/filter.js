import { FilterError, FilterService } from '@/services/api/filter.service';
import saveRequestError from '@/services/store.service';

const filter = {
  namespaced: true,
  state: () => ({
    productCategories: null,
    productCategory: null,
    colors: null,
    productCategoriesError: null,
    productCategoryError: null,
    colorsError: null,
  }),
};

const getters = {
  productCategories: (state) => state.productCategories,
  productCategory: (state) => state.productCategory,
  colors: (state) => state.colors,
};

const mutations = {
  updateProductCategories(state, newData) {
    state.productCategories = newData;
  },
  updateProductCategory(state, newData) {
    state.productCategory = newData;
  },
  updateColors(state, newData) {
    state.colors = newData;
  },
  updateProductCategoriesError(state, newData) {
    state.productCategoriesError = newData;
  },
  updateProductCategoryError(state, newData) {
    state.productCategoryError = newData;
  },
  updateColorsError(state, newData) {
    state.ColorsError = newData;
  },
};

const actions = {
  async getProductCategories({ commit }) {
    try {
      const { items } = await FilterService.getProductCategories();
      commit('updateProductCategories', items);
      return true;
    } catch (error) {
      saveRequestError(commit, 'updateProductCategoriesError', error, FilterError);
      return false;
    }
  },
  async getProductCategory({ commit }, categoryId) {
    try {
      const { productProps } = await FilterService.getProductCategory(categoryId);
      commit('updateProductCategory', productProps);
      return true;
    } catch (error) {
      saveRequestError(commit, 'updateProductCategoryError', error, FilterError);
      return false;
    }
  },
  async getColors({ commit }) {
    try {
      const { items } = await FilterService.getColors();
      commit('updateColors', items);
      return true;
    } catch (error) {
      saveRequestError(commit, 'updateColorsError', error, FilterError);
      return false;
    }
  },
};

export default {
  ...filter,
  getters,
  mutations,
  actions,
};
