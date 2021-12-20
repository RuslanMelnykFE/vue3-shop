import { createStore } from 'vuex';
import products from './modules/products';
import filter from './modules/filter';

export default createStore({
  modules: {
    products,
    filter,
  },
});
