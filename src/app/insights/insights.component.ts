import { Component } from '@angular/core';
import { LearnerService } from '../learner.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent {
  constructor(private learner:LearnerService) {
  };
}

