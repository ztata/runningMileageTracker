import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateUser } from '../Interfaces/ICreateUser';
import { AuthenticationService } from '../Services/authentication.service';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private builder: UntypedFormBuilder, private service: AuthenticationService, private router: Router) { }

  formData: any;

  get firstName(){return this.formData.get('firstName')}
  get lastName(){return this.formData.get('lastName')}
  get email(){return this.formData.get('email')}
  get password(){return this.formData.get('password')}

  ngOnInit() {
    this.formData = this.builder.group({
      firstName: new UntypedFormControl('', [Validators.required]),
      lastName: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required])
    })
  }
  

  SignUp()
  {
    console.log("Called Signup method");
    let newUser: ICreateUser = {
      FirstName: this.firstName.value,
      LastName: this.lastName.value,
      Email: this.email.value,
      Password: this.password.value
    }

    this.service.Register(newUser);
    this.router.navigate(['/dashboard']);
  }

}
