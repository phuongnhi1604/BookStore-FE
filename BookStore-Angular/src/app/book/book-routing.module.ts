import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BookListCategoryComponent} from './book-list-category/book-list-category.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookPromotionListComponent} from './book-promotion-list/book-promotion-list.component';


const routes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'detail/:id', component: BookDetailComponent},
  {path: 'category/:id', component: BookListCategoryComponent},
  {path: 'promotions', component: BookPromotionListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
