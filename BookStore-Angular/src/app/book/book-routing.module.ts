import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookDetailComponent} from './book-detail/book-detail.component';


const routes: Routes = [
  {path: 'detail', component: BookDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
