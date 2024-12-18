import type {Net} from '../types';

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
  },
  updateImage: {
    url: '/image/update',
    method: 'post'
  },
  getConfig: {
    url: '/image/config',
    method: 'get'
  },
  getFeatureImage: {
    url: '/image/feature/open',
    method: 'get'
  },
  saveFeatureImage: {
    url: '/image/feature/save',
    method: 'post'
  },
  getImageBase64: {
    url: '/image/base64',
    method: 'get'
  },
  getMaterialCatalog: {
    url: '/material/catalog',
    method: 'get'
  },
  getAdditional: {
    url: '/image/additional',
    method: 'get'
  },
  updateAdditional: {
    url: '/image/additional/update',
    method: 'post'
  },
  openGif: {
    url: '/image/gif/open',
    method: 'get'
  },
  saveGifImage: {
    url: '/image/gif/save',
    method: 'post'
  },
  createGifImage: {
    url: '/image/gif/create',
    method: 'post'
  },
  updateGifImage: {
    url: '/image/gif/update',
    method: 'post'
  }
};

export default urlMap;
