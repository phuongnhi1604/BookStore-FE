import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BookListMoreComponent} from './book-list-more/book-list-more.component';
import {BookListCategoryComponent} from './book-list-category/book-list-category.component';


const routes: Routes = [
  {path: 'detail/:id', component: BookDetailComponent},
  {path: 'latest', component: BookListMoreComponent},
  {path: 'category/:id', component: BookListCategoryComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
