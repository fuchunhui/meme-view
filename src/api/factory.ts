import axios from 'axios';
import {useGlobalStore} from '../stores/global';
import type {NetInfo} from '../types';
import {getDomain} from '../config';

/**
 * errNo含义
 * -1 服务端错误
 *  0 OK
 *  1 用户错误
 */
export default (api: NetInfo) => {
  return async (params: any = {}, options: any = {}): Promise<void> => {
    const {url, method} = api;
    let realUrl = url;
    const store = useGlobalStore();
    if (store.currentPath.startsWith('/butter')) {
      realUrl = url.replace('/image', '/butter');
    }

    const base = getDomain();

    return axios.request({
      withCredentials: false,
      url: base + realUrl,
      method,
      [method === 'get' ? 'params' : 'data']: params
    }).then(result => {
      const data = result.data;
      if (options?.stream) {
        return result;
      }

      if (data.errNo === 0) {
        return data.data;
      } else {
        return Promise.reject(data);
      }
    }).catch(res => {
      return Promise.reject(res);
    });
  };
};
