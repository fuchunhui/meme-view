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
  createLayer: {
    url: '/image/createLayer',
    method: 'post'
  },
  deleteLayer: {
    url: '/image/deleteLayer',
    method: 'post'
  },
  reorderLayer: {
    url: '/image/reorderLayer',
    method: 'post'
  },
  getConfig: {
    url: '/image/config',
    method: 'get'
  }
};

export default urlMap;
