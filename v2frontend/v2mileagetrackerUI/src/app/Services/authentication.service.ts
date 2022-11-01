import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateUser } from '../Interfaces/ICreateUser';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'token';
  private loggedUser: any;

  constructor(
    private service: UserServiceService,
    private router: Router
  ) { }

  public login(email: string, password: string): void {
    this.service.LoginUser(email, password).subscribe(
      data => {
        console.log(data);
        this.loggedUser = data;
        console.log(this.loggedUser);
        localStorage.setItem(this.tokenKey, 'token');
        console.log('1')
        console.log(localStorage.getItem(this.tokenKey))
        localStorage.setItem('firstName', this.loggedUser.firstName);
        console.log('2')
        console.log(localStorage.getItem('firstName'))
        localStorage.setItem('lastName', this.loggedUser.lastName);
        console.log('3')
        console.log(localStorage.getItem('lastName'))
        localStorage.setItem('email', this.loggedUser.email);
        console.log('4')
        console.log(localStorage.getItem('email'))
        localStorage.setItem('userId', this.loggedUser.userId);
        console.log('5')
        console.log(localStorage.getItem('userId'))
        this.service.sub.next(email);
        this.service.sub.complete();
        let name: string|any= localStorage.getItem('firstName');
        this.service.nameSub.next(name);
        this.service.sub.complete();
        this.router.navigate(['/dashboard']);
        
      }
    )
  }

  public Register(user: ICreateUser): void {
    this.service.CreateUser(user);
    this.service.sub.next(user.Email);
    this.service.sub.complete();
    this.service.nameSub.next(user.FirstName);
    this.service.nameSub.complete();
    this.router.navigate(['/dashboard']);
  }

  public logout() {
    localStorage.clear();
    this.service.sub.next('');
    this.service.sub.complete();
    this.service.nameSub.next('');
    this.service.nameSub.complete();
    this.router.navigate(['/login'])
    location.reload();
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null
  }
}
