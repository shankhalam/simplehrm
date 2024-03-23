import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormsModule, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit{

  constructor(private http: HttpClient,){}

  ngOnInit(): void {
    this.getDepartment();
  }


  departments:any[] = []
  DepartmentName="";
  DepartmentId=0;
  newDepartmentName=""

  editClick(dep:any){
    this.DepartmentId = dep.DepartmentId
    this.DepartmentName = dep.DepartmentName
  }


  getDepartment(){
    this.http.get<any>(environment.apiUrl+'department').subscribe(data => {
      this.departments = data
    })
  }
  // Add Department
  addDepartment(){
    var val = {DepartmentName: this.DepartmentName}
    this.http.post(environment.apiUrl+'department',val).subscribe(data => {
      alert(data.toString());
      this.getDepartment();
      window.location.reload()
    })
  }

  // Delete Department
  deleteDepartment(index:number){
    if(confirm("Are yo Sure to Delete")){
      this.http.delete(environment.apiUrl+'department/'+index).subscribe();
        this.getDepartment();
        window.location.reload()
    }
  }


  // Edit Department
  updateDepartment(){
    var val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    }
    this.http.put(environment.apiUrl+'department',val).subscribe(data => {
      alert(data+"Updated Succesfully");
      this.getDepartment();
      window.location.reload()
    })
      
  }


}
