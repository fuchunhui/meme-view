export interface Story {
  mid: string;
  title: string;
  feature: string;
  image: string;
  senior: number;
  x: number;
  y: number;
  max: number;
  font: string;
  color: string;
  align: string;
  direction: string;
  blur: number;
  degree: number;
}

export interface FillText {
  x: number;
  y: number;
  max: number;
  font: string;
  color: string;
  align: string;
  direction: string;
  blur: number;
  degree: number;
}

export interface Catalog {
  id: string;
  text: string;
  type: string;
  children: CatalogItem[]
}

export type CatalogItem = Record<string, string | number>;

export interface PropertyValue {
  max: number;
  size: number;
  color: string;
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
