export interface SimpleSet {
  has (key: string | number): boolean;
  add (key: string | number): any;
  clear (): void;
}