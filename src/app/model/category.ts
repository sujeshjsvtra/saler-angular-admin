import { OnInit } from "@angular/core";
import { CategoryType } from "./categorytype";

export class ProductCategory{

   id!:number;
   categoryName!:String;
   status!:number;
   networkImage!:String;
   products!:number;
   categoryType!:CategoryType;
   categoryTypeId!:number;

}