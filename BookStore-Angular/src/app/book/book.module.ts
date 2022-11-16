import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BookListCategoryComponent } from './book-list-category/book-list-category.component';
import {BookListComponent} from './book-list/book-list.component';
import { BookPromotionListComponent } from './book-promotion-list/book-promotion-list.component';

@NgModule({
  declarations: [BookDetailComponent, BookListCategoryComponent, BookListComponent, BookPromotionListComponent],
    imports: [
        CommonModule,
        BookRoutingModule,
        NgxPaginationModule
    ]
})
export class BookModule { }
