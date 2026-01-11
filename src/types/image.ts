export interface Catalog {
  id: string;
  name: string;
  type: string;
  children: CatalogItem[]
}

export type CatalogItem = Record<string, string | number>;

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
  align: string;
  direction: string;
  blur: number;
  degree: number;
  stroke: string;
  swidth: number;
}

export interface FillImage {
  eid: string;
  x: number;
  y: number;
  width: number;
  height: number;
  ipath: string;
}

export interface TextPropertyValue {
  eid: string;
  max: number;
  size: number;
  font: string;
  color: string;
  align: string;
  direction: string;
  blur: number;
  degree: number;
  stroke: string;
  swidth: number;
  content: string;
}

export interface ImagePropertyValue {
  eid: string;
  width: number;
  height: number;
  ipath: string;
}

export interface BaseFile {
  name: string;
  base64: string
}

export type DragLayer = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  alignOffset: number;
  size: number;
  type: string;
};

export type DragMovePayload = {
  id: string;
  x: number;
  y: number;
};
