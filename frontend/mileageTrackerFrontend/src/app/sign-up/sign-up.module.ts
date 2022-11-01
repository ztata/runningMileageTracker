import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';



@NgModule({
  declarations: [
    SignUpPageComponent
  ],
  imports: [
    CommonModule,
    MdbFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MdbValidationModule
  ],
  exports: [
    SignUpPageComponent
  ]
})
export class SignUpModule { }
