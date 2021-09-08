import http from 'axios';

export default api => {
  let method = api.method === 'post' ? 'post' : 'get';

  return async (params, options = {}) => {
    let {payload, stream} = options;
    let url = api.url;

    return http.request({
      withCredentials: true,
      url,
      method,
      ...payload,
      [method === 'get' ? 'params' : 'data']: params
    }).then(result => {
      const data = result.data;
      if (stream) {
        return result;
      }
      /**
       * errNo含义
       * -1 服务端错误
       *  0 OK
       *  1 用户错误
       */
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
