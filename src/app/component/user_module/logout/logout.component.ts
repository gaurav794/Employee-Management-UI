import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeManagementService } from 'src/app/service/employee-management/employee-management.service';
import { ServerUtilService } from 'src/app/service/server-details-util/server-util';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private service: EmployeeManagementService,
    private server: ServerUtilService
  ) {}

  ngOnInit(): void {}

  logout() {
    //removes id_token and refresh_token for the current user
    sessionStorage.clear();
    //Redirect to Authorization Server Logout Page
    window.location.href = `${this.server.getAuthServer().URL}/confirm_logout`;
  }
}
