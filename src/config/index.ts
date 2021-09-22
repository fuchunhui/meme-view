let _domain = ''; 

const getDomain = (): string => {
  return import.meta.env.MODE === 'lib' ? _domain : import.meta.env.VITE_APP_DOMAIN;
};

const setDomain = (domain: string): void => {
  _domain = domain;
};

export {
  getDomain,
  setDomain
};
