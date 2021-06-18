import { Product } from "./product";

export class ProductStock{
    id:number;
    batch:String;
    quantity:number;
    availableQuantity:number;
    status:number;
    salePackage:number;
    price:number;
    offerPrice:number;
    offer:number;
    expiredAt:any;
    market:number;
    trade:number;
    productId:Product;

}