import apiList from './url';
import factory from './factory';
import type {API} from '../types';

const Api: API = {};

for (const key in apiList) {
  Api[key] = factory(apiList[key]);
}

export default Api;
