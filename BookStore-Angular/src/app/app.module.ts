import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BookListComponent } from './home/book-list/book-list.component';
import {SecurityModule} from './security/security.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecurityModule,
    RouterModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
