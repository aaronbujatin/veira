import { Variant } from "./variant.model";

export class Product {

    id: number;
    name: string;
    price: number
    brand: string;
    color: string;
    imageUrl: string;
    catalog: string;
    variants : Variant[]
  variant: any;
}
