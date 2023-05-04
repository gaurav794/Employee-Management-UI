import { NumberValueAccessor } from "@angular/forms";
import { Employee } from "./employee";

export interface Payroll 
{
    payroll_id:number;
    payroll_month:number;
    payroll_year:number;
    attendance:number;
    daily_wage:number;
    generated_salary:number;
    deductions:number;
    net_pay:number;
    payment_mode:string;
    date_added:string;
    employee:Employee
}
