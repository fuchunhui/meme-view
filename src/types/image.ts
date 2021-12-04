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
}

export interface BaseFile {
  name: string;
  base64: string
}

export interface ExtensionImage {
  x: number;
  y: number;
  wdith: number;
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
}

interface Feature {
  mid: string;
  feature: string;
  type: string;
  story: Story;
}
export interface FeatureImage extends Feature {
  ei: ExtensionImage;
}

export interface FeatureText extends Feature {
  et: ExtensionText;
}