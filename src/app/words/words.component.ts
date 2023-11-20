import { Component } from '@angular/core';
import { RecentExperienceService } from '../recent-experience.service';
import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent {

  public numberShown: number;
  public loaded: boolean;

  constructor(private recent: RecentExperienceService) { 
    this.numberShown = 0;
    this.loaded = false;
  }

  private _sortBy$ = new BehaviorSubject<{ by: "date" | "p" | "alpha", asc: boolean }>({
    by: "date", asc: false
  });

  ngOnInit() {
    this.loaded = false;
    this.numberShown = 8;

    setInterval(() => {
      this.loaded = true;
    }, 3000);
  }
  showMoreTarget() {
    this.numberShown += 8;
  }

  get words$(): Observable<any[]> {
    return combineLatest([this.recent.words$, this._sortBy$]).pipe(
      map(([words, srt]) => {
        let w = words.sort((a:any, b:any) => {
          if (srt.by === 'alpha' && a.displayName > b.displayName) return 1;
          if (srt.by === 'alpha' && a.displayName < b.displayName) return -1;
          if (srt.by === 'p' && a.p > b.p) return 1;
          if (srt.by === 'p' && a.p < b.p) return -1;
          if (srt.by === 'date' && a.date > b.date) return 1;
          if (srt.by === 'date' && a.date < b.date) return -1;
          return 0;
        })
        if (w && w.length) {
          return w.slice(0, this.numberShown);
        } else {
          return w;
        }
      })
    )
  }

  public set sortBy(by: "date" | "p" | "alpha") {
    let current = this._sortBy$.value;
    if (current.by === by) {
      this._sortBy$.next({ by: current.by, asc: !current.asc })
    } else {
      this._sortBy$.next({ by: by, asc: false })
    }
  }

  public get sortBy(): "date" | "p" | "alpha" {
    return this._sortBy$.value.by;
  }
}
