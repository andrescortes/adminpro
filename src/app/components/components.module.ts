import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { DonaComponent } from './dona/dona.component';
import { IncrementerComponent } from './incrementer/incrementer.component';



@NgModule({
  declarations: [
    DonaComponent,
    IncrementerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    NgChartsModule,
  ],
  exports: [
    DonaComponent,
    IncrementerComponent,
  ]
})
export class ComponentsModule { }
