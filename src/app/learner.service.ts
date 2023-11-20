import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, mergeMap, tap, concatMap } from 'rxjs/operators';
import { ConnectApiService } from './connect-api.service';


export type Learner = {
  username: string;
  name: string;
  aggregates?: any;
}


@Injectable({
  providedIn: 'root'
})
export class LearnerService {

  private _learner$ = new BehaviorSubject<Learner>({username: '', name: ''});

  constructor(private connect: ConnectApiService) {
    this.connect.client$.pipe(
      concatMap(client => client.fetch(`/students`, { method: 'GET' })),
      map((data:any) => data[data.length - 1]), // take the last one if there are many learners
      tap((data:any) => {
        this._learner$.next({
          username: data.code,
          name: data.name
        });
      })
    ).subscribe(); // TODO, unsubscribe?
  }

  get learner(): Learner|null {
    return this._learner$.value;
  }

  get learner$(): Observable<Learner> {
    return this._learner$.pipe(
      filter(student => !!student && !!student.username)
    );
  }

  get displayName$(): Observable<string> {
    return this.learner$.pipe(
      map(l => l.name)
    );
  }
}