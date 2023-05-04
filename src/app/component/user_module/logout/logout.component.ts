import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeManagementService } from 'src/app/service/employee-management/employee-management.service';
import { auth_server, environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private service: EmployeeManagementService
  ) {}

  ngOnInit(): void {}

  logout() {
    //removes id_token and refresh_token for the current user
    sessionStorage.clear();
    //Redirect to Authorization Server Logout Page
    window.location.href = `${auth_server.URL}/confirm_logout`;
  }
}
