export type ColumnKeys<G> = Array<keyof G>;

export interface Superhero {
    id: number;
    name: string;
    actions: string
}