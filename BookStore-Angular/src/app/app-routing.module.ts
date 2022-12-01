import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)
  },
  {
    path: '',
    loadChildren: () => import('./book/book.module').then(module => module.BookModule)
  }
  // {
  //   path: '',
  //   loadChildren: () => import('./cart/cart.module').then(module => module.CartModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
