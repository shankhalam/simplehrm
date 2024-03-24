import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  employeeList: any[] = [];
  EmployeeId = 0;
  EmployeeName = "";
  Department = "";
  DateOfJoin :Date = new Date;
  openModal:boolean = false
  departments: any[] = []
  PhotoPath = environment.photoUrl;
  PhotoFileName = "sample.jpg" 


  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.getEmployee();
    this.getDept();
  }


  getEmployee(){
    this.http.get<any>(environment.apiUrl + 'employee').subscribe(data => {
      this.employeeList = data;
      console.log(this.employeeList)
    })
  }
  getDept(){
    this.http.get<any>(environment.apiUrl + 'department').subscribe(data => {
      this.departments = data;
    })
  }

  showDialog(){
    this.openModal = true;
  }
  closeDialog(){
    this.openModal = false;
  }

  addEmployee(){
    var val = {
      EmployeeName : this.EmployeeName,
      Department: this.Department,
      DateOfJoin: this.DateOfJoin,
      Photofile:""
    }
    this.http.post(environment.apiUrl + 'employee', val).subscribe(data => {
      alert(data.toString())
      this.getEmployee();
    })
  }

  imageUpload(event:any){
    var file = event.target.files[0]
    const formData: FormData = new FormData()
    formData.append('file', file,file.name)

    this.http.post(environment.apiUrl + 'employee/savefile', formData).subscribe((data:any) => {
      this.PhotoFileName = data.toString()
    })
  }
  

}
