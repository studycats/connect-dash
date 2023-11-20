import { Component } from '@angular/core';
import { LearnerService } from '../learner.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-insights-progress',
  templateUrl: './insights-progress.component.html',
  styleUrls: ['./insights-progress.component.scss']
})
export class InsightsProgressComponent {
  public loaded = false;


  constructor(private learner: LearnerService) { }

  ngOnInit() {
    this.learner.learner$.subscribe()

    setInterval(() => {
      this.loaded = true;
    }, 3000);
  }

  get wordCount$(): Observable<number> {
    return this.learner.learner$.pipe(
      filter(l => !!l.aggregates),
      map(l => l.aggregates.all_time.word_count)
    )
  }

  get wordConfidence$(): Observable<number> {
    return this.learner.learner$.pipe(
      map(l => l.aggregates.all_time.average_score)
    )
  }

  get displayName$(): Observable<string> {
    return this.learner.displayName$;
  }
}
