import {
  FillText,
  FillGIFText
} from '../types/image';

const LINE_HEIGHT = 1.2;

const SIZE = 11; // 显示格子数
const SCALE = 14; // 倍数
const DW = SCALE * SIZE;
const DH = SCALE * SIZE;
const RANK = SCALE * SIZE;
const OFFSET = SCALE;
const points = (() => {
  const list = [];
  for (let i = 1; i < SIZE; i++) {
    list.push([i, 0, i, SIZE]);
    list.push([0, i, SIZE, i]);
  }
  return list.map(item => item.map(num => num * SCALE));
})();

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

const fillText = (ctx: CanvasRenderingContext2D, width: number, text: string, options: FillText): void => {
  const {x, y, font, color, align, max, direction, blur, degree} = options;
  ctx.font = font || '32px sans-serif';
  ctx.fillStyle = color || '#000000';
  if (blur) {
    ctx.filter = `blur(${blur}px)`;
  }
  ctx.textAlign = (align || 'center') as CanvasTextAlign; 

  const maxWidth = max || width;
  const size = getFontSize(font);
  const lines = breakLines(text, maxWidth, ctx);
  lines.forEach((item, index) => {
    let offset = 0;
    if (direction === 'down') {
      offset = index;
    } else if (direction === 'center') {
      offset = index - (lines.length - 1) / 2;
    } else { // up
      offset = index - (lines.length - 1);
    }

    ctx.save();
    if (degree) {
      ctx.translate(x, y + offset * size * LINE_HEIGHT);
      ctx.rotate(degree * Math.PI / 180);
      ctx.fillText(item, 0, 0, maxWidth);
    } else {
      ctx.fillText(item, x, y + offset * size * LINE_HEIGHT, maxWidth);
    }
    ctx.restore();
  });
};

const fillGIFText = (ctx: CanvasRenderingContext2D, width: number, text: string, options: FillGIFText): void => {
  const {x, y, font, color, stroke, swidth, align, max, direction, frame} = options;
  ctx.font = font || '32px sans-serif';
  ctx.fillStyle = color || '#000000';
  ctx.textAlign = (align || 'center') as CanvasTextAlign; 

  const maxWidth = max || width;
  const size = getFontSize(font);
  const lines = breakLines(text, maxWidth, ctx);
  lines.forEach((item, index) => {
    let offset = 0;
    if (direction === 'down') {
      offset = index;
    } else if (direction === 'center') {
      offset = index - (lines.length - 1) / 2;
    } else { // up
      offset = index - (lines.length - 1);
    }

    ctx.fillText(item, x, y + offset * size * LINE_HEIGHT, maxWidth);
  });
};

const _drawGrid = (ctx: CanvasRenderingContext2D) => {
  ctx.imageSmoothingEnabled = false;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.strokeStyle ='#000000';
  ctx.arc(SIZE * SCALE / 2, SIZE * SCALE / 2, SIZE * SCALE / 2 - 1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.clip();

  ctx.strokeStyle = '#D6D6D6';
  points.forEach(item => {
    const {0: sx, 1: sy, 2: dx, 3: dy} = item;
    ctx.moveTo(sx, sy);
    ctx.lineTo(dx, dy);
  });
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = '#FF0000';
  ctx.rect((SIZE - 1) * SCALE / 2, (SIZE - 1) * SCALE / 2, 1 * SCALE, 1 * SCALE); // 红点固定到圆心，对于源canvas的边缘像素，圆心值和实际值就不匹配，可通过把源canvas再封装一层解决，不计划调整。
  ctx.stroke();
};

const drawLayer = (canvas: HTMLCanvasElement, targetCanvas: HTMLCanvasElement, x: number, y: number): void => {
  targetCanvas.style.left = `${x + OFFSET}px`;
  targetCanvas.style.top = `${y + OFFSET}px`;

  const ctx = targetCanvas.getContext('2d') as CanvasRenderingContext2D;
  const sx = Math.min(Math.max(0, x - 5), canvas.width - SIZE);
  const sy = Math.min(Math.max(0, y - 5), canvas.height - SIZE);

  ctx.clearRect(0, 0, DW, DH);
  ctx.drawImage(canvas, sx, sy, SIZE, SIZE, 0, 0, DW, DH);
  _drawGrid(ctx);
};

const getFontSize = (font: string): number => {
  const fontSize = font.match(/(\d{1,3})px/) || ['', '32'];
  return Number(fontSize[1]);
};

export {
  LINE_HEIGHT,
  RANK,
  breakLines,
  fillText,
  drawLayer,
  getFontSize,
  fillGIFText
};
