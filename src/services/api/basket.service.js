import ApiService from './api.service';

class BasketError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
    this.message = message;
  }
}

const initBasketError = (error) => {
  const { status, data } = error.response;
  throw new BasketError(status, data.error.message);
};

const asyncBasket = async (method, url, bodyData) => {
  try {
    const { data } = await ApiService[method](url, bodyData);
    return data;
  } catch (error) {
    initBasketError(error);
    return false;
  }
};

const BasketService = {
  url: '/baskets/products?userAccessKey=',

  async getBasket(accessKey) {
    try {
      const url = `/baskets?userAccessKey=${accessKey}`;
      const { data } = await ApiService.get(url);
      return data;
    } catch (error) {
      initBasketError(error);
      return false;
    }
  },

  async addToBasket(accessKey, product) {
    return asyncBasket('post', `${this.url}${accessKey}`, product);
  },

  async changeBasket(accessKey, product) {
    return asyncBasket('put', `${this.url}${accessKey}`, product);
  },

  async deleteFromBasket(accessKey, product) {
    const requestData = {
      method: 'delete',
      url: '/baskets/products',
      data: product,
      params: {
        userAccessKey: accessKey,
      },
    };

    try {
      const { data } = await ApiService.customRequest(requestData);
      return data;
    } catch (error) {
      initBasketError(error);
      return false;
    }
  },
};

export { BasketError, BasketService };
