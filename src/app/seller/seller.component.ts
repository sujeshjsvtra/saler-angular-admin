import { Component, OnInit,ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  panelOpenState = false;
   

  ngOnInit(): void {
  }
 
  sample() {
    // this.router.navigate([`${this.redirectUrl}`]);
  }
}
