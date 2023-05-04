import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard_module/dashboard/dashboard.component';
import { EmployeeSummaryComponent } from './component/employee_module/employee-summary/employee-summary.component';
import { EmployeeComponent } from './component/employee_module/employee/employee.component';
import { PayrollSummaryComponent } from './component/payroll_module/payroll-summary/payroll-summary/payroll-summary.component';
import { PayrollComponent } from './component/payroll_module/payroll/payroll/payroll.component';
import { LoginComponent } from './component/user_module/login/login.component';
import { RegisterComponent } from './component/user_module/register/register.component';
import { AuthenticationComponent } from './component/authentication/authentication/authentication.component';
import { AuthGuard } from './service/authguard/auth-guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthenticationComponent, pathMatch: 'full' },
  { path: 'authorized', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'add-emp', component: EmployeeComponent, canActivate: [AuthGuard] },
  {
    path: 'emp-summary',
    component: EmployeeSummaryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'g-pr', component: PayrollComponent, canActivate: [AuthGuard] },
  {
    path: 'pr-summary',
    component: PayrollSummaryComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
