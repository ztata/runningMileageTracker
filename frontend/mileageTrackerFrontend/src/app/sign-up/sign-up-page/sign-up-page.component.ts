import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  constructor(private builder: UntypedFormBuilder) { }

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

  Login()
  {
    console.log("Form Submitted Successfully");
  }


}
