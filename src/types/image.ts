export interface Story {
  mid: string;
  name: string;
  feature: string;
  type: string;
  image: string;
  children: StoryChild[];
}

export interface StoryChild {
  type: string;
  options: FillText | FillImage;
}

export interface FillText {
  eid: string;
  content: string;
  x: number;
  y: number;
  max: number;
  size: number;
  font: string;
  color: string;
  stroke: string;
  swidth: number;
  align: string;
  direction: string;
  blur: number;
  degree: number;
}

export interface FillImage {
  eid: string;
  x: number;
  y: number;
  width: number;
  height: number;
  ipath: string;
}

export interface Catalog {
  id: string;
  name: string;
  type: string;
  children: CatalogItem[]
}

export type CatalogItem = Record<string, string | number>;




// 下方为旧版类型定义，逐步迁移中

export interface PropertyValue {
  max: number;
  size: number;
  color: string;
  stroke: string;
  swidth: number;
  align: string;
  direction: string;
  blur: number;
  degree: number;
}

export interface BaseFile {
  name: string;
  base64: string
}

export interface ExtensionImage {
  x: number;
  y: number;
  width: number;
  height: number;
  ipath: string
}

export interface ExtensionText {
  mid: string;
  x: number;
  y: number;
  max: number;
  font: string;
  color: string;
  stroke: string;
  swidth: number;
  align: string;
  direction: string;
  blur: number;
  degree: number;
}

export interface Feature {
  mid: string;
  feature: string;
  type: string;
  story: Story;
  ei?: ExtensionImage;
  et?: ExtensionText;
}

export interface FeatureText {
  mid: string;
  type: string;
  options: ExtensionText;
}
export interface FeatureImage {
  mid: string;
  type: string;
  options: ExtensionImage;
}

export interface ImagePropertyValue {
  width: number;
  height: number;
  ipath: string;
}

export interface GIF {
  mid: string;
  title: string;
  image: string;
  x: number;
  y: number;
  max: number;
  font: string;
  color: string;
  stroke: string;
  swidth: number;
  align: string;
  direction: string;
  frame: string;
}

export interface GIFValue {
  max: number;
  size: number;
  color: string;
  stroke: string;
  swidth: number;
  align: string;
  direction: string;
  frame: string;
}

export interface FillGIFText {
  x: number;
  y: number;
  max: number;
  font: string;
  color: string;
  stroke: string;
  swidth: number;
  align: string;
  direction: string;
}