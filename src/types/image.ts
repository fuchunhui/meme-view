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
}

export interface Catalog {
  id: string;
  text: string;
  children: CatalogItem[]
}

export interface CatalogItem {
  mid: string;
  title: string;
}

export interface PropertyValue {
  max: number;
  size: number;
  color: string;
}
