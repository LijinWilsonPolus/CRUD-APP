import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  // to post the data to the server......
  addEmployee(data:any):Observable<any>  {
    return this._http.post('http://localhost:3000/employee',data); // this is called on the emp-add-edit.component.ts
  }
  // to get the data from the json server.........
  getEmployeeList():Observable<any> {
    return this._http.get('http://localhost:3000/employee'); // this is called on the app.component.ts
  }
  // to delete an employe from the table
  deleteEmployee(id:any):Observable<any> {
    return this._http.delete(`http://localhost:3000/employee/${id}`)
  }
  // Update the employee 
  updateEmployee(id:number,data:any){
    return this._http.put(`http://localhost:3000/employee/${id}`,data)
  }
}
