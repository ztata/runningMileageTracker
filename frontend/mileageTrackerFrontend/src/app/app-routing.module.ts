import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { SignUpPageComponent } from './sign-up/sign-up-page/sign-up-page.component';
import { SignUpModule } from './sign-up/sign-up.module';

const routes: Routes = [
  {path: 'signup', component: SignUpPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
