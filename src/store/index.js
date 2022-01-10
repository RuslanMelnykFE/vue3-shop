import { createStore } from 'vuex';
import users from './modules/users';
import basket from './modules/basket';
import products from './modules/products';
import filter from './modules/filter';

export default createStore({
  modules: {
    users,
    basket,
    products,
    filter,
  },
});
