import { NgModule } from '@angular/core';

import {DataViewModule} from 'primeng/dataview';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';

import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  imports: [
    DataViewModule, ProgressSpinnerModule,InputTextModule,CardModule,ButtonModule,InputMaskModule,InputNumberModule,DialogModule,
    ToastModule,CalendarModule,DropdownModule,FileUploadModule
  ],
  exports: [
    DataViewModule, ProgressSpinnerModule,InputTextModule,CardModule,ButtonModule,InputMaskModule,InputNumberModule,DialogModule,
    ToastModule,CalendarModule,DropdownModule,FileUploadModule
  ]
})
export class PrimengModule {}