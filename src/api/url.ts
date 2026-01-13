import type {Net} from '../types';

const urlMap: Net = {
  getConfig: {
    url: '/image/config',
    method: 'get'
  },
  getCatalog: {
    url: '/image/catalog',
    method: 'get'
  },
  openImage: {
    url: '/image/open',
    method: 'get'
  },
  createImage: {
    url: '/image/create',
    method: 'post'
  },
  updateImage: {
    url: '/image/update',
    method: 'post'
  },
  updateName: {
    url: '/image/update/name',
    method: 'post'
  },
  createLayer: {
    url: '/image/layer/create',
    method: 'post'
  },
  deleteLayer: {
    url: '/image/layer/delete',
    method: 'post'
  },
  reorderLayer: {
    url: '/image/layer/reorder',
    method: 'post'
  }
};

export default urlMap;
