import ApiService from './api.service';

class ProductsError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const ProductsService = {
  async getProducts(params) {
    const requestData = {
      method: 'get',
      url: '/products',
      params,
    };

    try {
      const { data } = await ApiService.customRequest(requestData);
      return data;
    } catch (error) {
      const { status, data } = error.response;
      throw new ProductsError(status, data.error.message);
    }
  },
};

export { ProductsError, ProductsService };
