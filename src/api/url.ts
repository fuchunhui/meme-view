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
  getMaterialBase64: {
    url: '/material/base64',
    method: 'get'
  },
  getMaterialCatalog: {
    url: '/material/catalog',
    method: 'get'
  }
};

export default urlMap;
