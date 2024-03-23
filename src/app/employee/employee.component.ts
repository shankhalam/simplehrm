import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PrimeNGConfig } from 'primeng/api';


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



  constructor(private http:HttpClient, private primengConfig:PrimeNGConfig){}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getEmployee();
  }


  getEmployee(){
    this.http.get<any>(environment.apiUrl + 'employee').subscribe(data => {
      this.employeeList = data;
      console.log(this.employeeList)
    })
  }

  showDialog(){

  }

}
