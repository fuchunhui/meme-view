const getExt = (base64: string): string => {
  const parts = base64.split(';base64,');
  const type = parts[0].match(/[a-z]+$/g)?.[0] || 'png';
  return type;
};

export {
  getExt
};