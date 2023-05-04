import { Component, Input, OnInit } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  standalone: true,
  imports: [NgbProgressbarModule],
})
export class ProgressBarComponent implements OnInit {
  @Input()
  progress_bar_type: string = 'success';
  @Input()
  progress_bar_value: number = 75;

  constructor() {}

  ngOnInit(): void {}
}
