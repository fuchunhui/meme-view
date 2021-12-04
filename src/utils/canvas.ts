import {FillText} from '../types/image';

export const LINE_HEIGHT = 1.2;

const _findBreakPoint = (text: string, width: number, ctx: CanvasRenderingContext2D) => {
  let min = 0;
  let max = text.length - 1;

  while (min <= max) {
    const middle = Math.floor((min + max) / 2);
    const startWidth = ctx.measureText(text.substring(0, middle)).width;
    const surplusWidth = ctx.measureText(text.substring(0, middle + 1)).width;

    if (startWidth <= width && surplusWidth > width) {
      return middle;
    }
    if (startWidth < width) {
      min = middle + 1;
    } else {
      max = middle - 1;
    }
  }

  return -1;
};

/**
 * 按照给定的宽度，文本截取处理。需要提前设置好ctx的字体大小。
 * @param {string} text 
 * @param {number} width 
 * @param {CanvasRenderingContext2D} ctx 
 * @returns 截取后的文本数组
 */
const breakLines = (text: string, width: number, ctx: CanvasRenderingContext2D): string[] => {
  const lines = [];
  let breakPoint = 0;

  while ((breakPoint = _findBreakPoint(text, width, ctx)) !== -1) {
    lines.push(text.substring(0, breakPoint));
    text = text.substring(breakPoint);
  }

  if (text) {
    lines.push(text);
  }

  return lines;
};

const fillText = (ctx: CanvasRenderingContext2D, width: number, text: string, options: FillText) => {
  const {x, y, font, color, align, max, direction} = options;
  ctx.font = font || '32px sans-serif';
  ctx.fillStyle = color || '#000000';
  ctx.textAlign = (align || 'center') as CanvasTextAlign; 

  const maxWidth = max || width;
  const fontSize = font.match(/(\d{1,3})px/) || ['', '32'];
  const size = Number(fontSize[1]);
  const lines = breakLines(text, maxWidth, ctx);
  lines.forEach((item, index) => {
    const dy = direction === 'down' ? index : index - (lines.length - 1);
    ctx.fillText(item, x, y + dy * size * LINE_HEIGHT, maxWidth);
  });
};

export {
  breakLines,
  fillText
};
