import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        SecurityRoutingModule,
        ReactiveFormsModule
    ]
})
export class SecurityModule { }
