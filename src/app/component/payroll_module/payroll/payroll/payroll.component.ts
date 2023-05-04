import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/component/util/form-validator-service/form-validator.service';
import { Employee } from 'src/app/interface/employee';
import { RestResponseStatus } from 'src/app/interface/rest-response-status';
import { EmployeeManagementService } from 'src/app/service/employee-management/employee-management.service';
import { ToastService } from 'src/app/service/toast/toast.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
})
export class PayrollComponent implements OnInit {
  page_heading: string = '';
  months: number[] = [];
  modeOfPayment: string[] = [];
  employees: Employee[] = [];
  employee: any;
  payrollForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private util: FormValidatorService,
    private employeeManagementService: EmployeeManagementService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.page_heading = 'Generate Payroll';
    //add 1 to 12 number in the months array
    for (let i = 0; i < 12; i++) {
      this.months[i] = i + 1;
    }
    this.getEmployees();
    this.modeOfPayment = ['NEFT', 'Cash', 'Cheque'];
    this.payrollForm = this.fb.group({
      payroll_month: ['', Validators.required],
      payroll_year: [null, Validators.required],
      attendance: [null, Validators.required],
      daily_wage: [{ value: null, disabled: true }],
      generated_salary: [{ value: null, disabled: true }],
      deductions: [null],
      net_pay: [{ value: null, disabled: true }],
      payment_mode: ['', Validators.required],
      date_added: [null, Validators.required],
      employee: ['', Validators.required],
    });
    this.getEmployee();
    this.generateSalary();
    this.generateNetPay();
  }

  getEmployees() {
    return this.employeeManagementService.getEmployees().subscribe((res) => {
      this.employees = res;
    });
  }

  getEmployee() {
    this.payrollFormControl['employee'].valueChanges.subscribe(() => {
      //Logic to change daily wage on employee select
      let employee_pid = this.payrollFormControl['employee'].value;
      this.employeeManagementService
        .getEmployeeByPid(employee_pid)
        .subscribe((result) => {
          this.payrollFormControl['daily_wage'].setValue(result.daily_wage);
          this.salaryCalculator();
          this.employee = result;
        });
    });
  }

  generateSalary() {
    this.payrollFormControl['attendance'].valueChanges.subscribe(() => {
      //Logic to calculate generated salary
      this.salaryCalculator();
    });
  }

  private salaryCalculator() {
    let attendance = this.payrollFormControl['attendance']?.value | 0;
    let daily_wage = this.payrollFormControl['daily_wage']?.value | 0;
    let generated_salary = attendance * daily_wage;
    this.payrollFormControl['generated_salary'].setValue(generated_salary);
    //set value without deductions in amount
    this.payrollFormControl['net_pay'].setValue(generated_salary);
    let deductions = this.payrollFormControl['deductions'].value;
    let net_pay = generated_salary - deductions;
    this.payrollFormControl['net_pay'].setValue(net_pay);
  }

  generateNetPay() {
    this.payrollFormControl['deductions'].valueChanges.subscribe(() => {
      //Logic to calculate net salary
      this.salaryCalculator();
    });
  }

  get payrollFormControl() {
    return this.payrollForm.controls;
  }

  onGenerate() {
    if (this.payrollForm.valid) {
      let selectedEmployee: Employee = this.employee;
      let newPayroll: any = this.payrollForm.getRawValue();
      newPayroll['employee'] = selectedEmployee;

      this.employeeManagementService.addPayroll(newPayroll).subscribe({
        next: (res) => {
          // TODO: Toast Notifications for success
          this.toastService.show(res.status, res.message, 8000);
          //clear form values
          this.util.resetForm(this.payrollForm);
        },
        error: (err: HttpErrorResponse) => {
          // TODO: Toast Notifications for error
          let errData: RestResponseStatus = err.error;
          this.toastService.show(errData.status, errData.message, 8000);
        },
      });
    } else this.util.validateForm(this.payrollForm);
  }
}
