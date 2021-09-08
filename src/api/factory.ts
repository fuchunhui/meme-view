import axios from 'axios';
import { NetInfo } from '../types';

/**
 * errNo含义
 * -1 服务端错误
 *  0 OK
 *  1 用户错误
 */
export default (api: NetInfo) => {
  return async (params: any, options: any) => {
    const {url, method} = api;

    return axios.request({
      withCredentials: true,
      url,
      method,
      [method === 'get' ? 'params' : 'data']: params
    }).then(result => {
      const data = result.data;
      if (options?.stream) {
        return result;
      }

      if (data.errNo === 0) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }).catch(res => {
      return Promise.reject(res);
    });
  };
};
