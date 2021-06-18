import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { first } from 'rxjs/operators';
import { Product } from '../model/product';
import { ProductStock } from '../model/productstock';
import { StockService } from '../services/stock.service';
import { LoaderService } from '../shared/loader.service';
import { UsersessionService } from '../shared/usersession.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  displayedColumns: string[] = ['status', 'product', 'batch', 'quantity', 'avail_quantity', 'package', 'price', 'expired', 'action'];
  createStockFlag!: boolean;
  products!: Product[];
  selectPackage = 1;
  selectProduct!: Product;
  productStocks!: ProductStock[];
  productStock!: ProductStock;

  constructor(private loaderService: LoaderService, private formBuilder: FormBuilder, private stockService: StockService,
    private userSession: UsersessionService) { this.loaderService.show() }

  stockForm !: any;

  ngOnInit(): void {
    this.createStockFlag = false;
    this.loadProducts();
    this.fetchStocks();
    this.initializeStockForm();
  }
  initializeStockForm() {
    this.stockForm = this.formBuilder.group({
      id: [''],
      product: ['', [Validators.required]],
      batch: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      salePackage: ['1'],
      availableQuantity: [''],
      expiredAt: ['', [Validators.required]],
      price: ['', [Validators.required]],
      offerPrice: ['0', Validators.required],
      productId: [''],
      createdBy: [''],
      createdAt: [new Date()],
      market: ['0'],
      trade: ['1']
    });
  }

  showCreateStock() {
    this.stockFormReset();
    this.createStockFlag = true;
  }

  showProductStocks() {
    this.createStockFlag = false;
  }

  cancelCreateStock() {
    this.resetForm();
    this.createStockFlag = false;
  }

  resetForm() {
    this.stockFormReset();
    //this.initializeStockForm();
  }

  loadProducts() {
    this.stockService.getAllProductsByUser(this.userSession.loginUserId()).pipe(first()).subscribe((response) => {
      if (response != null && response.body) {
        this.products = response.body;
      }
    });
  }

  changeSelect(param: any) {
    this.selectPackage = param.value;
  }

  addQuantity(event: any) {
    this.stockForm.patchValue({ 'availableQuantity': event.target.value })
  }

  selectAutoProduct(event: MatAutocompleteSelectedEvent) {
    if (!event.option) {
      return;
    }
    this.selectProduct = event.option.value;
    this.stockForm.patchValue({
      'product': this.selectProduct.title,
      'productId': this.selectProduct
    });

  }

  async createNewStock() {
    this.stockForm.patchValue({
      'createdBy': this.userSession.loginUserId()
    })
    await this.stockService.createNewstock(this.stockForm.value).then((response) => {
      if (response && response.body) {
        this.fetchStocks();
        this.showProductStocks();
      }
    })
  }

  async fetchStocks() {
    await this.stockService.fetchStock(this.userSession.loginUserId()).then((response) => {
      if (response != null && response.body) {
        this.productStocks = response.body
        this.loaderService.hide();
      }
    })
  }

  async markStockToSale(param: any) {
    this.initializeStockForm();
    this.stockForm.patchValue({
      'id': param,
      'trade': '1',
      'productId': null
    })
    await this.stockService.markStockToSale(this.stockForm.value).then((response) => {
      if (response != null && response.body) {
        this.fetchStocks();
      }
    })
  }

  async editStock(param: any) {
    await this.stockService.fetchStockByStockId(param).then((response) => {
      if (response != null && response.body) {
        this.productStock = response.body;
        this.setSelectedStockItem(this.productStock);
      }
    })
  }

  setSelectedStockItem(productStock: ProductStock) {
    this.initializeStockForm();
    this.stockForm.patchValue({
      'id': productStock.id,
      'batch': productStock.batch,
      'quantity': productStock.quantity,
      'availableQuantity': productStock.availableQuantity,
      'status': productStock.status,
      'salePackage': productStock.salePackage,
      'price': productStock.price,
      'offerPrice': productStock.offerPrice,
      'offer': productStock.offer,
      'expiredAt': productStock.expiredAt,
      'market': productStock.market,
      'trade': productStock.trade,
      'productId': productStock.productId,
      'product': productStock.productId.title
    })
    this.showCreateStock();
    this.loaderService.hide();
  }

  stockFormReset(){
    this.stockForm.patchValue({
      id: '',
      product: '',
      batch: '',
      quantity: '',
      salePackage: '1',
      availableQuantity: '',
      expiredAt: '',
      price: '',
      offerPrice: '0',
      productId: '',
      createdBy: '',
      createdAt: '',
      market: '0',
      trade: '0'
    });
  }

  async deleteStock(param: any) {
    if (confirm("Are you sure want to remove the stock item")) {
      await this.stockService.deleteProductStock(param).then((response) => {
        if (response != null && response.body) {
          this.fetchStocks();
        }
      })
    }
  }

}
