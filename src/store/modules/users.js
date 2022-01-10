import { UsersError, UsersService } from '@/services/api/users.service';
import { saveRequestError } from '@/services/store.service';

const users = {
  namespaced: true,

  state: () => ({
    accessKey: null,
    usersError: null,
  }),
};

const getters = {
  accessKey: (state) => state.accessKey,
  usersError: (state) => state.usersError,
};

const mutations = {
  updateAccessKey(state, accessKey) {
    state.accessKey = accessKey;
  },
  updateUsersError(state, usersError) {
    state.usersError = usersError;
  },
};

const actions = {
  async setAccessKey(context) {
    const { commit } = context;
    const savedAccessKey = localStorage.getItem('accessKey');

    if (savedAccessKey) {
      commit('updateAccessKey', savedAccessKey);
      return false;
    }

    try {
      const { accessKey } = await UsersService.getAccessKey();
      localStorage.setItem('accessKey', accessKey);
      commit('updateAccessKey', accessKey);
      return true;
    } catch (error) {
      saveRequestError(commit, 'updateUsersError', error, UsersError);
      return false;
    }
  },
};

export default {
  ...users,
  getters,
  mutations,
  actions,
};
