import { Component, ɵisObservable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {LocalStorageService, LocalStorage} from 'ngx-webstorage';
import { UserServiceService } from './Services/user-service.service';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'v2mileagetrackerUI';
  

  constructor(
    private storage:LocalStorageService,
    private service: UserServiceService,
    private authService: AuthenticationService
    ) {   
    window.onbeforeunload = function() {
      localStorage.clear();
      return '';
    };
    this.service.sub.subscribe(
      (data) => {this.email = data
      console.log('email: ' + this.email)
      }
    ) 
    this.service.nameSub.subscribe(
      (data) => {this.firstName = data}
    )
  }

  email: any;
  firstName: any;

  ngOnInit(): void{
    
  }

  logout(){
    this.authService.logout();
  }
   
}
