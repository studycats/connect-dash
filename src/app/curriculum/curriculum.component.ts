import { Component } from '@angular/core';
import { ProgType, ProgressService } from '../progress.service';
import { Observable, filter, first, map, tap } from 'rxjs';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent {
  public loaded = false;
  //@ts-ignore
  public progress$: Observable<ProgType[]>;

  constructor(private progress: ProgressService) {
  }

  ngOnInit() {
    this.progress$ = this.progress.progress$.pipe(
      filter(items => !!items),
      map(items => {
        // console.log(items);
        return items.sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          } else if (a.order > b.order) {
            return 1;
          }
          return 0;
        });
      }),
      tap(c => console.log('progress', c))
    );

    setInterval(() => {
      this.loaded = true;
    }, 3000);
  }

}
