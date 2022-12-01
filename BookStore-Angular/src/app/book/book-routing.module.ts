import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BookListCategoryComponent} from './book-list-category/book-list-category.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookPromotionListComponent} from './book-promotion-list/book-promotion-list.component';
import {BookSearchComponent} from './book-search/book-search.component';
import {BookCartComponent} from './book-cart/book-cart.component';
import {AuthGuard} from '../helpers/auth.guard';
import {ListCartHistoryComponent} from './list-cart-history/list-cart-history.component';


const routes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'cart', component: BookCartComponent},
  {path: 'detail/:id', component: BookDetailComponent},
  {path: 'category/:id', component: BookListCategoryComponent},
  {path: 'search/:searchKey', component: BookSearchComponent},
  {path: 'promotions', component: BookPromotionListComponent},
  {path: 'history', component: ListCartHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
