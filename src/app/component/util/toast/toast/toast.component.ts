import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Toast } from 'src/app/interface/toast';
import { ToastService } from 'src/app/service/toast/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: true,
  imports: [NgbToastModule, NgFor]
})
export class ToastComponent implements OnInit {

  toasts:Toast[] = [];

  constructor(private toastService:ToastService) { }

  ngOnInit(): void 
  {
    this.toasts = this.toastService.toasts;
  }

  remove(toast:Toast)
  {
    this.toastService.remove(toast);
  }

}
