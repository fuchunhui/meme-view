import apiList from './url';
import factory from './factory';
import type {API} from '../types';

const Api: API = {};

for (const key in apiList) {
  const netInfo = apiList[key];
  if (netInfo) {
    Api[key] = factory(netInfo);
  }
}

export default Api;
