import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubeRoutingModule } from './cube-routing.module';
import { CubeComponent } from './cube.component';


@NgModule({
  declarations: [
    CubeComponent
  ],
  imports: [
    CommonModule,
    CubeRoutingModule
  ]
})
export class CubeModule { }
