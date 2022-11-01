import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateUser } from '../Interfaces/ICreateUser';
import { ILoginUser } from '../Interfaces/ILoginUser';
import { AuthenticationService } from './authentication.service';
import { AsyncSubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
    sub = new BehaviorSubject(' ');
    nameSub = new BehaviorSubject(' ');

  constructor(private http: HttpClient) {
    
    this.sub.next('');
    this.nameSub.next('');
   }

  

  loggedUser: any;
  tokenKey = 'token';

  //Creates User In the Database
 // CreateUser(user: ICreateUser){
  //  console.log("called create user method in user service");
   // console.log(user);
   // return this.http.post(`${environment.userApiUri}`, user);
 // }

   //Creates User In the Database
    CreateUser(user: ICreateUser){
    console.log("called create user method in user service");
    //console.log(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json;');
    this.http.post('https://localhost:44324/api/user/', user, {headers: headers}).subscribe(
      response => {
        this.http.get<ILoginUser>(`https://localhost:44324/api/user/${user.Email}/${user.Password}`, {responseType: 'json'}).subscribe(data => {
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
        })
      }
    ); 
  }

  

 

    //logs in existing user 
    LoginUser(email: string, password: string){
      return this.http.get<ILoginUser>(`https://localhost:44324/api/user/${email}/${password}`, {responseType: 'json'})
    }






}
