import { ProductCategory } from "./category";

export interface CategoryType{
    id:number;
    categoryType:any;
    status:number;
    categoryList:ProductCategory[];
}