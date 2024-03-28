import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { DonaComponent } from './dona/dona.component';
import { IncrementerComponent } from './incrementer/incrementer.component';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [
    DonaComponent,
    IncrementerComponent,
    ModalImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    NgChartsModule,
  ],
  exports: [
    DonaComponent,
    IncrementerComponent,
    ModalImageComponent,
  ]
})
export class ComponentsModule { }
