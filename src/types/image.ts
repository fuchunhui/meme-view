export interface Story {
  mid: string;
  title: string;
  feature: string;
  image: string;
  x: number;
  y: number;
  max: number;
  font: string;
  color: string;
  align: string;
  direction: string;
  senior: number;
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
