import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RestResponseStatus } from 'src/app/interface/rest-response-status';
import { UserRole } from 'src/app/interface/user-role';
import { EmployeeManagementService } from 'src/app/service/employee-management/employee-management.service';
import { RestApiResponseUtil } from 'src/app/service/http-response-util/rest-api-response-util';
import { ToastService } from 'src/app/service/toast/toast.service';
import { FormValidatorService } from '../../util/form-validator-service/form-validator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  page_heading: string = '';
  loginForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private util: FormValidatorService,
    private employeeManagementService: EmployeeManagementService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    //Redirects to  Authorization Server Login Page
    window.location.href = environment.AUTHORIZATION_CODE_URL;

    // this.page_heading = 'Login';
    // this.loginForm = this.fb.group({
    //   email_id: [
    //     null,
    //     Validators.compose([
    //       Validators.required,
    //       Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    //     ]),
    //   ],
    //   password: [
    //     null,
    //     Validators.compose([
    //       Validators.required,
    //       this.util.passwordLengthValidator(),
    //     ]),
    //   ],
    // });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  public onLogin() {
    //TODO: Implement Later
    // if (this.loginForm.valid) {
    //   let data: UserRole = this.loginForm.value;
    //   this.employeeManagementService.loginUser(data).subscribe(
    //     {
    //       next: (res) => {
    //         if (res.status === RestApiResponseUtil.fail)
    //         this.toastService.show(res.status, res.message, 4000);
    //         else
    //           this.router.navigate(['/']);
    //       },
    //       // TODO: Toast Notification for invalid details
    //       error: (err) => {
    //         console.log("Test");
    //         let errData: RestResponseStatus = err.error;
    //         this.toastService.show(errData.status, errData.message, 4000);
    //       }
    //     });
    // }
    // else
    //   this.util.validateForm(this.loginForm);
  }
}
