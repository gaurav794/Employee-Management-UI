import { Component, OnInit } from '@angular/core';
import { Payroll } from 'src/app/interface/payroll';
import { EmployeeManagementService } from 'src/app/service/employee-management/employee-management.service';
@Component({
  selector: 'app-payroll-summary',
  templateUrl: './payroll-summary.component.html',
  styleUrls: ['./payroll-summary.component.css']
})
export class PayrollSummaryComponent implements OnInit {
  isLoaded:boolean | undefined;
  page_heading: string = "";
  payrolls:Payroll[] = [];
  constructor(private employeeManagementService:EmployeeManagementService) { }

  ngOnInit(): void 
  {
    this.page_heading = "Payroll Summary";
    this.isLoaded = false;
    this.getPayrolls();
  }

  getPayrolls()
  {
   this.employeeManagementService.getPayrolls()
   .subscribe(
    res =>
    {
      //Store List of Payrolls
      this.payrolls = res;  
      //Disable Progress Bar
      if(res)
        this.isLoaded = true;  
    }
    );
  }

}
