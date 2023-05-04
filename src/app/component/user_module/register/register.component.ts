import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/interface/user-role';
import { EmployeeManagementService } from 'src/app/service/employee-management/employee-management.service';
import { RestApiResponseUtil } from 'src/app/service/http-response-util/rest-api-response-util';
import { ToastService } from 'src/app/service/toast/toast.service';
import { FormValidatorService } from '../../util/form-validator-service/form-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private util: FormValidatorService, private employeeManagementService: EmployeeManagementService, private router:Router,
    private toastService:ToastService) { }

  page_heading: string = "";
  val = "";
  registerForm: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.page_heading = "Register"
    this.registerForm = this.fb.group
      (
        {
          user_name: [null, Validators.required],
          email_id: [null, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
          phone_number: [null, Validators.compose([Validators.required,this.util.phoneNumberValidator()])],
          password: [null, Validators.compose([Validators.required,this.util.passwordLengthValidator()])],
          confirmPassword: [null, Validators.required]
        },
        {
          validator: this.util.matchPassword()
        }
      );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }


  public onRegister() {
   if(this.registerForm.valid)
   {
    let data:UserRole = this.registerForm.value;
      this.employeeManagementService.registerUser(data).subscribe(res => 
        {
           // TODO: Toast Notifications
          this.toastService.show(res.status,res.message,4000);
        });
   }
   else
    this.util.validateForm(this.registerForm);
  }

}

