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
  DateOfJoin = "";
  openModal:boolean = false
  departments: any[] = []
  PhotoPath = environment.photoUrl;
  Photofile = "sample.jpg" ;


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

  dialogAftersubmit(){
    this.EmployeeName = ""
    this.Department = ""
    this.DateOfJoin = ""
    this.Photofile = ""
  }

  addClick(){
    this.openModal = true
    this.dialogAftersubmit();
  }
  closeDialog(){
    this.openModal = false
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
      this.Photofile = data.toString()
    })
  }
  
  editClick(emp:any){
    this.openModal = true
    this.EmployeeId = emp.EmployeeId
    this.EmployeeName = emp.EmployeeName
    this.Department = emp.Department
    this.DateOfJoin = emp.DateOfJoin
  }

  updateEmployee() {
    var val = {
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoin: this.DateOfJoin
    }

    this.http.put(environment.apiUrl + 'employee/', val).subscribe(data => {
      alert(data.toString());
      this.getEmployee();
      this.dialogAftersubmit();
    })
  }

  deleteEmployee(i:number){
    if(confirm("Are you sure to Delete")){
      this.http.delete(environment.apiUrl + 'employee/' + i).subscribe();
      this.getEmployee();
    }
    this.getEmployee();
  }

}
