import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { DetailCartComponent } from './detail-cart/detail-cart.component';


@NgModule({
  declarations: [DetailCartComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
