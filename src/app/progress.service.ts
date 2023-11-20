import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';
import { LearnerService } from './learner.service';
import { LambdaService } from './lambda.service';


export type ProgType = {
  name: string;
  date: number;
  progress: number;
  stars: number;
  order: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private _progress$ = new BehaviorSubject<ProgType[] | null>(null);

  constructor(private learner: LearnerService,
              private lambda: LambdaService) {
    this.learner.learner$.pipe(
      filter(l => !!l && !!l.username),
      tap((l:any) => console.log("!!!!!!!!!!!!!!", l.username))
    ).subscribe(l => {
      this.lambda.execute({
        // FunctionName: 'catagg-dev-FEFProgress',
        FunctionName: 'catagg-prod-FEFProgress',
        Payload: JSON.stringify({
          'path': 'awsSDKInvoke',
          'pathParameters': {
            'student_pin': l.username
          }
        })
      }).then(result => {
        // decode Uint8Array
        const jsonEncodedPayload = new TextDecoder("utf-8").decode(result.Payload);
        const payload = JSON.parse(jsonEncodedPayload);
        const body = JSON.parse(payload.body);
        let items = Object.keys(body.data).map(unit => {
          return {
            name: unit,
            title: body.data[unit].title,
            date: body.data[unit].dateMS,
            progress: body.data[unit].progress,
            order: body.data[unit].order,
            stars: body.data[unit].stars,
          };
        })
        this._progress$.next(items);
      })
    })
  }

  get progress$(): Observable<ProgType[]> {
    return this._progress$.pipe(
      filter((p): p is ProgType[] => !!p)
    )
  }
}
