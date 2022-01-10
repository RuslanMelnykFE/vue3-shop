import ApiService from './api.service';

class UsersError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
    this.message = message;
  }
}

const UsersService = {
  async getAccessKey() {
    try {
      const { data } = await ApiService.get('/users/accessKey');
      return data;
    } catch (error) {
      const { status, data } = error.response;
      throw new UsersError(status, data.error.message);
    }
  },
};

export { UsersError, UsersService };
