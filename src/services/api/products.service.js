import ApiService from './api.service';

class ProductsError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const initProductsError = (error) => {
  const { status, data } = error.response;
  throw new ProductsError(status, data.error.message);
};

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
      initProductsError(error);
      return false;
    }
  },
  async getProduct(productId) {
    try {
      const { data } = await ApiService.get(`/products/${productId}`);
      return data;
    } catch (error) {
      initProductsError(error);
      return false;
    }
  },
};

export { ProductsError, ProductsService };
