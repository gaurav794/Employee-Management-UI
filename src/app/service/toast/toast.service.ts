import { Injectable } from '@angular/core';
import { Toast } from 'src/app/interface/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService 
{
  toasts:Toast[] = [];

  constructor() { }

  show(header:string,body:string,delay:number)
  {
    this.toasts.push({header,body,delay});
  }

  remove(toast:Toast)
  {
    this.toasts.filter(t => t != toast);
  }
}
