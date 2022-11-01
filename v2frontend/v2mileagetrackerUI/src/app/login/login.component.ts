import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private builder: UntypedFormBuilder, private service: AuthenticationService) { }

  formData: any;

  get email(){return this.formData.get('email')}
  get password(){return this.formData.get('password')}

  ngOnInit() {
    this.formData = this.builder.group({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required])
    })
  }

  Login()
  {
    console.log('called login method in login component');
    console.log(this.email.value);
    console.log(this.password.value);
    this.service.login(this.email.value, this.password.value);
  }

}
