import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListMoreComponent } from './book-list-more/book-list-more.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BookListCategoryComponent } from './book-list-category/book-list-category.component';

@NgModule({
  declarations: [BookDetailComponent, BookListMoreComponent, BookListCategoryComponent],
    imports: [
        CommonModule,
        BookRoutingModule,
        NgxPaginationModule
    ]
})
export class BookModule { }
