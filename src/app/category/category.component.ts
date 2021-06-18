import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductCategory } from '../model/category';
import { CategoryService } from '../services/category.service';

import { HeaderComponent } from '../header/header.component';
import { LoaderService } from '../shared/loader.service';
import { MessageComponent } from '../shared/message/message.component';
import Swal from 'sweetalert2';
import { CategoryType } from '../model/categorytype';
 
@Component({
  providers: [HeaderComponent],
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Category Name', 'Status', 'Action'];
  productCategories!: ProductCategory[];
  categoryTypes!: CategoryType[];
  displayModal!: boolean;
  fileName = '';
  formData = new FormData();
  currentFileUpload!: File;
  token: any;
  selectedType:0;
  selectedCategoryType!: any;

  constructor(private formBuilder: FormBuilder, private _categoryService: CategoryService, private http: HttpClient,
    private cd: ChangeDetectorRef, public loaderService: LoaderService) { this.loaderService.show(); }

  categoryForm = this.formBuilder.group({
    id: [''],
    categoryName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    file: [''],
    categoryType:['',[Validators.required]]
  });

  

  ngOnInit(): void {
    this.token = sessionStorage.getItem("CLIENT_TOKEN");
    this.fetchCategoryType();
    this.fetchProductCategories();
  }



  showModalDialog() {
    this.displayModal = true;
  }

  hideModalDialog() {
    this.displayModal = false;
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.currentFileUpload = file;
      this.fileName = file.name;
    

    }
  }

  editCategory(data: any) {
    this.categoryForm.patchValue({
      id: data.id,
      categoryName: data.categoryName,
      description: data.description,
      categoryType:data.categoryTypeId
    });
    this.showModalDialog();
  }

  async fetchCategoryType() {
    if (this.token && this.token != null) {
      await this._categoryService.allCategoryType().then((response) => {
        if (response != null && response.body != null) {
          this.categoryTypes = response.body;
        }
      });
    }
  }

  async fetchProductCategories() {

    if (this.token != null) {
      await this._categoryService.allCategories(this.selectedType).then((response) => {
        if (response != null) {
          this.productCategories = response.body;
          this.loaderService.hide();
          //   this.messageComponent.showSuccess("Load..");
        }
      });

    }
  }

  async createCategory() {
    this.formData = new FormData();
    this.formData.append('name', this.categoryForm.get("categoryName")?.value);
    this.formData.append('description', this.categoryForm.get('description')?.value);
    this.formData.append('categoryType',this.categoryForm.get('categoryType')?.value);
    this.formData.append("thumbnail", this.currentFileUpload);
    
    const response = await this._categoryService.createCategory(this.formData).toPromise();
    let rtn = response.body;
    if (rtn) {
      this.fetchProductCategories();
      this.hideModalDialog();
      this.success('Successfully Created');
      this.resetCategoryForm();
    }
  }

  async deleteCategory(id: number, name: String) {
    if (confirm("Are you sure want to delete the Category '" + name + "'")) {
      await this._categoryService.deleteCategory(id).then((response) => {
        if (response.body) {
          this.fetchProductCategories();
          this.success("Successfully Deleted");
        }
      })
    }
  }

  changeCategoryType(obj:any){
    if(obj!=null){
      this.selectedType = obj.value;
     this.fetchProductCategories();
    }
  }

  resetCategoryForm(){
    this.categoryForm.reset();
  }

  success(message: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2500
    })
  }

}
