import {Net} from '../types';

const urlMap: Net = {
  getCatalog: {
    url: '/image/catalog',
    method: 'get'
  },
  openImage: {
    url: '/image/open',
    method: 'get'
  },
  saveImage: {
    url: '/image/save',
    method: 'post'
  },
  createImage: {
    url: '/image/create',
    method: 'post'
  }
};

export default urlMap;