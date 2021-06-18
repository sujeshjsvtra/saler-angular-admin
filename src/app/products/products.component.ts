import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

import { Product } from '../model/product';
import { Unit } from '../model/unit';
import { ProductService } from '../services/product.service';
import { LoaderService } from '../shared/loader.service';
import { UsersessionService } from '../shared/usersession.service';
import { FileUploadModule } from 'primeng/fileupload';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { CategoryType } from '../model/categorytype';
import { ProductCategory } from '../model/category';


@Component({
  providers: [HeaderComponent],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'subtitle', 'hsncode', 'unit', 'action'];
  products!: Product[];
  displayModal = false;
  galleryModal = false;
  productId = 0;
  selectedUnit: String;
  categoryGroupType!:CategoryType[];
  categoryId:number;
  productForm!:any;
 
  currentFile?: File;
  networkFileUploaded: any;
  selectedFiles?: FileList;
  productCategory: ProductCategory;

  constructor(private productService: ProductService, public loaderService: LoaderService, private formBuilder: FormBuilder, private userSession: UsersessionService) { this.loaderService.show(); }

  ngOnInit(): void {     
    this.initProduct();
    this.fetchProducts();
    this.getCategoryGroupType();
  }

 
  galleryForm = this.formBuilder.group({
    file: ['', [Validators.required]],
    gallery: ['']
  });


  async fetchProducts() {
     let token = sessionStorage.getItem("CLIENT_TOKEN");
    if (token) {
      await this.productService.getProducts(this.userSession.loginUserId()).then((response) => {
        if (response.body != null) {
          this.products = response.body;
          this.loaderService.hide();
        }
      });
    }
  }

  createProduct() {
    this.productCategory = new ProductCategory
    this.productCategory.id=this.categoryId;
    this.productForm.patchValue({ 'createdBy': this.userSession.loginUserId(), 'createdAt': new Date ,'category':this.productCategory});
    this.productService.createProduct(this.productForm.value).then((response) => {
      if (response.body != null) {
        this.productId = response.body;
        if (this.productId != 0 && this.productId != null) {
          this.hideModalDialog();
          this.galleryModal = true;
          this.initProduct();
        }
        //this.fetchProducts();
        this.fetchProductByCategory(this.categoryId);
      }
    });
  }

 
  onFileUpload(event: any) {
    const target: DataTransfer = (event.target) as DataTransfer;
    if (target.files[0]) {
      this.networkFileUploaded = target.files[0];
      //this.constructFormData();
    }
  }

  onUpload(event:any) {
    const target: DataTransfer = (event.target) as DataTransfer;
    this.selectedFiles = target.files;
  }

  createProductGallery() {
    let rtn = this.constructThumbFormData();
    if(rtn){
      this.constructGalleryFormData();
    }
    this.success("Gallery updated...!");
  };

  async constructThumbFormData() {
    let formData = new FormData();
    formData.append('id', this.productId.toString());
    formData.append('thumbnail', this.networkFileUploaded);   
    let rtn = await this.createThumbnail(formData);
    formData.delete('thumbnail');
    return rtn;
  }

  async constructGalleryFormData(){
    let formData = new FormData();
    formData.append('id',this.productId.toString());
   for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('gallery',this.selectedFiles[i]);
      let rtn = await this.createGallery(formData);
      if(rtn){
        formData.delete('gallery');
      }
   }
    this.galleryModal=false;
    this.loaderService.hide();

  }

  async createThumbnail(formData: FormData) {
    if (this.networkFileUploaded != null) {
      const response = await this.productService.createThumbnail(formData);
      let rtn = response.body;
      return rtn;
    }
  }

  async createGallery(formData: FormData) {     
      const response = await this.productService.createGallery(formData);
      let rtn = response.body;
      return rtn;
  }

  async deleteProduct(id:number,name:String){
    if(confirm("Are you sure want to delete the Product '"+name+"'")){
      let response = await this.productService.deleteProduct(id);
      if(response!=null && response.body){
        this.fetchProducts();
        this.success("successfully deleted");
      }
    }
  }

  getCategoryGroupType(){
    this.productService.categoryGroupType().pipe(first()).subscribe((response)=>{
      if(response!=null && response.body){
        this.categoryGroupType = response.body;
      }
    });     
  }

  async changeCategory(event:any){
    this.categoryId = event.value;
    this.fetchProductByCategory(this.categoryId)
  }

 async fetchProductByCategory(id:number){
   await this.productService.productsByCategory(id).then((response)=>{
      if(response!=null && response.body){
        this.products = response.body;
        this.loaderService.hide();
      }
    })
  }

 initProduct(){
   this.productForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      subTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      hsncode: [''],
      weight: [''],
      unit: ['grm'],
      createdBy: [''],
      createdAt: [''],
      category:['']
    });
  }

  cancelGalleryModal() {
    this.galleryModal = false;
    this.galleryForm.reset();
  }

  cancelProduct() {
    this.hideModalDialog();
    this.productForm.reset();
  }

  showModalDialog() {
    this.displayModal = true;
  }
  hideModalDialog() {
    this.displayModal = false;
  }

  success(message:any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2500
    })
  }

}
