import axios from 'axios';

const BASE_URL = 'https://vapi.vnappmob.com';

const provinceApi = {
  getProvince() {
    return axios.get(`${BASE_URL}/api/province`, {
      headers: {
        'Accept': 'application/json'
      }
    });
  },
  getDistrictProvinceId(id) {
    return axios.get(`${BASE_URL}/api/province/district/`+id, {
      headers: {
        'Accept': 'application/json'
      }
    });
  },
  getWardDistrictId(id) {
    return axios.get(`${BASE_URL}/api/province/ward/`+id, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }
};

export default provinceApi;
