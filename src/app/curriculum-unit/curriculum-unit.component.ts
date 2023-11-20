import { Component } from '@angular/core';
import { UnitResultsService } from '../unit-results.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-curriculum-unit',
  templateUrl: './curriculum-unit.component.html',
  styleUrls: ['./curriculum-unit.component.scss']
})
export class CurriculumUnitComponent {
  public showWords: boolean;
  public showLetters: boolean;
  public unitName: string;

  private subscriptions: any[] = [];
  public loader: boolean;

  constructor(private unitResults: UnitResultsService,
    private route: ActivatedRoute) {
    this.showWords = true;
    this.showLetters = true;
    this.loader = false;
    this.unitName = '';
  }

  ngOnInit() {

    this.subscriptions.push(
      this.route.params.subscribe(params => {
        let unit = params['unitName'];
        if (unit) {
          this.unitName = unit;
          this.unitResults.fetch(unit);
        }
      })
    )

    setInterval(() => {
      this.loader = true;
    }, 3000);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  get words$(): Observable<any[]> {
    return this.unitResults.words$;
  }

  get score$(): Observable<number> {
    return this.unitResults.score$;
  }

  showWordsContent() {
    this.showWords = !this.showWords;
  }

  showLettersContent() {
    this.showLetters = !this.showLetters;
  }
}
