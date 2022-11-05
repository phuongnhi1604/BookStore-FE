import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then(module => module.BookModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(module => module.CartModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
