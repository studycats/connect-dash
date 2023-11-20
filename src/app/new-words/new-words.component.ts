import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LearnerService } from '../learner.service';
import { RecentExperienceService } from '../recent-experience.service';

@Component({
  selector: 'app-new-words',
  templateUrl: './new-words.component.html',
  styleUrls: ['./new-words.component.scss']
})
export class NewWordsComponent implements OnInit {

  public loaded = false;

  constructor(private learner: LearnerService,
              private recent: RecentExperienceService) { }
  
  ngOnInit() {
    setInterval(() => {
      this.loaded = true;
    }, 3000);
  }
  
 get words$(): Observable<any[]> {
   return this.recent.words$.pipe(
     map(items => items.slice(0, 6))
   );
 }

  get displayName$(): Observable<string> {
    return this.learner.displayName$;
  }
}