import { CategoryComponent } from "../category/category.component";
import { ProductCategory } from "./category";

export class Product{
    id!:number;
    title!:String;
    subTitle!:String
    description!:String;
    thumbnail!:String;
    batchNumber!:String;
    price!:number;
    offerPrice!:number;
    offer:boolean;
    quantity!:number;
    expiredAt!:Date;
    status!:number;
    availableQuanity!:number;
    category:ProductCategory;
}