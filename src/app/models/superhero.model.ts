export interface Superhero {
    id: number;
    name: string;
    actions: string;
  }
  
  export type ColumnKeys<T> = (keyof T)[];