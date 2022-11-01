import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateRun } from '../Interfaces/ICreateRun';
import { IUpdateRun } from '../Interfaces/IUpdateRun';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor(private http: HttpClient) { }


  private apiUri = "https://localhost:44324/api/loggedrun";
  //Posts run to backed 
  LogRun(run: ICreateRun){
    console.log('called log run method in run service');
    console.log(run)
    const headers = new HttpHeaders().set('Content-Type', 'application/json;');
    let bodyObject: ICreateRun = {
      UserId: Number.parseInt(run.UserId),
      Name: run.Name,
      Length: run.Length,
      Date: run.Date
    }
    return this.http.post('https://localhost:44324/api/loggedrun', bodyObject, {headers: headers}).subscribe();
  }

  //updates details of run
  UpdateRun(run: IUpdateRun){
    console.log("called update run method in run service");
    return this.http.put(`${this.apiUri}`, run);
  }

  //Retrieves details of a single run 
  RetrieveRunDetails(id: number){
    console.log('called retrieve run details in run service');
    return this.http.get(`${this.apiUri}/${id}`);
  }


}
