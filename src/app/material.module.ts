import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 

@NgModule({
  imports: [
    MatSliderModule,MatCardModule,MatButtonModule,MatInputModule,FlexLayoutModule,MatIconModule,MatExpansionModule,MatFormFieldModule
    ,MatMenuModule,MatTableModule,MatProgressBarModule,MatProgressSpinnerModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,
    MatRadioModule,FormsModule, ReactiveFormsModule ,MatAutocompleteModule
  ],
  exports: [
    MatSliderModule,MatCardModule,MatButtonModule,MatInputModule,FlexLayoutModule,MatIconModule,MatExpansionModule,MatFormFieldModule,
    MatMenuModule,MatTableModule,MatProgressBarModule,MatProgressSpinnerModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,
    MatRadioModule,FormsModule, ReactiveFormsModule ,MatAutocompleteModule
  ],
  providers:[MatDatepickerModule]
})
export class MaterialModule {}