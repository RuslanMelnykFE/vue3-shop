import axios from 'axios';

const ApiService = {
  init(baseUrl) {
    axios.defaults.baseURL = `${baseUrl}/api`;
  },

  get(resource) {
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  customRequest(data) {
    return axios(data);
  },
};

export default ApiService;
