import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private builder: UntypedFormBuilder) { }

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
    console.log("Form Submitted Successfully");
  }

}
