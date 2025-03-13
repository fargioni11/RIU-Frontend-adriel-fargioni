export interface Superhero {
    id: number;
    name: string;
    power: string
    age :string
    actions: string;
  }
  
  export type ColumnKeys<T> = (keyof T)[];