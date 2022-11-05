import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
  declarations: [BookDetailComponent],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
