import apiList from './url';
import factory from './factory';
import { API } from '../types';

const Api:API = {};

for (let key in apiList) {
  Api[key] = factory(apiList[key]);
}

export default Api;
