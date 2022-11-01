import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateRun } from '../Interfaces/ICreateRun';
import { ILoginUser } from '../Interfaces/ILoginUser';
import { AuthenticationService } from '../Services/authentication.service';
import { RunService } from '../Services/run.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(
    private builder: UntypedFormBuilder, 
    private service: AuthenticationService, 
    private runService: RunService,
    private router: Router) { }

  runList: any;
  formData: any;
 
  get runName(){return this.formData.get('runName')}
 // get runDate(){return this.formData.get('runDate')}
  get runLength(){return this.formData.get('runLength')}

  ngOnInit() {
    this.user.Email = localStorage.getItem('email');    
    this.user.FirstName = localStorage.getItem('firstName'); 
    this.user.LastName = localStorage.getItem('lastName');  
    this.user.UserId = localStorage.getItem('userId'); 

    this.formData = this.builder.group({
      runName: new UntypedFormControl('', [Validators.required]),
      runLength: new UntypedFormControl('', [Validators.required]),
      //runDate: new UntypedFormControl('', [Validators.required, Validators.pattern('/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/')])
    })

    this.runService.RetrieveRunDetails(this.user.UserId)
    this.runService.runList.subscribe((data: any) => {
      this.runList = data
    })
    
    
    /* .subscribe(
      (result) => {
        this.runList = result
        console.log(this.runList)
      }
    ) */
  }


  userEmail: any;
  user: ILoginUser = {
    FirstName: '',
    LastName: '',
    Email: '',
    UserId: ''
  };

 

  CreateRun(){
    let newRun: ICreateRun = {
      Name: this.runName.value,
      Length: this.runLength.value,
      //Date: this.runDate.value,
      Date: new Date().toISOString().slice(0,10),
      //Date: null,
      UserId: this.user.UserId
    }

    this.runService.LogRun(newRun);
    this.router.navigate(['/dashboard'])
  }

}
