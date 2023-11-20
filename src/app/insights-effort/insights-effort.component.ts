import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProgType, ProgressService } from '../progress.service';

@Component({
  selector: 'app-insights-effort',
  templateUrl: './insights-effort.component.html',
  styleUrls: ['./insights-effort.component.scss']
})
export class InsightsEffortComponent implements OnInit {

  public loaded = false;

  constructor(private progress: ProgressService) { }

  ngOnInit() {
    setInterval(() => {
      this.loaded = true;
    }, 3000);
  }

  get progress$(): Observable<ProgType[]> {
    return this.progress.progress$.pipe(
      map((items:any) => {
        items.sort((a:any, b:any) => {
          if (a.date > b.date) {
            return -1;
          } else if (a.date < b.date) {
            return 1;
          }
          return 0;
        });
        return items.slice(0, 3);
      })
    )
  }

}
