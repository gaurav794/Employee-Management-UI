import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from '../../interface/employee';
import { catchError, throwError } from 'rxjs';
import { RestResponseStatus } from '../../interface/rest-response-status';
import { Payroll } from '../../interface/payroll';
import { UserRole } from '../../interface/user-role';
import { ServerUtilService } from '../server-details-util/server-util';

@Injectable({
  providedIn: 'root',
})
export class EmployeeManagementService {
  url: string = this.server.getServerUrl().RESOURCE;

  constructor(private http: HttpClient, private server: ServerUtilService) {}

  loginUser(user: UserRole) {
    return this.http.get<RestResponseStatus>(`${this.url}/login`, {
      params: { email_id: user.email_id, password: user.password },
    });
  }

  registerUser(user: UserRole) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers: headers };

    return this.http.post<RestResponseStatus>(
      `${this.url}/register`,
      user,
      options
    );
  }

  getEmployeeByPid(pid: string) {
    //Pid as Parameter
    return this.http.get<Employee>(`${this.url}/getEmployee`, {
      params: { pid: pid },
    });
  }

  getEmployees() {
    return this.http.get<Employee[]>(`${this.url}/getEmployees`);
  }

  getPayrolls() {
    return this.http.get<Payroll[]>(`${this.url}/getPayrolls`);
  }

  addEmployee(employee: Employee) {
    return this.http.post<RestResponseStatus>(
      `${this.url}/addEmployee`,
      employee
    );
  }

  addPayroll(payroll: Payroll) {
    return this.http.post<RestResponseStatus>(
      `${this.url}/addPayroll`,
      payroll
    );
  }
}
