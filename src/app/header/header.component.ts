import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearnerService } from '../learner.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private route: ActivatedRoute,
              private learner: LearnerService) { }

  ngOnInit() {
  }
  
  get selectInsightsTab(): Observable<boolean> {
  	return this.route.data.pipe(
  		map((data:any) => data && data.selectedTab === 'insights')
  		);
  }
  get selectCurriculumTab(): Observable<boolean> {
  	return this.route.data.pipe(
  		map((data:any) => data && data.selectedTab === 'curriculum')
  		);
  }
  get selectWordsTab(): Observable<boolean> {
  	return this.route.data.pipe(
  		map((data:any) => data && data.selectedTab === 'words')
  		);
  }
  get selectResourcesTab(): Observable<boolean> {
  	return this.route.data.pipe(
  		map((data:any) => data && data.selectedTab === 'resources')
  		);
  }

  public get displayName$(): Observable<string> {
    return this.learner.displayName$;
  }
}
