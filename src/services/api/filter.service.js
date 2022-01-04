import ApiService from './api.service';

class FilterError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = constructor.name;
    this.errorCode = errorCode;
    this.message = message;
  }
}

const getData = async (resource) => {
  try {
    const { data } = await ApiService.get(resource);
    return data;
  } catch (error) {
    const { status, data } = error.response;
    throw new FilterError(status, data.error.message);
  }
};

const FilterService = {
  async getProductCategories() {
    const responseData = await getData('/productCategories');
    return responseData;
  },
  async getProductCategory(categoryId) {
    const responseData = await getData(`/productCategories${categoryId}`);
    return responseData;
  },
  async getColors() {
    const responseData = await getData('/colors');
    return responseData;
  },
};

export { FilterError, FilterService };
