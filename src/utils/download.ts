const download = (canvas: HTMLCanvasElement, type: string, fileName: string): void => {
  const isJPEG = ['jpeg', 'jpg'].includes(type);
  const imageType = `image/${isJPEG ? 'jpeg' : 'png'}`;
  const base64 = canvas.toDataURL(imageType);

  const ele = document.createElement('a');
  ele.setAttribute('download', fileName);
  ele.setAttribute('href', base64);
  ele.setAttribute('target', '_blank');
  ele.click();
};

export {
  download
};
