import {Method} from 'axios';

export interface API {
  [key: string]: (params: any, options?: {}) => Promise<any>
};

export interface NetInfo {
  url: string;
  method: Method;
};

export interface Net {
  [key: string]: NetInfo
};
